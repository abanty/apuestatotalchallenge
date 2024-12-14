import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    medals: [],
    medalsFilters: [],
    qtyMedals: 0,
    filterMedal: {}
}

const filterMedals = (medals, qty) => {
    const currentMedal = medals.filter(medal => qty >= medal.range).pop() || null;
    const nextMedal = medals.find(medal => qty < medal.range) || null;
    return { currentMedal, nextMedal };
}

export const medalSlice = createSlice({
    name: 'medal',
    initialState: initialState,
    reducers: {
        setMedals: (state, action) => {
            state.medals = action.payload
            state.medalsFilters = action.payload
        },
        setQtyMedals: (state, action) => {
            state.qtyMedals = action.payload
            state.filterMedal = filterMedals(state.medalsFilters, state.qtyMedals)
        },

    }
})

export const {setMedals, setQtyMedals} = medalSlice.actions
export default medalSlice.reducer
