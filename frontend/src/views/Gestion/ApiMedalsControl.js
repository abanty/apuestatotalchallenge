import { toast } from 'react-toastify'
import NProgress from 'nprogress'
import axios from '@/utils/axios'

/*__________________________________________
│   * METHOD ALL MEDALS USER NOTIFICATIONS  │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const getTotalMedalsInfoUser = async () => {
  try {
    const data = await axios.get('medal-user/findAllMedalsByAdmin')
    return data
  } catch (error) {
    console.error(error)
  }
}

/*_____________________________________________
│   * METHOD UPDATE MEDALS USER NOTIFICATIONS  │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const updateTotalMedalsInfoUser = async formData => {
  try {
    const data = await axios.put('medal-user/updateAdmin', formData)

    if (formData.status == true) {
      toast.success('Usuario verificado 😎!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    } else {
      toast.error('Usuario rechazado !', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }

    return data
  } catch (error) {
    console.error(error)
  }
}
