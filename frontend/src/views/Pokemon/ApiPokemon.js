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

/*____________________________________________
│   * METHOD REGISTER POKEMONS COLLECTIONS    │
 ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯*/
export const addPokemonsColections = async formData => {
  try {
    const data = await axios.post(`pokemon/add`, formData)

    if (data) {
      toast.success('Pokemons registrados 😎!', {
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
