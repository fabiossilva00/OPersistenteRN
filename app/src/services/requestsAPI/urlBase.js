import axios from 'axios'

const urlBase = axios.create({
    baseURL: 'http://192.168.15.18:3000/api/v1',
    timeout: 120000
})

export default urlBase