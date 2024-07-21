import baseUrl from '../helpers/BaseUrlHelper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const APIClient = axios.create({
  baseURL: baseUrl,
  timeout: 30000
})

APIClient.interceptors.request.use(async (config) => {
  let token: string | null = await AsyncStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

APIClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

export default APIClient
