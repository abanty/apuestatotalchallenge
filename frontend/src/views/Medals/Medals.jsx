'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
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
  const medals = useSelector(state => state.medalReducer.medals)
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
            Medallas
          </div>

          <div
            className={classnames(styles.togglerMedal, {
              [styles.customT]: isOpen
            })}
            onClick={handleToggleLogros}
          >
            <i className='ri-trophy-fill text-[30px] animate__animated animate__swing animate__infinite infinite' /> Mis
            logros
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
                        <Avatar alt='medalla' src={`/images/medallas/${medal.avatar_medal}.png`} />
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

            {isOpenLogros && ''}
          </div>
        </div>
      </ScrollWrapper>
    </div>
  )
}

export default Medals
