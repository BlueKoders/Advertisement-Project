import { apiClient } from "./config"


export const apiSignup = async (payload) => {
    return await apiClient.post ( '/vendors/register', payload)
}