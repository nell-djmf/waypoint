import Axios from 'axios'


let BASE_URL = process.env.NODE_ENV === 'production' ? 'https://waypoint-backend.herokuapp.com/' : 'http://localhost:3001'
console.log(process.env.NODE_ENV)

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
