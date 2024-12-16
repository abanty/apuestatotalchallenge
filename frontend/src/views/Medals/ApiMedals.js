import NProgress from 'nprogress'
import axios from '@/utils/axios'

/*___________________________________
│   * METHOD GET ALL MEDALS INFO     │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const getTotalMedalsInfo = async () => {
  try {
    const data = await axios.get('medal/findAllMedals')
    return data
  } catch (error) {
    console.error(error)
  }
}

/*_______________________________________
│   * METHOD REGISTER MEDALS ASIGGNED    │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const registerMedalsAssigned = async (medal_id, user_id) => {
  try {
    const data = await axios.post(`medal/add`, { medal_id, user_id })
    return data
  } catch (error) {
    console.error(error)
  }
}
