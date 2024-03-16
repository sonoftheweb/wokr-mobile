import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { supabase } from '../../Utils/supabase'
import { Service } from '../../Utils/types'

const initialState: {
  services: Service[] | null
  loading: boolean
  error: any
} = {
  services: null,
  loading: false,
  error: null,
}

export const getAllServices = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('service/all', async (_, thunkAPI) => {
  try {
    const { data, error } = await supabase.from('services').select('name, key')
    if (error) throw error
    thunkAPI.dispatch(setServices(data))
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message)
  }
})

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<Service[] | null>) {
      state.services = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllServices.pending, state => {
        state.loading = true
      })
      .addCase(getAllServices.fulfilled, state => {
        state.loading = false
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'An error occurred'
      })
  },
})

export const { setServices } = serviceSlice.actions
export const AllServices = (state: { services: Service[] }) => {
  return state.services
}
export default serviceSlice.reducer
