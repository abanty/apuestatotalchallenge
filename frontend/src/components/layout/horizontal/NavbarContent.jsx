'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports

import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import GrainIcon from '@mui/icons-material/Grain'

import NotificationsDropdown from '@components/layout/shared/NotificationsDropdown'

import NavToggle from './NavToggle'
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'
const NavbarContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  const handleClick = event => {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
  }

  return (
    <div
      className={classnames(horizontalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
    >
      <div role='presentation' onClick={handleClick} className='mt-1'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link underline='hover' sx={{ display: 'flex', alignItems: 'center' }} color='inherit' href='/'>
            <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            MUI
          </Link>
          <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
            <GrainIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            Module
          </Typography>
        </Breadcrumbs>
      </div>

      <div className='flex items-center gap-4'>
        <NavToggle />
        {/* Hide Logo on Smaller screens */}
        {!isBreakpointReached && <Logo />}
      </div>
      <div className='flex items-center'>
        <ModeDropdown />
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
