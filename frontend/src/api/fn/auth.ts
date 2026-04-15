import { BASE_URL, routes } from "@/constants/api"
import axios from "axios"

import type { LoginInputs } from "@/types/LoginInputs"
import type { RegisterInputs } from "@/types/RegisterInputs"

export const registerUser = async (data: RegisterInputs) => {
    const response = await axios.post(
        `${BASE_URL}${routes.auth.register}`,
        data
    )
    return response.data
}

export const loginUser = async (data: LoginInputs) => {
    const response = await axios.post(`${BASE_URL}${routes.auth.login}`, data)
    return response.data
}
