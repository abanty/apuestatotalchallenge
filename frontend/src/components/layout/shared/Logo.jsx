'use client'

// React Imports
import { useEffect, useRef } from 'react'

// Third-party Imports
import styled from '@emotion/styled'

// Component Imports
import MaterioLogo from '@core/svg/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

const Logo = ({ login }) => {
  // Refs
  const logoTextRef = useRef(null)

  // Hooks
  const { isHovered, transitionDuration, isBreakpointReached } = useVerticalNav()
  const { settings } = useSettings()

  // Vars
  const { layout } = settings

  useEffect(() => {
    if (layout !== 'collapsed') {
      return
    }

    if (logoTextRef && logoTextRef.current) {
      if (!isBreakpointReached && layout === 'collapsed' && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, layout, isBreakpointReached])

  return (
    <div className='flex items-center min-bs-[10px] pt-3'>
      
      <img src="/images/illustrations/auth/pokebola2.webp" width={login ? '74' : '40'} height={login ? '70' : '38'} alt="logo" />
      <img src="/images/illustrations/auth/pokemon-App.png" width={login ? 'auto' : '150'} height={login ? '55' : 'auto'} alt="logo" />

    </div>
  )
}
// CAMBIOS
export default Logo
