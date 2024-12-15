
import NProgress from 'nprogress'

import axios from '@/utils/axios'
/*___________________________________
│   * METHOD LOGIN USER TO SYSTEM    │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const LoginUser = async params => {

  try {
    NProgress.configure({
      showSpinner: false,
      minimum: 0.1,
      trickleSpeed: 50
    })

    NProgress.start()


    console.log({ params });


    const { data } = await axios.post('user/singin', params)


    console.log({ data });


    return data

  } catch (e) {
    console.error(e)
  } finally {
    NProgress.done()

  }
}