import APIResponseModel from "@/models/APIResponseModel"
import LoginModel from "@/models/LoginModel"
import APIClient from "./APIClient"
import RegisterModel from "@/models/RegisterModel"
import AccountModel from "@/models/AccountModel"

const login = (data: LoginModel): Promise<APIResponseModel<{account: AccountModel; token:string}>> =>{
    return new Promise( async (resovle, reject) => {
        try {
            let result = await APIClient.post<APIResponseModel<{account: AccountModel; token:string}>>('/auth/login',data);
            resovle(result.data)
        } catch (error) {
            reject(error)
        }
    })
}

const register = (data: RegisterModel): Promise<APIResponseModel<AccountModel>> => {
    return new Promise( async (resovle, reject) => {
        try {
            let result = await APIClient.post<APIResponseModel<AccountModel>>('/auth/register/customer',data);
            resovle(result.data)
        } catch (error) {
            reject(error)
        }
    })
}

export { login , register}