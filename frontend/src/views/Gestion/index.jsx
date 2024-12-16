'use client'

import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import GestionActions from './GestionActions'
import { getTotalMedalsInfoUser, updateTotalMedalsInfoUser } from './ApiMedalsControl'

const GestionIndex = () => {
  const [dataMedals, setDataMedals] = useState([])
  const [value, setValue] = useState('1')

  useEffect(() => {
    AllMedalsUserNotifications()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const AllMedalsUserNotifications = async () => {
    try {
      const { data } = await getTotalMedalsInfoUser()

      console.log(data)
      setDataMedals(data)
    } catch (error) {
      console.error(error)
    }
  }

  const UpdateMedalsUserNotifications = async formData => {
    try {
      const response = await updateTotalMedalsInfoUser(formData)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <br />
      <Card>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='card navigation examples'>
            <Tab value='1' label='Gestión de Medallas' />
            <Tab value='2' label='Históricos' />
          </TabList>
          <CardContent>
            <TabPanel value='1'>
              <Typography variant='h5' className='mbe-2'>
                Lista de notificaciones
              </Typography>
              <Typography className='mbe-6'>
                
              </Typography>
              <GestionActions
                data={dataMedals}
                handleUpdate={UpdateMedalsUserNotifications}
                handleReload={AllMedalsUserNotifications}
              />
            </TabPanel>

            <TabPanel value='2'>
              <Typography variant='h5' className='mbe-2'>
                Históricos
              </Typography>
              <Typography className='mbe-6'>
                Dragée chupa chups soufflé cheesecake jelly tootsie roll cupcake marzipan. Carrot cake sweet roll gummi
                bears caramels jelly beans.
              </Typography>
            </TabPanel>
          </CardContent>
        </TabContext>
      </Card>
    </>
  )
}

export default GestionIndex
