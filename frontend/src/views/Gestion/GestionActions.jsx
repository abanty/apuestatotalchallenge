// React Imports
import { useState, useEffect, useMemo, useCallback } from 'react'
// Next Imports
import Link from 'next/link'
import { io } from 'socket.io-client'
// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import classnames from 'classnames'
import { createColumnHelper, flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const columnHelper = createColumnHelper()

// const socket = io(process.env.NEXT_PUBLIC_SERVER_API, {
const socket = io('http://44.217.34.40:4000', {
  transports: ['websocket'],
  reconnectionAttempts: 5,
  timeout: 20000
})

const GestionActions = ({ data, handleUpdate, handleReload }) => {
  console.log({ data })




  useEffect(() => {
    socket.on('notificationListening', data => {
      handleReload()
    })

    return () => {
      socket.off('notificationListening')
    }
  }, [])

  /*___________________________
 │   * METHOD COLUMN USING     │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: ({ row }) => (
          <Typography component={Link} color='text.primary' href='#' className='font-medium hover:text-primary'>
            {row.original.users.credential_id}
          </Typography>
        )
      }),

      columnHelper.accessor('medal_id', {
        header: 'Registrados',
        cell: ({ row }) => (
          <Typography component={Link} color='text.primary' href='#' className='font-medium hover:text-primary'>
            {row.original.medals.range}
          </Typography>
        )
      }),

      columnHelper.accessor('created_at', {
        header: 'Archivo',
        cell: ({ row }) => (
          <Typography component={Link} color='text.primary' href='#' className='font-medium hover:text-primary'>
            {'.CSV'}
          </Typography>
        )
      }),

      columnHelper.accessor('user_id', {
        header: 'Medalla',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <img width='50' src={`/images/medallas/${row.original.medals.avatar_medal}.png`} alt='pokemons' />

            <div className='flex flex-col gap-0.5'>
              <Typography component={Link} href='#' className='font-medium hover:text-primary' color='text.primary'>
                {row.original.medals.name}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('status', {
        header: 'Estado',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Button
              size='small'
              color='success'
              variant='contained'
              className='max-sm:is-full is-auto'
              onClick={() => handleUpdate({ id: row.original.id, user_id: row.original.user_id, status: true })}
            >
              Aceptar
            </Button>
            <Button
              size='small'
              color='error'
              variant='contained'
              className='ml-2'
              onClick={() => handleUpdate({ id: row.original.id, user_id: row.original.user_id, status: false })}
            >
              Rechazar
            </Button>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  /*________________________________
 │   * METHOD TABLE DEFINITIONS     │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
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
          {data.length > 0 ? (
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
  )
}

export default GestionActions
