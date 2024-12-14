'use client'

// Third-party Imports
import classnames from 'classnames'

// React Imports
import { useState, useEffect } from 'react'

// Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// Component Imports

import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import GrainIcon from '@mui/icons-material/Grain'

import NotificationsDropdown from '@components/layout/shared/NotificationsDropdown'

import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const handleClick = event => {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

const NavbarContent = () => {

  const [notifications, setNotifications] = useState([])



  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div role='presentation' onClick={handleClick} className='mt-1'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link underline='hover' sx={{ display: 'flex', alignItems: 'center' }} color='inherit' href='/'>
            <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            <b>
              POKEDEX
            </b>
          </Link>
          {/* <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
            <GrainIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            Actividad
          </Typography> */}
        </Breadcrumbs>
      </div>

      <div className='flex items-center gap-4'>
        <NavToggle />
      </div>
      <div className='flex items-center'>
        <ModeDropdown />
        <NotificationsDropdown notifications={notifications} />
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
