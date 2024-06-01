import { AppError } from '@utils/AppError'
import axios, { AxiosInstance } from 'axios'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManger: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://localhost:3333/',
}) as APIInstanceProps

api.interceptors.response.use(
  (response) => response,
  (requestError) => {
    if (requestError.response && requestError.response.data) {
      return Promise.reject(
        new AppError(
          requestError.response.data.message,
          requestError.response.data.code,
        ),
      )
    } else {
      return Promise.reject(
        new AppError(
          'Erro no servidor tente novamente mais tarde.',
          'server_error',
        ),
      )
    }
  },
)

export { api }
