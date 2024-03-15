import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../Utils/supabase'
import { Database } from '../../Utils/types/database'

interface UserState {
  userId: string | null
  profile: Database['public']['Tables']['profiles']['Row'] | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  userId: null,
}

export const signUpWithEmail = createAsyncThunk<
  void,
  { full_name: string; email: string; password: string },
  { rejectValue: string }
>('user/signup', async ({ full_name, email, password }, thunkAPI) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: full_name,
          avatar_url: null,
          address: null,
          country: null,
          bio: '',
        },
      },
    })

    if (error) throw error
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const signInWithEmail = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async ({ email, password }, thunkAPI) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const signOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getMyProfile = createAsyncThunk<
  void,
  void,
  { rejectValue: string; state: { user: UserState } }
>('user/myprofile', async (_, thunkAPI) => {
  try {
    const userId = thunkAPI.getState().user.userId
    if (!userId) throw new Error('User ID is not set')
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
    if (error) throw error
    if (data && data.length > 0) {
      const p = data[0] as Database['public']['Tables']['profiles']['Row']
      thunkAPI.dispatch(setProfile(p))
    }
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: { payload: string | null }) {
      state.userId = action.payload
    },
    setProfile(
      state,
      action: {
        payload: Database['public']['Tables']['profiles']['Row'] | null
      },
    ) {
      state.profile = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInWithEmail.pending, state => {
        state.loading = true
      })
      .addCase(signInWithEmail.fulfilled, (state, _) => {
        state.loading = false
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.error = action.payload ?? 'An error occurred'
        state.loading = false
      })
      .addCase(signOut.pending, state => {
        state.profile = null
        state.loading = true
      })
      .addCase(signOut.fulfilled, state => {
        state.loading = false
        state.profile = null
      })
      .addCase(signUpWithEmail.pending, state => {
        state.loading = true
      })
      .addCase(signUpWithEmail.fulfilled, (state, _) => {
        state.loading = false
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.error = action.payload ?? 'An error occurred'
        state.loading = false
      })
      .addCase(getMyProfile.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getMyProfile.fulfilled, state => {
        state.loading = false
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.error = action.payload ?? 'An error occurred'
        state.loading = false
      })
  },
})

export const { setUserId, setProfile } = userSlice.actions
export const SelectUserId = (state: { user: UserState }) => {
  return state.user.userId
}
export const GetUserFirstName = (state: { user: UserState }) => {
  return state.user.profile?.full_name?.split(' ')[0] || null
}

export default userSlice.reducer
