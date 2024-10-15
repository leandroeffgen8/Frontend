import { api, requestConfig } from '../utils/config';

//Registar usuario
const registerUser = async(data) => {
    const config = requestConfig('POST', data)

    try {

        const response = await fetch(`${api}/users/create`, config);
        const create = await response.json();

        console.log('Registrando usuário', create);
        
        if(create._id){
            localStorage.setItem('user', JSON.stringify(create))
        }

        return create;

    } catch (error) {
        console.log(error);
    }
}

const logoutUser = () => {
    localStorage.removeItem('user')
}

// Loga usuário
const loginUser = async(data) => {
    
    const config = requestConfig('POST', data)

    try {
        
        const response = await fetch(`${api}/users/login`, config);
        const login = await response.json();

        console.log('Logando usuário', login);

        if(login._id){
            localStorage.setItem('user', JSON.stringify(login));
        }

        return login;

    } catch (error) {
        console.log(error)
    }

}

//Deslogar usuário
const authService = {
    registerUser,
    logoutUser,
    loginUser
}

export default authService;