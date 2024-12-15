import { useState, useEffect, forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import DialogContent from '@mui/material/DialogContent'
import { Event, AccessTime, Phone, WhatsApp } from '@mui/icons-material'
import EmojiEvents from '@mui/icons-material/EmojiEvents'
import CustomIconButton from '@core/components/mui/IconButton'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Slide from '@mui/material/Slide'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Draggable from 'react-draggable'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

const Transition = forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const DialogPokemon = ({ open, closeDialog, currentMedal, nextMedal, subNextMedal, qtyPokemons }) => {
  /*___________________________
    │   * METHOD DRAG DIALOG     │
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const PaperComponent = props => {
    return (
      <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={() => closeDialog(false)}
      maxWidth='xs'
      fullWidth
      PaperComponent={PaperComponent}
      aria-labelledby='draggable-dialog-title'
      TransitionComponent={Transition}
    >
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        <Grid container spacing={2}>
          <Grid item>
            <EmojiEvents color='primary' />
          </Grid>
          <Grid item>
            <Typography variant='h6' color='primary'>
              VERIFICACIÓN
            </Typography>
          </Grid>
        </Grid>
        <IconButton
          aria-label='close'
          onClick={() => closeDialog(false)}
          className='absolute top-2.5 right-2.5 text-[var(--mui-palette-grey-500)]'
        >
          <i className='ri-close-line' />
        </IconButton>
        <Divider />
      </DialogTitle>

      <DialogContent>
        <Grid container>
          <Grid container alignItems='center' justifyContent='center' item xs={12} className='mr-10'>
            <div className='flex items-center gap-1'>
              <CustomIconButton color='primary'>
                <i className='ri-shield-user-fill' />
              </CustomIconButton>
              <Typography color='primary' variant='body2'>
                {' '}
                <b>NIVEL (por verificar) </b>{' '}
              </Typography>
            </div>
          </Grid>
          <Grid container alignItems='center' justifyContent='center' item xs={12}>
            <div className='items-center gap-4 min-is-48'>
              <img alt='Next' src={`/images/medallas/${nextMedal?.avatar_medal}.png`} />
            </div>
          </Grid>
        </Grid>

        {qtyPokemons < nextMedal?.range ? (
          <Box mt={5}>
            <Grid container spacing={4} alignItems='center'>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Box>
                  <div className='flex items-center gap-4 min-is-48'>
                    <Typography className='font-medium' color='text.primary'>{`${Math.floor(
                      (qtyPokemons / nextMedal?.range) * 100
                    )}%`}</Typography>
                    <LinearProgress
                      color='primary'
                      value={Math.floor((qtyPokemons / nextMedal?.range) * 100)}
                      variant='determinate'
                      className='is-full bs-2'
                    />
                    <Typography variant='body2'>
                      {qtyPokemons}/{nextMedal?.range}{' '}
                    </Typography>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          ''
        )}

        <Box
          mt={5}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <div className='flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
            <CatchingPokemonIcon color='primary' />
            <Typography variant='body2' ml={3}>
              Ahora tienes <b>{qtyPokemons}</b> Pokemons
            </Typography>
          </div>

          <Button className='mt-4' color='info' size='small' variant='contained'>
            <p style={{ marginLeft: '2px' }}>Aceptar</p>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DialogPokemon