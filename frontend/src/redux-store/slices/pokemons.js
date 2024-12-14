import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pokemons: [],
    pokemonsFilters: [],
    qtyPokemons: 0,
    filterPokemons: {}
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload.sort((a, b) => a.range - b.range);
            state.pokemonsFilters = state.pokemons;
        },
        setQtyPokemons: (state, action) => {
            state.qtyPokemons = action.payload
        },

    }
})

export const { setPokemons, setQtyPokemons } = pokemonSlice.actions
export default pokemonSlice.reducer
