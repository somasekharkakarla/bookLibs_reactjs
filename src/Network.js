import axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_URL
class Network{

    checkUserExists = (userName) =>{
        console.warn("baseUrl", baseUrl)
        return new Promise((resolve, reject) =>{
             axios.post(`${baseUrl}/users/`,{userName},{ headers: { "Content-Type": "application/json" } }).then((res) =>{
                resolve(res.data)
             })
        })
    
    }
}
const network = new Network()
export {
network
}