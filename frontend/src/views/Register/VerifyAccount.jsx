'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import { Button, Grid, Typography, Chip } from '@mui/material'

// Third-party Imports
import { OTPInput } from 'input-otp'
import classnames from 'classnames'

import Link from '@components/Link'
import { generateCodeOtp, verifyCodeOtp } from './ApiRegister'

// Component Imports
import Form from '@components/Form'

// Style Imports
import styles from '@/libs/styles/inputOtp.module.css'

const Slot = props => {
  return (
    <div className={classnames(styles.slot, { [styles.slotActive]: props.isActive })}>
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

const FakeCaret = () => {
  return (
    <div className={styles.fakeCaret}>
      <div className='w-px h-5 bg-textPrimary' />
    </div>
  )
}

const VerifyAccount = ({ mode, handleVerifyAccount, userdata }) => {
  // States
  const [otp, setOtp] = useState(null)
  const [loadingOtp, setLoadingOtp] = useState(false)

  const [error, setError] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const [counterEnabled, setCounterEnabled] = useState(0)
  const [toggleCompVerified, settoggleCompVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    counterEnabled > 0 && setTimeout(() => setCounterEnabled(counterEnabled - 1), 1000)

    if (counterEnabled == 0) {
      setResendMessage('')
      setLoadingOtp(false)
    }
  }, [counterEnabled])

  useEffect(() => {
    resendOtpCode(event)
  }, [userdata])

  /*________________________________
  │   * METHOD VALIDATE CODE OTP    │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const handleSubmit = () => {
    if (!otp || otp.length !== 6) {
      setError(true)
    } else {
      setError(false)
      verifyOtpCode()
    }
  }

  /*______________________________
  │   * METHOD RESEND CODE OTP    │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const resendOtpCode = async (event) => {

    event.preventDefault()

    if (loadingOtp) return
    setLoadingOtp(true)

    try {
      if (counterEnabled > 0) return
      const data = await generateCodeOtp(userdata.email)

      setCounterEnabled(30)
      setResendMessage('Please check your email 📧')
      setLoadingOtp(false)
    } catch (e) {
      console.error(e)
    }
  }

  /*_____________________________
  │   * METHOD ACCOUNT VERIFY    │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const verifyOtpCode = async () => {
    try {
      const { data } = await verifyCodeOtp(userdata.email, otp)

      if (data !== '') {
        setError(false)
        setResendMessage('')
        setOtp('')
        settoggleCompVerified(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  /*_____________________________
  │   * METHOD ACCOUNT VERIFY    │
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
  const directLogin = () => {
    const currentUrl = window.location

    if (currentUrl.pathname === '/login') {
      window.location.reload()
    } else {
      router.push('/login')
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        {!toggleCompVerified ? (
          <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
            <div className='flex flex-col gap-1'>
              <Typography className='text-center mb-4' variant='h4'>
                Account Verification 💬
              </Typography>
              <Typography>
                We sent a verification code to your email. Enter the code from the email in the field below.
              </Typography>
            </div>
            <Form noValidate autoComplete='off' className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2'>
                <Typography>Type your 6 digit security code</Typography>
                <OTPInput
                  onChange={setOtp}
                  value={otp ?? ''}
                  maxLength={6}
                  containerClassName='group flex items-center'
                  render={({ slots }) => (
                    <div className='flex items-center justify-between w-full gap-4'>
                      {slots.slice(0, 6).map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                      ))}
                    </div>
                  )}
                />
              </div>
              {error && (
                <div className='flex justify-center items-center'>
                  <Typography component={Link} color='error'>
                    Please enter a valid 6 digit OTP
                  </Typography>
                </div>
              )}
              <Button fullWidth variant='contained' onClick={handleSubmit}>
                Verify My Account
              </Button>

              <Grid item xs={12}>
                <Typography component='div' className='text-center mt-0' color='error'>
                  {resendMessage ? <Chip label={resendMessage} color='primary' variant='tonal' /> : ''}
                </Typography>
              </Grid>
              {/* type='submit'     */}
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Didn&#39;t get the code?</Typography>
                <Typography
                  color={counterEnabled == 0 ? 'primary' : 'error'}
                  component={Link}
                  onClick={(e) => resendOtpCode(e)}
                >
                  Resend {!resendMessage && counterEnabled >= 0 ? '' : `(${counterEnabled})`}
                </Typography>
              </div>
            </Form>
          </div>
        ) : (
          <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
            <div className='flex flex-col gap-1'>
              <Typography className='text-center mb-4' variant='h4'>
                Verified account 🚀
              </Typography>
            </div>
            <Button fullWidth variant='contained' onClick={directLogin}>
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyAccount
