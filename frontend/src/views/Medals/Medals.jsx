'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'
import { useMedia } from 'react-use'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Style Imports
import styles from '../../@core/components/customizer/styles.module.css'

const Medals = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenLogros, setIsOpenLogros] = useState(false)
  const theme = useTheme()
  const { medals, medalsUser } = useSelector(state => state.medalReducer)
  const { rol_id } = useSelector(state => state.loginReducer.user)

  const isBelowLgScreen = useMedia('(max-width: 1200px)', false)
  const ScrollWrapper = isBelowLgScreen ? 'div' : PerfectScrollbar

  const handleToggle = () => setIsOpen(!isOpen)
  const handleToggleLogros = () => setIsOpenLogros(!isOpenLogros)

  return (
    <div
      className={classnames('Medalcustomizer', styles.customizer, {
        [styles.show]: isOpen || isOpenLogros
      })}
    >
      {rol_id == 2 && (
        <>
          <div
            className={classnames(styles.toggler, {
              [styles.customT]: isOpenLogros
            })}
            onClick={handleToggle}
          >
            <i className='ri-medal-line text-[30px] animate__animated animate__swing animate__infinite infinite' />{' '}
            <div className='ItextMedals'>Medallas</div>
          </div>

          <div
            className={classnames(styles.togglerMedal, {
              [styles.customT]: isOpen
            })}
            onClick={handleToggleLogros}
          >
            <i className='ri-trophy-fill text-[30px] animate__animated animate__swing animate__infinite infinite' />
            <div className='ItextMedals'> Mis logros</div>
          </div>
        </>
      )}

      <div className={styles.header}>
        <div className='flex flex-col'>
          <h6 className={styles.customizerTitle}>{isOpen ? 'Medallas y niveles' : 'Mis Medallas y logros'} </h6>
          <div className={styles.customizerSubtitle}>
            {isOpen ? 'Observa la información de los niveles' : 'Información de mis logros'}
          </div>
        </div>
        <div className='flex gap-4'>
          <i
            className='ri-close-line text-actionActive cursor-pointer'
            onClick={isOpen ? handleToggle : handleToggleLogros}
          />
        </div>
      </div>

      <ScrollWrapper>
        <div className={styles.customizerBody}>
          <div className='flex flex-col gap-6'>
            {isOpen && (
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {medals && medals.length > 0 ? (
                  medals.map(medal => (
                    <ListItem alignItems='flex-start' key={Number(medal.id)}>
                      <ListItemAvatar>
                        <img alt='medalla' src={`/images/medallas/${medal.avatar_medal}.png`} width={50} />
                      </ListItemAvatar>
                      <div style={{ flex: 1 }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                          {medal.id + ' - ' + medal.name}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                          <Typography
                            component='span'
                            variant='body2'
                            sx={{ color: 'text.primary', marginRight: '8px' }}
                          >
                            Cantidad pokemons para nivel:
                          </Typography>
                          <Chip label={medal.range} size='small' color='primary' />
                        </div>
                      </div>
                    </ListItem>
                  ))
                ) : (
                  <div>'No hay datos disponibles'</div>
                )}
              </List>
            )}

            {isOpenLogros && (
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {medalsUser && medalsUser.length > 0 ? (
                  medalsUser.map(data => (
                    <ListItem alignItems='flex-start' key={Number(data.id)}>
                      <ListItemAvatar>
                        <img alt='medalla' src={`/images/medallas/${data.medals.avatar_medal}.png`} width={50} />
                      </ListItemAvatar>
                      <div style={{ flex: 1 }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                          { data.medals.name}
                        </Typography>
                        <div style={{ display: 'flex', marginRight: '4px' }}>
                          <Typography sx={{ fontSize: '12px' }} color={'success.main'}>
                            <i className='ml-1'>(Verificado)</i>
                          </Typography>
                        </div>
                      </div>
                    </ListItem>
                  ))
                ) : (
                  <div>'No hay datos disponibles'</div>
                )}
              </List>
            )}
          </div>
        </div>
      </ScrollWrapper>
    </div>
  )
}

export default Medals
