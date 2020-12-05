export interface JwtReponseI {
    client:{
        id: string,
        nickname: string,
        password: string,
        email: string,
        address: string,
        phone: string
        
    }
    data:{
        token: string,
        expiresIn: string
    }
    status: string
}
