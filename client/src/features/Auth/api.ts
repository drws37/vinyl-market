import type { User, UserAndId, UserWithoutNameAndRpasswordAndRole } from "./type";

export const registrationFetch = async(obj:User):Promise<UserAndId> => {
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


export const loginFetch = async(obj:UserWithoutNameAndRpasswordAndRole):Promise<UserAndId> => {
    const res = await fetch ('/api/auth/login', {
        method:'POST',
       headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(obj)
    })
    if(res.ok){
        const data = await res.json()
        return data
    }
    const {message} = await res.json()
    throw message
}