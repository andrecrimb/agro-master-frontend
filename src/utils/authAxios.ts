import axios from 'axios'

const authAxios = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt')
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
  return config
})

export default authAxios
