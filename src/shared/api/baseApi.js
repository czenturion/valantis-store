import axios from 'axios'
import { BASE_URL, PASS } from '@/shared/consts/consts'

const md5 = require('md5')

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const md5Str = md5(`${PASS}_${timestamp}`)

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-Auth': md5Str
    }
})

export default instance