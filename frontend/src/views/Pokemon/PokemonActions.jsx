'use client'

// React Imports
import { useState, useEffect, useMemo, useCallback } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Papa from 'papaparse'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import TablePagination from '@mui/material/TablePagination'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import CardStatWithImage from '@components/card-statistics/Character'
import DialogPokemon from './DialogPokemon'

import { styled } from '@mui/material/styles'
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank
  })
  return itemRank.passed
}

// Column Definitions
const columnHelper = createColumnHelper()

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

const PokemonActions = ({ dispatch, medals, pokemons }) => {
  const { medalsFilters } = medals
  const { qtyPokemons } = pokemons

  const [fileInput, setFileInput] = useState('')
  const [open, setOpen] = useState(false)
  const [qtyPokemonsLocal, setQtyPokemonsLocal] = useState(qtyPokemons)
  const [pokemonData, setPokemonData] = useState([])
  const [currentMedal, setCurrentMedal] = useState('')
  const [nextMedal, setNextMedal] = useState('')
  const [subNextMedal, setSubNextMedal] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [loadingEvType, setLoadingEvType] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  useEffect(() => {
    setLoadingEvType(true)
    try {
      setTimeout(() => {
        if (qtyPokemons && medalsFilters) {
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
  }, [qtyPokemons, medalsFilters])

  const columns = useMemo(
    () => [
      columnHelper.accessor('pokemon_id', {
        header: 'ID',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-start'>
              <Typography component={Link} color='text.primary' href='#' className='font-medium hover:text-primary'>
                {' '}
                {row.original.pokemon_id}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('pokemon_name', {
        header: 'Pokemon',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: `/images/pokebolas/${Math.floor(Math.random() * 8)}.png`, color: '#56ca00' })}
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

  const table = useReactTable({
    data: pokemonData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const BadgeContentSpan = styled('span')(({ bgColor = theme.palette.success.main }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: bgColor,
    boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
  }))

  const getAvatar = params => {
    const { avatar, color } = params
    return (
      <div className='flex gap-4'>
        <Badge
          overlap='circular'
          badgeContent={<BadgeContentSpan bgColor={color} />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Avatar alt='Marie Garza' src={avatar} />
        </Badge>
      </div>
    )
  }

  const handleFileInputChange = e => {
    const file = e.target.files[0]
    Papa.parse(file, {
      complete: result => {
        console.log('CSV Data:', result.data)
        setPokemonData(result.data)
      },
      header: true,
      skipEmptyLines: true
    })
  }

  const handlePokemonCSV = () => {
    console.log({ subNextMedal })

    if (pokemonData.length > 0 && pokemonData.length < subNextMedal.range) {
      setQtyPokemonsLocal(qtyPokemonsLocal + pokemonData.length)
      setOpen(true)
    } else {
      setShowErrorAlert(true)
    }

    setFileInput('')
  }

  const handleCloseDialog = useCallback(() => {
    setOpen(false)
    setQtyPokemonsLocal(qtyPokemons)
  }, [setOpen, setQtyPokemonsLocal, qtyPokemons])

  const onSubmit = async formData => {}

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
                Tu desafío actual es obtener la medalla de:
                <img
                  src={`/images/medallas/${nextMedal.avatar_medal}.png`}
                  alt='Medalla'
                  style={{ marginLeft: '8px', height: '20px' }}
                />
              </>
            }
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
                    <div className='text-center'>
                      <Typography variant='h6'>{!currentMedal ? 'SIN MEDALLA' : currentMedal.name}</Typography>
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
                    </div>
                  </>
                )}
                <div className='flex flex-grow flex-col gap-4'>
                  <Typography variant='h5'>Cuantos pokemones encontraste Hoy ??</Typography>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Button
                      component='label'
                      size='small'
                      variant='contained'
                      htmlFor='account-settings-upload-image'
                      className='animate__animated animate__pulse animate__infinite infinite'
                    >
                      <i className='ri-upload-cloud-fill mr-1' /> Subir pokemon CSV
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
                      <i className='ri-rocket-2-fill   mr-1' /> Enviar lista pokemons
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
                        Ops <i>exceso de pokemons</i>, Intenta subir otra lista CSV
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
              action={
                <DebouncedInput
                  value={globalFilter ?? ''}
                  onChange={value => setGlobalFilter(String(value))}
                  placeholder='Busqueda'
                />
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
                {false ? (
                  <tbody>
                    {/* < AppointmentTableSkeleton rowsNum={table.getFilteredRowModel().rows.length || 2} /> */}
                  </tbody>
                ) : pokemonData.length === 0 && table.getFilteredRowModel().rows.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                        No data available
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {pokemonData.length > 0 &&
                      table
                        .getRowModel()
                        .rows.slice(0, table.getState().pagination.pageSize)
                        .map(row => {
                          return (
                            <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                              {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                              ))}
                            </tr>
                          )
                        })}
                  </tbody>
                )}
              </table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component='div'
              className='border-bs'
              count={pokemonData.length > 0 && table.getFilteredRowModel().rows.length}
              rowsPerPage={table.getState().pagination.pageSize}
              page={pokemonData.length > 0 && table.getState().pagination.pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' }
              }}
              onPageChange={(_, page) => {
                table.setPageIndex(page)
              }}
              onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
            />
          </Card>
        </Grid>
      </Grid>

      <DialogPokemon
        open={open}
        closeDialog={handleCloseDialog}
        currentMedal={currentMedal}
        nextMedal={nextMedal}
        subNextMedal={subNextMedal}
        qtyPokemons={qtyPokemonsLocal}
      />
    </>
  )
}

export default PokemonActions
