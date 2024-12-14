'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useMedia } from 'react-use'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Style Imports
import styles from './styles.module.css'

const Customizer = ({ breakpoint = 'lg' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()
  const medals = useSelector(state => state.medalReducer.medals)

  const isBelowLgScreen = useMedia('(max-width: 1200px)', false)
  const ScrollWrapper = isBelowLgScreen ? 'div' : PerfectScrollbar

  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <div
      className={classnames('customizer', styles.customizer, {
        [styles.show]: isOpen
      })}
    >
      <div className={styles.toggler} onClick={handleToggle}>
        <i className='ri-medal-line text-[30px] animate__animated animate__swing animate__infinite infinite' /> Medallas
      </div>
      <div className={styles.header}>
        <div className='flex flex-col'>
          <h6 className={styles.customizerTitle}>Medallas y desafios</h6>
          <div className={styles.customizerSubtitle}>Observa la información de todas las medallas</div>
        </div>
        <div className='flex gap-4'>
          <i className='ri-close-line text-actionActive cursor-pointer' onClick={handleToggle} />
        </div>
      </div>
      <ScrollWrapper>
        <div className={styles.customizerBody}>
          <div className='flex flex-col gap-6'>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {medals && medals.length > 0 ? (
                medals.map(medal => (
                  <ListItem alignItems="flex-start" key={Number(medal.id)}>
                  <ListItemAvatar>
                    <Avatar alt="medalla" src={`/images/medallas/${medal.avatar_medal}.png`} />
                  </ListItemAvatar>
                  <div style={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {medal.id + ' - ' + medal.name}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', marginRight: '8px' }}
                      >
                        Cantidad pokemons para nivel:
                      </Typography>
                      <Chip
                        label={medal.range}
                        size="small"
                        color="primary"
                      />
                    </div>
                  </div>
                </ListItem>                
                ))
              ) : (
                <div>'No hay datos disponibles'</div>
              )}
            </List>
          </div>
        </div>
      </ScrollWrapper>
    </div>
  )
}

export default Customizer
