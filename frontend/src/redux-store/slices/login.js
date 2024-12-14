import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

const initialState = {
  token: null,
  user: null
}

// Hooks
export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    saveToken: (state, action) => {
      const { token, user } = action.payload

      state.user = user 
      state.token = token
      sessionStorage.setItem('token', token)
    },
    logout: (state, action) => {
      state.user = ''
      state.token = ''
    },
    userStoredData: (state, action) => {
      return { ...state, user: action.payload }
    }
  }
})

export const { saveToken, logout, userStoredData } = loginSlice.actions

export default loginSlice.reducer
