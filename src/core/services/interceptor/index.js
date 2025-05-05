import axios from 'axios'
import { selTok } from '../../../screens/Panel'

let token = localStorage.getItem("token")

const customAxios = axios.create({

    baseURL : "https://classapi.sepehracademy.ir/api"
    
})

const succses = (response)=> {
    return response.data
}

const error = (err) => {
    return Promise.reject(err)
}

customAxios.interceptors.response.use(succses,error)

customAxios.interceptors.request.use((option)=> {
    if(!selTok) option.headers["Authorization"] = "Bearer " + token
    else option.headers["Authorization"] = "Bearer " + selTok
    return option 
})

export default customAxios