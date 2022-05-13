import {environment} from "../../environments/environment";

const baseUrl = environment.API

export const urls = {
    getUser:`${baseUrl}/users/get`,
    registration: `${baseUrl}/auth/registration`,
    activateToken: `${baseUrl}/auth/activate/:token`,
    login: `${baseUrl}/auth/login`,
    logout: `${baseUrl}/auth/logout`,
    refresh: `${baseUrl}/auth/refresh`,
    forgot_password: `${baseUrl}/auth/forgot-password`,
    forgot_password_reset: `${baseUrl}/auth/password/forgot/reset`,
    password_reset: `${baseUrl}/auth/password/reset`,

}
