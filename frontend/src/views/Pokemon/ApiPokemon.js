// Axios helper Imports
import { toast } from 'react-toastify'
import NProgress from 'nprogress'
import axios from '@/utils/axios'

/*_____________________________________________
│   * METHOD GET TOTAL POKEMONS COLLECTIONS    │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const getAmountPokemons = async user_id => {
  try {
    const data = await axios.get(`pokemon/getTotalPokemons/${user_id}`)
    return data
  } catch (error) {
    console.error(error)
  }
}



