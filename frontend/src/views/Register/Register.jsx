'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import FormHelperText from '@mui/material/FormHelperText'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import { useForm, Controller } from 'react-hook-form'

import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Third-party Imports
import { addUser } from './ApiRegister'


const RegisterV2 = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [IDUSERPOKEMON, setshowIDUSERPOKEMON] = useState('')
  const [loading, setLoading] = useState(false)
  const [unicEmail, setUnicEmail] = useState(null)

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/ash.png'
  const lightIllustration = '/images/illustrations/auth/ash.png'
  const borderedDarkIllustration = ''
  const borderedLightIllustration = ''

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      agreeToTerms: '',
      first_name: '',
      email: '',
      password: ''
    }
  })

  const router = useRouter()
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const { settings } = useSettings()

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  /*______________________________________
  │   * METHOD SHOW OR HIDDEN PASSWORD    │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  /*_____________________________
  │   * METHOD SUBMIT SING UP    │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const addNewUser = async formdata => {
    setLoading(true)

    try {

      const params = {
        credential_id: null,
        email: formdata.email,
        first_name: formdata.first_name,
        password: formdata.password,
      }

      const response = await addUser(params)

      if (response) {
        const { credential_id } = response
        setshowIDUSERPOKEMON(credential_id)
      }

    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  /*________________________________________
  │   * METHOD RENDER COMPONENT REGISTER    │
   ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const RenderMainComponent = () => {
    return (
      <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
        <div className='text-center'>
          <img src="/images/illustrations/auth/pikachu.png" alt="Pikachu" />
          <Typography className='mbs-1'>Por favor, crea una cuenta para iniciar un nuevo desafio 👍</Typography>
        </div>
        <form onSubmit={handleSubmit(addNewUser)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Controller
                name='first_name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Nombres'
                    placeholder='John Queen'
                    {...(errors.first_name && { error: true, helperText: 'Este campo es requerido.' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='johndoe@gmail.com'
                    error={!!errors.email || !!unicEmail}
                    helperText={errors.email ? 'Este campo es requerido.' : unicEmail}
                    onChange={e => {
                      field.onChange(e)
                      setUnicEmail(null)
                    }}
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
                    label='Contraseña'
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
              <div className="flex justify-between items-center gap-3">
                <Controller
                  name="agreeToTerms"
                  control={control}
                  rules={{ required: 'Debes aceptar las políticas de privacidad.' }}
                  render={({ field }) => (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value || false} // Handle undefined initial state
                          />
                        }
                        label={
                          <>

                            <span>Acepto la política de </span>
                            <Link
                              className="text-primary"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              privacidad
                            </Link>
                          </>
                        }
                      />
                    </>
                  )}
                />
              </div>
              {/* Error Message */}
              {errors.agreeToTerms && (
                <FormHelperText error>
                  {errors.agreeToTerms.message}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button fullWidth variant='contained' type='submit'>
                {loading && <CircularProgress size={20} color='inherit' />}
                Registrate
              </Button>
            </Grid>
          </Grid>
          <div className='flex justify-center items-center flex-wrap gap-2 pt-1'>
            <Typography>Ya tienes una cuenta?</Typography>
            <Typography component={Link} href='/login' color='primary'>
              Inicia sesión
            </Typography>
          </div>

        </form>
      </div>
    )
  }

  /*_______________________________________
  │   * METHOD RENDER COMPONENT SHOW ID    │
   ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const RenderShowIDComponent = ({ ID_USER_POKEMON }) => {

    return (
      <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
        <div className='text-center'>
          <img src="/images/illustrations/auth/pokeballs.png" alt="Pikachu" />
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography className='mbs-1'>Tu ID de ingreso es: </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography className='text-center mb-4' variant='h3'>
                {ID_USER_POKEMON}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography className='mbs-1'>Es hora de cazar pokemones !</Typography>
            </Grid>
          </Grid>

          <Grid className='mt-2' item xs={12}>
            <Button fullWidth variant='contained' href='/login' >
              INICIAR SESIÓN
            </Button>
          </Grid>
        </div>
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
        <Link href={''} className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'>
        </Link>
        {!IDUSERPOKEMON ? <RenderMainComponent /> : <RenderShowIDComponent ID_USER_POKEMON={IDUSERPOKEMON} />}
      </div>
    </div>
  )
}

export default RegisterV2
