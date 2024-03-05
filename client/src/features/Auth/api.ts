import type { CheckUser, RegUser, UserAndId, Userr } from "./type";

export const registrationFetch = async(obj:RegUser):Promise<UserAndId> => {
    const res = await fetch ('/api/auth/registration', {
        method:'POST',
       headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(obj)
    })
    if(res.ok){
        const data = await res.json()
        return data.user
    }
    const {message} = await res.json()
    throw message
}


export const loginFetch = async(obj:Userr):Promise<UserAndId> => {
    const res = await fetch ('/api/auth/login', {
        method:'POST',
       headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(obj)
    })
    if(res.ok){
        const data = await res.json()
        return data.user
    }
    const {message} = await res.json()
    throw message
}

export const checkUserFetch = async():Promise<CheckUser> => {
    const res = await fetch ('/api/auth/check')
    if(res.ok){
        const data = await res.json()        
        return data.user
    }
    const {message} = await res.json()
    throw message
}