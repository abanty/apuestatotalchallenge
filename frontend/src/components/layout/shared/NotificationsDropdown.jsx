'use client'

// React Imports
import { useRef, useState, useEffect } from 'react'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'

// Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// import { updateNotifications } from '@/views/notifications/ApiNotifications'
// import { updateBranchUserStatusCondition } from '@/views/branches/ApiBranch'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getInitials } from '@/utils/getInitials'

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <div className='overflow-x-hidden bs-full'>{children}</div>
  } else {
    return (
      <PerfectScrollbar className='bs-full' options={{ wheelPropagation: false, suppressScrollX: true }}>
        {children}
      </PerfectScrollbar>
    )
  }
}

const getAvatar = params => {
  const { avatarImage, avatar_icon, avatarText, title, avatar_color, avatarSkin } = params

  if (avatarImage) {
    return <Avatar src={avatarImage} />
  } else if (avatar_icon) {
    return (
      <CustomAvatar color={avatar_color} skin={avatarSkin || 'light-static'}>
        <i className={avatar_icon} />
      </CustomAvatar>
    )
  } else {
    return (
      <CustomAvatar color={avatar_color} skin={avatarSkin || 'light-static'}>
        {avatarText || getInitials(title)}
      </CustomAvatar>
    )
  }
}

const NotificationDropdown = ({ notifications }) => {
  // States
  const [open, setOpen] = useState(false)
  const [notificationsState, setNotificationsState] = useState(notifications)

  // Vars
  const notificationCount = notificationsState.filter(notification => !notification.read).length
  const readAll = notificationsState.every(notification => notification.read)

  // Refs
  const anchorRef = useRef(null)
  const ref = useRef(null)

  // Hooks
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { settings } = useSettings()

  // Actualizar notificationsState cuando notifications (el prop) cambie
  useEffect(() => {
    if (notifications && Array.isArray(notifications)) {
      setNotificationsState(notifications)
    }
  }, [notifications])

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  // Read notification when notification is clicked
  const handleReadNotification = async (event, value, index, dataNotification) => {
    event.stopPropagation()

    const newNotifications = [...notificationsState]
    const { id } = dataNotification

    console.log({ dataNotification })

    // await updateNotifications(id, dataNotification)

    newNotifications[index].read = value
    setNotificationsState(newNotifications)
  }

  // Acepted invitation notification when close icon is clicked
  const handleAceptInvitation = async (event, value, index, dataNotification) => {
    event.stopPropagation()

    const newNotifications = [...notificationsState]

    console.log({ newNotifications })
    console.log({ dataNotification })

    const { id } = dataNotification
    // const { user_id, branch_id } = await updateNotifications(id, dataNotification)

    if (user_id && branch_id) {
      const response = await updateBranchUserStatusCondition(user_id, branch_id)

      handleRemoveNotification(event, index)

      if (response) {
      }
    }

    newNotifications[index].read = value
  }

  // Remove notification when close icon is clicked
  const handleRemoveNotification = (event, index) => {
    event.stopPropagation()
    const newNotifications = [...notificationsState]

    newNotifications.splice(index, 1)
    setNotificationsState(newNotifications)
  }

  // Read or unread all notifications when read all icon is clicked
  const readAllNotifications = () => {
    const newNotifications = [...notificationsState]

    newNotifications.forEach(notification => {
      notification.read = !readAll
    })
    setNotificationsState(newNotifications)
  }

  // useEffect(() => {
  //   const adjustPopoverHeight = () => {
  //     if (ref.current) {
  //       // Calculate available height, subtracting any fixed UI elements' height as necessary
  //       const availableHeight = window.innerHeight - 100

  //       ref.current.style.height = `${Math.min(availableHeight, 550)}px`
  //     }
  //   }

  //   window.addEventListener('resize', adjustPopoverHeight)
  // }, [])

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle} className='!text-textPrimary'>
        <Badge
          color='error'
          className='cursor-pointer'
          variant='dot'
          overlap='circular'
          invisible={notificationCount === 0}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <i className='ri-notification-2-line' />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        ref={ref}
        anchorEl={anchorRef.current}
        {...(isSmallScreen
          ? {
              className: 'is-full !mbs-4 z-[1] max-bs-[550px] bs-[550px]',
              modifiers: [
                {
                  name: 'preventOverflow',
                  options: {
                    padding: themeConfig.layoutPadding
                  }
                }
              ]
            }
          : { className: 'is-96 !mbs-4 z-[1] max-bs-[550px] bs-[550px]' })}
      >
        {({ TransitionProps, placement }) => (
          <Fade {...TransitionProps} style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top' }}>
            <Paper className={classnames('bs-full', settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg')}>
              <ClickAwayListener onClickAway={handleClose}>
                <div className='bs-full flex flex-col'>
                  <div className='flex items-center justify-between plb-2 pli-4 is-full gap-4'>
                    <Typography variant='h5' className='flex-auto'>
                      Notifications
                    </Typography>
                    {notificationCount > 0 && (
                      <Chip size='small' variant='tonal' color='primary' label={`${notificationCount} New`} />
                    )}
                    <Tooltip
                      title={readAll ? 'Mark all as unread' : 'Mark all as read'}
                      placement={placement === 'bottom-end' ? 'left' : 'right'}
                      slotProps={{
                        popper: {
                          sx: {
                            '& .MuiTooltip-tooltip': {
                              transformOrigin:
                                placement === 'bottom-end' ? 'right center !important' : 'right center !important'
                            }
                          }
                        }
                      }}
                    >
                      {notificationsState.length > 0 ? (
                        <IconButton size='small' onClick={() => readAllNotifications()} className='text-textPrimary'>
                          <i className={readAll ? 'ri-mail-line' : 'ri-mail-open-line'} />
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </Tooltip>
                  </div>
                  <Divider />
                  <ScrollWrapper hidden={hidden}>
                    {notificationsState.length > 0 ? (
                      notificationsState.map((notification, index) => {
                        const {
                          id,
                          title,
                          message,
                          type,
                          time,
                          read,
                          avatarImage,
                          avatar_icon,
                          avatarText,
                          avatar_color,
                          avatarSkin,
                          status,
                          Branches
                        } = notification

                        return (
                          <div
                            key={index}
                            className={classnames('flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group', {
                              'border-be': index !== notificationsState.length - 1
                            })}
                            onClick={e => handleReadNotification(e, true, index, { ...notification, read: true })}
                          >
                            {getAvatar({ avatarImage, avatar_icon, title, avatarText, avatar_color, avatarSkin })}
                            <div className='flex flex-col flex-auto'>
                              <Typography className='font-medium mbe-1' color='text.primary'>
                                {title}
                              </Typography>
                              <Typography variant='caption' color='text.secondary' className='mbe-2'>
                                {type == 'invitacion' ? message + ' ' + Branches.company_name : message}
                              </Typography>

                              {type == 'invitacion' ? (
                                <div className='flex items-center justify-start '>
                                  <Button
                                    color='success'
                                    variant='outlined'
                                    size='small'
                                    className='py-0 text-xs'
                                    onClick={e => {
                                      handleAceptInvitation(e, true, index, {
                                        ...notification,
                                        status: false,
                                        read: true
                                      })
                                    }}
                                  >
                                    Aceptar
                                  </Button>
                                  <Button
                                    color='error'
                                    variant='outlined'
                                    size='small'
                                    className='py-0 ml-3 text-xs'
                                    onClick={e => {
                                      handleRemoveNotification(e, index)
                                      // updateNotifications(id, { ...notification, status: false })
                                    }}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              ) : (
                                <></>
                              )}

                              <Typography variant='caption'>{time}</Typography>
                            </div>
                            <div className='flex flex-col items-end gap-2.5'>
                              <Badge
                                variant='dot'
                                color={read ? 'secondary' : 'primary'}
                                onClick={e => handleReadNotification(e, !read, index, { ...notification, read: !read })}
                                className={classnames('mbs-1 mie-1', {
                                  'invisible group-hover:visible': read
                                })}
                              />
                              <i
                                className='ri-close-line text-xl invisible group-hover:visible text-textSecondary'
                                onClick={e => handleRemoveNotification(e, index)}
                              />
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <Typography variant='body2' color='text.secondary' className='p-4 text-center'>
                        No tienes notificaciones pendientes
                      </Typography>
                    )}
                  </ScrollWrapper>
                  <Divider />
                  <div className='p-4'>
                    <Button fullWidth variant='contained' size='small'>
                      View All Notifications
                    </Button>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default NotificationDropdown
