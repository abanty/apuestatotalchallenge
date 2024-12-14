import { useState, useEffect, forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import DialogContent from '@mui/material/DialogContent'
import { Event, AccessTime, Phone, WhatsApp } from '@mui/icons-material'
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import CustomIconButton from '@core/components/mui/IconButton'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Slide from '@mui/material/Slide'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Draggable from 'react-draggable'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const DialogPokemon = ({
    open,
    closeDialog,
    currentMedal,
    nextMedal,
    qtyPokemons
}) => {

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

                <Grid container alignItems='top'>
                    <Grid item xs={12} sm={6} md={6} container
                        justifyContent="center">
                        <Box display="flex" alignItems="center" mr={5} >
                            <CustomIconButton
                                color='primary'
                                size='small'
                            >
                                <i className='ri-shield-user-fill'></i>
                            </CustomIconButton>
                            <Typography variant="body2"> <b>NIVEL ACTUAL :</b>  </Typography>
                        </Box>

                        <Box className="flex" alignItems="center" mt={1}>
                            <img alt="Current" src={`/images/medallas/${currentMedal?.avatar_medal}.png`} />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}
                        container
                        justifyContent="center">
                        <Box display="flex" alignItems="center" mr={5}>
                            <CustomIconButton
                                color='primary'
                                size='small'
                            >
                                <i className='ri-shield-user-fill'></i>
                            </CustomIconButton>
                            <Typography variant="body2"> <b>NEXT NIVEL :</b>  </Typography>
                        </Box>

                        <Box className="flex" alignItems="center" mt={1}>
                            <img alt="Next" src={`/images/medallas/${nextMedal?.avatar_medal}.png`} />
                        </Box>
                    </Grid>
                </Grid>



                <Divider sx={{ my: 4 }} />
                <Box mb={5} ml={1}>
                    <Grid container spacing={4} alignItems='center'>
                        <Grid item xs={3.5} sx={{ textAlign: 'center' }}>


                        </Grid>
                        <Grid item xs={8.5} sx={{ textAlign: 'start' }}>

                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Box mt={5} display='flex' alignItems='center'>
                    <CatchingPokemonIcon color='primary' />
                    <Typography variant='body2' ml={3}>
                        Actualmente tienes <b>{qtyPokemons}</b>  Pokemons
                    </Typography>
                </Box>

                <Box mt={5} display='flex' justifyContent={'center'} alignItems='center'>
                    <Button
                        color="success"
                        size='small'
                        variant='contained'
                    >
                        <p style={{ marginLeft: '2px' }}> Aceptar </p>
                    </Button>
                </Box>


            </DialogContent>

        </Dialog>
    )


}

export default DialogPokemon