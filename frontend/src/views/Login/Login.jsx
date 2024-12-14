'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'

import { saveToken } from '@/redux-store/slices/login'

import { LoginUser } from './ApiLogin'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

const Login = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [postErrorMessage, setPostErrorMessage] = useState('')
  const [emailUserVerify, setUserEmailVerify] = useState(null)
  const [loading, setLoading] = useState(false)

  // Hooks
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      credential_id: '',
      password: ''
    }
  })

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/ash.png'
  const lightIllustration = '/images/illustrations/auth/ash.png'
  const borderedDarkIllustration = ''
  const borderedLightIllustration = ''

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )


  /*___________________________
  │   * METHOD FORM SIGN IN    │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const singIn = async params => {
    setPostErrorMessage('')
    setLoading(true)

    try {
      const { token, msg, user } = await LoginUser(params)

      if (user) {
        dispatch(saveToken({ token, user }))
        router.push('/registra_pokemon')
      } else {
        setPostErrorMessage(msg)
      }

    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)


  /*_____________________________________
│   * METHOD RENDER COMPONENT CARDS    │
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const LoginComponent = () => {
    return (
      <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
        <div className='text-center'>
          <img src="/images/illustrations/auth/pikachu.png" alt="Pikachu" />
          <Typography className='mbs-1'>Inicia sesión ahora para iniciar este gran desafío y más aventuras</Typography>
        </div>

        <form onSubmit={handleSubmit(singIn)} className='flex flex-col gap-5'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Controller
                name='credential_id'
                control={control}
                rules={{
                  required: 'Este campo es requerido.',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='text'
                    label='Identificador'
                    placeholder=''
                    error={!!errors.credential_id}
                    helperText={errors.credential_id?.message}
                  />
                )}
              />

            </Grid>
            <Grid item xs={12}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Password'
                    id='outlined-password'
                    placeholder='············'
                    type={isPasswordShown ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            size='small'
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...(errors.password && { error: true, helperText: 'Este campo es requerido' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography component='div' className='text-center mt-0' color='error'>
                {postErrorMessage != '' ? (
                  !emailUserVerify ? (
                    <Chip label={postErrorMessage} color='error' variant='tonal' />
                  ) : (
                    <Typography
                      component={Link}
                      color='error'
                      onClick={() => {
                        handleVerifyComp(true)
                      }}
                    >
                      {postErrorMessage}
                    </Typography>
                  )
                ) : (
                  ''
                )}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
                <FormControlLabel control={<Checkbox />} label='Recuerdame' />
                <Typography className='text-end' color='primary' component={Link}>
                  Olvidaste tu contraseña?
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button fullWidth variant='contained' type='submit' className='gap-2'>
                {loading && <CircularProgress size={20} color='inherit' />}
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
          <div className='flex justify-center items-center flex-wrap gap-2'>
            <Typography>Eres nuevo?</Typography>
            <Typography component={Link} href='/register' color='primary'>
              Create una cuenta
            </Typography>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='plb-12 pis-12'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[750px] max-is-full bs-auto'
          />
        </div>
        <Illustrations
          image1={null}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'>
          <Logo login={true} />
        </Link>
        <LoginComponent />
      </div>
    </div>
  )
}

export default Login
