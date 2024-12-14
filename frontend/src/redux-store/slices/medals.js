import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    medals: [],
    medalsFilters: [],
    qtyMendals: 0,
}

export const medalSlice = createSlice({
    name: 'medal',
    initialState: initialState,
    reducers: {
        setMedals: (state, action) => {
            state.medals = action.payload.sort((a, b) => a.range - b.range);
            state.medalsFilters = state.medals;
        },
        setQtyMedals: (state, action) => {
            state.qtyMendals = action.payload
        },

    }
})

export const { setMedals, setQtyMedals } = medalSlice.actions
export default medalSlice.reducer
