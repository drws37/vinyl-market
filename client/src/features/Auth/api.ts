import type { RegUser, User, Userr } from "./type";

export const registrationFetch = async(obj:RegUser):Promise<User> => {
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


export const loginFetch = async(obj:Userr):Promise<User> => {
    const res = await fetch ('/api/auth/login', {
        method:'POST',
       headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(obj)
    })
    if(res.ok){
        const data = await res.json()
        console.log(data.user, '01010101010');
        
        return data.user
    }
    const {message} = await res.json()
    throw message
}

export const checkUserFetch = async():Promise<User> => {
    const res = await fetch ('/api/auth/check')
    if(res.ok){
        const data = await res.json()        
        return data.user
    }
    const {message} = await res.json()
    throw message
}