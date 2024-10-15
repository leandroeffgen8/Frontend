import { api, requestConfig } from '../utils/config';

// RETORNA OS DADOS DO USUÁRIO
const profile = async(data, token) => {
    
    const config = requestConfig('GET', data, token);

    try {

        const response = await fetch(`${api}/users/profile`, config);
        const profile = await response.json();

        console.log('Retorna o pefil do usuário', profile);

        return profile;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//RETORNA TODOS OS USUÁRIOS
export const getUserAll = async() => {
    
    const config = requestConfig('GET', null, null);

    try {

        const response = await fetch(`${api}/users/all`, config);
        const allUser = await response.json();

        console.log('Retorna todos os moradores', allUser);

        return allUser;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

// ATUALIZA OS DADOS DO USUÁRIO
const updateProfile = async(data, token) => {

    const config = requestConfig('PUT', data, token, true);

    try {

        const response = await fetch(`${api}/users/`, config);
        const update = await response.json();

        console.log('Update usuário', update);

        return update
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

const userService = {
    profile,
    updateProfile,
    getUserAll,
}

export default userService;