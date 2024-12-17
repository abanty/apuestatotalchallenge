'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import { io } from 'socket.io-client'

import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMedals, setQtyMedals, setMedalsByUser } from '@/redux-store/slices/medals'
import { setPokemons, setQtyPokemons } from '@/redux-store/slices/pokemons'
import { getAmountPokemons } from './ApiPokemon'
import { getTotalMedalsInfo, getMedalsByUser } from '../Medals/ApiMedals'

// Component Imports
import PokemonActions from './PokemonActions'

const socket = io(process.env.NEXT_PUBLIC_SERVER_API_SOCKET, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

const PokemonIndex = () => {
  // Hooks
  const usuario = useSelector(state => state.loginReducer.user)
  const medals = useSelector(state => state.medalReducer)
  const pokemons = useSelector(state => state.pokemonReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('notificationListening', data => {
      listMedalsUser()
    })
    return () => {
      socket.off('notificationListening')
    }
  }, [])

  useEffect(() => {
    getMedalsInfo()
    listMedalsUser()
    gettotalPokemonsByUser()
  }, [pokemons])

  /* _____________________________________
    │   * METHOD GET POKEMONS BY USER     │
     ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const gettotalPokemonsByUser = useCallback(async () => {
    try {
      const { data } = await getAmountPokemons(usuario.id)

      console.log({ data })
      dispatch(setQtyPokemons(data))
    } catch (error) {
      console.error(error)
    }
  }, [dispatch, usuario.id])

  /* _____________________________________
    │   * METHOD GET ALL MEDALS INFO      │
     ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const getMedalsInfo = useCallback(async () => {
    try {
      const { data } = await getTotalMedalsInfo()

      console.log({ data })

      dispatch(setMedals(data))
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  /* _____________________________________
    │   * METHOD GET ALL MEDALS INFO      │
     ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const listMedalsUser = useCallback(async () => {
    try {
      const { data } = await getMedalsByUser(usuario.id)
      dispatch(setMedalsByUser(data))
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <PokemonActions medals={medals} pokemons={pokemons} usuario={usuario} dispatch={dispatch} />
      </Grid>
    </Grid>
  )
}

export default PokemonIndex
