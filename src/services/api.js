import Axios from 'axios'


// export const apiUrl = process.env.NODE_ENV === 'production' ? 'placeholder' : 'http://localhost:3001'

// const Client = Axios.create({ baseURL: apiUrl })

export const BASE_URL = 'http://localhost:3001'

const Client = Axios.create({ baseURL: BASE_URL })


Client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)


export default Client
