import { apiClient } from "./config"


export const apiSignup = async (payload) => {
    return await apiClient.post ( '/vendors/register', payload)
}
export const apiSignin = async (payload) => {
    return await apiClient.post ( '/vendors/login', payload)
}
export const apiGetAdverts = async () => {
    return await apiClient.get ( '/adverts' )
}
export const apiPostAdverts = async (payload) => {
    return await apiClient.post ( '/adverts' )
}
export const apiEditAdverts = async (payload) => {
    return await apiClient.patch ( '/adverts/6718ceea33c080a3aeb00efc' )
}

