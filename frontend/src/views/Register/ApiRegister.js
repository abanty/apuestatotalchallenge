// Axios helper Imports
import { toast } from 'react-toastify'
import NProgress from 'nprogress'

import axios from '@/utils/axios'

/*_____________________________________
│   * METHOD ADD NEW USER TO SYSTEM    │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const addUser = async formData => {
  NProgress.configure({
    showSpinner: false,
    minimum: 0.1,
    trickleSpeed: 50
  })

  NProgress.start()

  try {
    const { data } = await axios.post('user/add', formData)
    return data
  } catch (error) {
    console.error(error)
  } finally {
    NProgress.done()
  }
}


/*________________________________
│   * METHOD VERIFY USER EMAIL    │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const verifyEmail = async formData => {

  try {
    // const data = await axios.post('user/add', formData)

    // NProgress.done()
    // console.log({ data });
    // return data

  } catch (error) {
    console.error(error)
  }
}


