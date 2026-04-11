import Globals from "@/shared/globals"
import axios from "axios"

import type { LoginInputs } from "@/types/LoginInputs"
import type { RegisterInputs } from "@/types/RegisterInputs"

export const registerUser = async (data: RegisterInputs) => {
    const response = await axios.post(
        // `${Globals.baseUrl}${Globals.registerRoute}`,
        "http://localhost:3000/auth/register/",
        data
    )
    return response.data
}

export const loginUser = async (data: LoginInputs) => {
    const response = await axios.post(
        `${Globals.baseUrl}${Globals.loginRoute}`,
        data
    )
    return response.data
}
