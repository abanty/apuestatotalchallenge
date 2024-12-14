
import NProgress from 'nprogress'
import axios from '@/utils/axios'

/*___________________________________
│   * METHOD GET ALL MEDALS INFO     │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const getTotalMedalsInfo = async () => {

  try {
    const data = await axios.get('medal/findAllMedals')

    console.log({ data });

    return data

  } catch (error) {
    console.error(error)
  }
}
