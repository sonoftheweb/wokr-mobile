import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../Utils/supabase'
import { Database } from '../../Utils/types/database'

interface UserState {
  profile: Database['public']['Tables']['profiles']['Row'] | null
  loading: boolean
  error: string | null
}

const initialState: UserState = { profile: null, loading: false, error: null }

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
  },
})

export default userSlice.reducer
