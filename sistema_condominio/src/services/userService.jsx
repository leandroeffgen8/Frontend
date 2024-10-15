import { api, requestConfig } from '../utils/config';

export const profile = async(data, token) => {
    const config = requestConfig('GET', data, token);

    try {
        
        const res = await fetch(api + '/users/profile', config)     
        .then(res => res.json())
        .catch(err => err)

        return res

    } catch (error) {
        console.log(error);
    }
}

export const getUserAll = async() => {
    
    const config = requestConfig('GET', null, null);

    try {

        const response = await fetch(`${api}/users`, config);
        const allUser = await response.json();

        console.log('Retorna todos os moradores', allUser);

        return allUser;
        
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (data, token) => {

    const config = requestConfig('PUT', data, token, true);

    try {

        const res = await fetch(api + '/users/', config)
        .then(res => res.json())
        .catch(err => err)

        return res
    
    } catch (error) {
        console.log(error);
    }
}

const userService = {
    profile,
    getUserAll,
    updateProfile
}

export default userService;