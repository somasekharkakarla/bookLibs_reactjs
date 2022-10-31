import axios from "axios"
import * as AxiosLogger from 'axios-logger';


const baseUrl = process.env.REACT_APP_BASE_URL
class Network{
     
    constructor(){
       this.api = axios.create({
            timeout: 1000
          })
          this.api.interceptors.request.use(AxiosLogger.requestLogger)
          
          this.api.interceptors.response.use(AxiosLogger.responseLogger)
    }

    checkUserExists = (userName) =>{
        console.warn("baseUrl", baseUrl)
        return new Promise((resolve, reject) =>{
            this.api.post(`${baseUrl}/users/`,{userName},{ headers: { "Content-Type": "application/json" } }).then((res) =>{
                resolve(res.data)
             })
        })
    }

    getBooksList = (token) =>{
        return new Promise((resolve) =>{
            this.api.get(`${baseUrl}/books`,{headers:{jwt:token}}).then((res)=>{
                resolve(res.data)
            })
        })
    }

    createBook = (title, summary, token) =>{
        console.warn("baseUrl", baseUrl)
        return new Promise((resolve, reject) =>{
            this.api.post(`${baseUrl}/books`,{
                title,
                summary
            },{ headers: { "Content-Type": "application/json", "jwt":token } }).then((res) =>{
                resolve(res.data)
             })
        })
    }

   deleteBook = (id, token) =>{
        console.warn("baseUrl", baseUrl)
        return new Promise((resolve, reject) =>{
            this.api.post(`${baseUrl}/books/delete`,{
                _id:id
            },{ headers: { "Content-Type": "application/json", "jwt":token } }).then((res) =>{
                resolve(res.data)
             })
        })
    }

    updateBook = (id, title, summary, token) =>{
        console.warn("baseUrl", baseUrl)
        return new Promise((resolve, reject) =>{
            this.api.put(`${baseUrl}/books`,{
                id,
                title,
                summary
            },{ headers: { "Content-Type": "application/json", "jwt":token } }).then((res) =>{
                resolve(res.data)
             })
        })
    }

}
const network = new Network()
export {
network
}