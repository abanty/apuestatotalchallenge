import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  medalsUser: [],
  medalsUserFilters: [],
  medals: [],
  medalsFilters: [],
  qtyMendals: 0
}

export const medalSlice = createSlice({
  name: 'medal',
  initialState: initialState,
  reducers: {
    setMedalsByUser: (state, action) => {
      state.medalsUser = action.payload.sort((a, b) => a.range - b.range)
      state.medalsUserFilters = state.medalsUser
    },

    setMedals: (state, action) => {
      state.medals = action.payload.sort((a, b) => a.range - b.range)
      state.medalsFilters = state.medals
    },
    setQtyMedals: (state, action) => {
      state.qtyMendals = action.payload
    }
  }
})

export const { setMedalsByUser, setMedals, setQtyMedals } = medalSlice.actions
export default medalSlice.reducer
