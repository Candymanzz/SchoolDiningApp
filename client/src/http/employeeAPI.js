import { $authHost, $host } from "./index"
import { jwtDecode } from "jwt-decode"

export const registration = async (name, surname, position, email, password) => {

    const { data } = await $authHost.post('api/employee/registration', { name, surname, position, email, password })
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/employee/login', { email, password })
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/employee/auth')
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const fetchEmployees = async (page, limit = 5) => {
    const { data } = await $authHost.get('api/employee/', {
        params: {
            page, limit
        }
    })
    return data
}

export const deleteEmployee = async (id) => {
    const { data } = await $authHost.delete('api/employee/' + id)
    return data
}