'use client'

// React Imports
import { useState, useEffect, useMemo, useCallback } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Papa from 'papaparse'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import CardStatWithImage from '@components/card-statistics/Character'
import DialogPokemon from './DialogPokemon'

import { styled } from '@mui/material/styles'
import classnames from 'classnames'
import { createColumnHelper, flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

/*____________________________________
 │   * METHOD COLUMN DEFINITIONS      │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
const columnHelper = createColumnHelper()

const PokemonActions = ({ medals, pokemons, usuario, dispatch }) => {
  const { medalsFilters } = medals
  const { qtyPokemons } = pokemons
  const [fileInput, setFileInput] = useState('')
  const [open, setOpen] = useState(false)
  const [qtyPokemonsLocal, setQtyPokemonsLocal] = useState(qtyPokemons)
  const [pokemonData, setPokemonData] = useState([])
  const [currentMedal, setCurrentMedal] = useState('')
  const [nextMedal, setNextMedal] = useState('')
  const [subNextMedal, setSubNextMedal] = useState('')
  const [loadingEvType, setLoadingEvType] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  // WATCH - OBSERVER
  useEffect(() => {
    setLoadingEvType(true)
    try {
      setTimeout(() => {
        if (medalsFilters) {
          const currentMedal = medalsFilters
            .slice()
            .reverse()
            .find(medal => qtyPokemons >= medal.range)
          const nextMedal = medalsFilters.find(medal => qtyPokemons < medal.range)
          const DoublenextMedal = medalsFilters.find(medal => nextMedal.range < medal.range)
          setCurrentMedal(currentMedal)
          setNextMedal(nextMedal)
          setSubNextMedal(DoublenextMedal)
          setLoadingEvType(false)
          setQtyPokemonsLocal(qtyPokemons)
        }
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }, [medalsFilters])

  /*___________________________
 │   * METHOD COLUMN USING     │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const columns = useMemo(
    () => [
      columnHelper.accessor('pokemon_id', {
        header: 'ID',
        cell: ({ row }) => (
          <Typography component={Link} color='text.primary' href='#' className='font-medium hover:text-primary'>
            {row.original.pokemon_id}
          </Typography>
        )
      }),

      columnHelper.accessor('pokemon_name', {
        header: 'Pokemon',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <img width='50' src={`/images/pokebolas/${Math.floor(Math.random() * 8)}.png`} alt='pokemons' />

            <div className='flex flex-col gap-0.5'>
              <Typography component={Link} href='#' className='font-medium hover:text-primary' color='text.primary'>
                {row.original.service_name}
              </Typography>
              <div className='flex items-center gap-2'>
                <Typography variant='body2'>{row.original.pokemon_name}</Typography>
              </div>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('pokemon_power', {
        header: 'Poder pokemon ',
        cell: ({ row }) => {
          return (
            <div className='flex items-center justify-between gap-5'>
              <div className='flex items-center gap-1.5'>
                <i style={{ color: '#dbae19' }} className='ri-wireless-charging-line' />
                <Typography className='font-medium' color='text.primary'>
                  {row.original.pokemon_power}
                </Typography>
              </div>
            </div>
          )
        }
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  /*________________________________
 │   * METHOD TABLE DEFINITIONS     │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const table = useReactTable({
    data: pokemonData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  /*____________________________________
 │   * METHOD HANDLE INPUT CSV LIST     │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const handleFileInputChange = e => {
    setShowErrorAlert(false)
    const file = e.target.files[0]
    Papa.parse(file, {
      complete: result => {
        setPokemonData(result.data)
      },
      header: true,
      skipEmptyLines: true
    })
  }

  /*________________________________________
 │   * METHOD HANDLE SEND LISTS VALIDATE    │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const handlePokemonCSV = () => {
    const geTotal = Number(qtyPokemonsLocal + pokemonData.length)
    if (pokemonData.length > 0 && geTotal < subNextMedal.range) {
      setQtyPokemonsLocal(geTotal)
      setOpen(true)
    } else {
      setShowErrorAlert(true)
      setPokemonData([])
    }

    setFileInput('')
  }

  /*__________________________________
 │   * METHOD CLOSE HANDLE DIALOG     │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const handleCloseDialog = useCallback(() => {
    setOpen(false)
    setQtyPokemonsLocal(qtyPokemons)
    setPokemonData([])
  }, [setOpen, setQtyPokemonsLocal, qtyPokemons])

  return (
    <>
      <Grid container justifyContent='center' spacing={5} sx={{ padding: 4 }}>
        <Grid item xs={12} sm={6} md={6} className='self-end'>
          <CardStatWithImage
            stats={qtyPokemons}
            trend='positive'
            title='Total de Pokemons'
            trendNumber=''
            chipText={
              <>
                <b>Tu siguiente desafío</b> es obtener la medalla de:
              </>
            }
            srcExra={`/images/medallas/${nextMedal?.avatar_medal}.png`}
            src='/images/illustrations/auth/ash.png'
          />

          <Card className='mt-2'>
            <CardContent className=''>
              <div className='flex max-sm:flex-col items-center gap-10'>
                {loadingEvType ? (
                  <Stack spacing={0} sx={{ flexGrow: 1, alignItems: 'center' }}>
                    <svg width={0} height={0}>
                      <defs>
                        <linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                          <stop offset='0%' stopColor='#e01cd5' />
                          <stop offset='100%' stopColor='#1CB5E0' />
                        </linearGradient>
                      </defs>
                    </svg>
                    <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                  </Stack>
                ) : (
                  <>
                    <Stack spacing={0} sx={{ flexGrow: 1, alignItems: 'center' }}>
                      <div className='text-center'>
                        <div>
                          <Typography variant='overline'>Nivel actual</Typography>
                        </div>
                        <img
                          width={'140'}
                          className='rounded'
                          src={
                            !currentMedal
                              ? '/images/medallas/sin-medalla.png'
                              : `/images/medallas/${currentMedal?.avatar_medal}.png`
                          }
                          alt='Profile'
                        />

                        <div className='flex items-center'>
                          <Typography variant='h6'>{!currentMedal ? 'SIN MEDALLA' : currentMedal.name}</Typography>

                          {/* trend === 'negative' ? 'error.main' :  */}
                          <Typography sx={{ fontSize: '12px' }} color={'error.main'}>
                            <i className='ml-1'>(No Verificado)</i>
                          </Typography>
                        </div>
                      </div>
                    </Stack>
                  </>
                )}
                <div className='flex flex-grow flex-col gap-4'>
                  <Typography variant='h6'>Cuantos pokemones encontraste Hoy ??</Typography>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Button
                      component='label'
                      size='small'
                      variant='contained'
                      htmlFor='account-settings-upload-image'
                      className='animate__animated animate__pulse animate__infinite infinite'
                    >
                      <i className='ri-upload-cloud-fill mr-1' /> Subir CSV
                      <input
                        hidden
                        type='file'
                        value={fileInput}
                        accept='.csv'
                        onChange={handleFileInputChange}
                        id='account-settings-upload-image'
                      />
                    </Button>

                    <Button
                      size='small'
                      variant='contained'
                      color='info'
                      onClick={handlePokemonCSV}
                      disabled={!pokemonData.length > 0}
                    >
                      <i className='ri-rocket-2-fill   mr-1' /> Enviar pokemons
                    </Button>
                  </div>
                </div>
              </div>

              {showErrorAlert && (
                <div className='text-center mt-5 flex flex-col'>
                  <Chip
                    label={<>Debes cumplir con el desafio en curso</>}
                    color='error'
                    size='small'
                    variant='tonal'
                    className='mb-1'
                  />
                  <Chip
                    label={
                      <>
                        Tienes un <i>exceso de pokemons</i>, Intenta subir otra lista CSV
                      </>
                    }
                    color='error'
                    size='small'
                    variant='tonal'
                  />
                </div>
              )}
            </CardContent>
          </Card>
          {/* ESTO SERA COMPOENENTE */}
          <Card className='flex-wrap !text-success mt-2'>
            <CardHeader
              title={
                <div className='flex max-sm:flex-col items-center'>
                  <Chip label='POKEMONES CAPTURADOS' size='small' color={'primary'} />
                  <Typography className='ml-2' variant='h3'>
                    {pokemonData.length}
                  </Typography>
                </div>
              }
              className='flex-wrap gap-4'
            />

            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder ? null : (
                            <>
                              <div
                                className={classnames({
                                  'flex items-center': header.column.getIsSorted(),
                                  'cursor-pointer select-none': header.column.getCanSort()
                                })}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                  asc: <i className='ri-arrow-up-s-line text-xl' />,
                                  desc: <i className='ri-arrow-down-s-line text-xl' />
                                }[header.column.getIsSorted()] ?? null}
                              </div>
                            </>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {pokemonData.length > 0 ? (
                    table.getRowModel().rows.map(row => (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                        No tienes ningun pokemon capturado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <Divider />
              <br />
            </div>
          </Card>
        </Grid>
      </Grid>

      {pokemonData.length > 0 && (
        <DialogPokemon
          open={open}
          closeDialog={handleCloseDialog}
          nextMedal={nextMedal}
          qtyPokemons={qtyPokemonsLocal}
          pokemonData={pokemonData}
          usuario={usuario}
          dispatch={dispatch}
        />
      )}
    </>
  )
}

export default PokemonActions
