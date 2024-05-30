import { env } from '@carhub/env'
import axios from 'axios'

const ENABLE_API_DELAY = false

export const api = axios.create({
  baseURL: `http:/localhost:${env.SERVER_PORT}/`,
  withCredentials: true,
})

if (ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 4000)),
    )

    return config
  })
}
