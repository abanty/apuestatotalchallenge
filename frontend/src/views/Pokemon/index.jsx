"use client"

// MUI Imports
import Grid from '@mui/material/Grid'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMedals, setQtyMedals } from '@/redux-store/slices/medals'
import { setPokemons, setQtyPokemons } from '@/redux-store/slices/pokemons'
import { getAmountPokemons } from './ApiPokemon'
import { getTotalMedalsInfo } from '../Medals/ApiMedals'

// Component Imports
import PokemonActions from './PokemonActions'

const PokemonIndex = () => {

    // Hooks
    const usuario = useSelector(state => state.loginReducer.user)
    const medals = useSelector(state => state.medalReducer)
    const pokemons = useSelector(state => state.pokemonReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        getMedalsInfo()
        gettotalPokemonsByUser()
    }, [])

    /*____________________________________
    │   * METHOD GET POKEMONS BY USER     │
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
    const gettotalPokemonsByUser = async () => {
        try {
            const { data } = await getAmountPokemons(usuario.id)
            dispatch(setQtyPokemons(data))
        } catch (error) {
            console.error(error);
        }
    }

    /*____________________________________
    │   * METHOD GET ALL MEDALS INFO      │
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
    const getMedalsInfo = async () => {
        try {

            const { data } = await getTotalMedalsInfo()
            dispatch(setMedals(data))

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <PokemonActions dispatch={dispatch} medals={medals} pokemons={pokemons} />
            </Grid>
        </Grid>
    )
}

export default PokemonIndex