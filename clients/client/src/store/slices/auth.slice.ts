import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/user.type'

interface AuthState {
  user: IUser | null
}

const initialState: AuthState = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    }
  }
})

export const { setUser, clearUser } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
