import  {JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken"

const generatedToken = (payload: any, secret: Secret, expiresIn: string) => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn
    } as SignOptions
)
return token
}

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload
}

export const jwtHelper = {
 generatedToken,
 verifyToken
}