import axios from "axios"
const BASE_URL="http://localhost:5000/api/"
export const IMAGE_BASE_URL="http://localhost:5000/"

const header = {
    "Authorization" : localStorage.getItem("token")
}

class apiServices{

    login(data){
        return axios.post(BASE_URL+"login",data)
    }

    dashboard(data){
        return axios.post(BASE_URL+"dashboard",data,{headers:header})
    }
    
    addTheme(data){
        return axios.post(BASE_URL+"theme/add",data,{headers:header})
    }
    
    getallTheme(data){
        return axios.post(BASE_URL+"theme/getall",data,{headers:header})
    }

    getSingleTheme(data){
        return axios.post(BASE_URL+"theme/getsingle",data,{headers:header})
    }
    
    updateTheme(data){
        return axios.post(BASE_URL+"theme/update",data,{headers:header})
    }

    deleteTheme(data){
        return axios.post(BASE_URL+"theme/delete",data,{headers:header})
    }
    
    addStory(data){
        return axios.post(BASE_URL+"story/add",data,{headers:header})
    }
    
    getallStory(data){
        return axios.post(BASE_URL+"story/getall",data,{headers:header})
    }

    getSingleStory(data){
        return axios.post(BASE_URL+"story/getsingle",data,{headers:header})
    }
    
    updateStory(data){
        return axios.post(BASE_URL+"story/update",data,{headers:header})
    }

    deleteStory(data){
        return axios.post(BASE_URL+"story/delete",data,{headers:header})
    }

    addFeedback(data){
        return axios.post(BASE_URL+"feedback/add",data,{headers:header})
    }
    
    getallFeedback(data){
        return axios.post(BASE_URL+"feedback/getall",data,{headers:header})
    }
    
    addReader(data){
        return axios.post(BASE_URL+"register",data,{headers:header})
    }
    
    getallReader(data){
        return axios.post(BASE_URL+"users/getall",data,{headers:header})
    }
    
    addSaveLater(data){
        return axios.post(BASE_URL+"saveLater/add",data,{headers:header})
    }
    
    getallSaveLater(data){
        return axios.post(BASE_URL+"saveLater/getall",data,{headers:header})
    }

    removeSaveLater(data){
        return axios.post(BASE_URL+"saveLater/removestory",data,{headers:header})
    }
    removeSaveLaterAnother(data){
        return axios.post(BASE_URL+"saveLater/removestoryanother",data,{headers:header})
    }

}

export default new apiServices()