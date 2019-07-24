import axios from 'axios'

const urlBase = axios.create({
    baseURL: 'http://34.68.209.220:3000/api/v1',
    timeout: 15000
})
// const urlBase = axios.create({
//     baseURL: 'http://192.168.15.14:3000/api/v1',
//     timeout: 15000
// })

export default urlBase