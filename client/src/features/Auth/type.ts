export type User = {
    username:string
    email:string
    password:string
    rpassword:string
    role:string
}

export type UserAndId  = User & {id:number}


export type StateAuth = {
    user:null | User
    message:string | undefined

}