import { api, requestConfig } from '../utils/config';

//CRIANDO UMA RESERVA
export const createReserve = async(data, token) => {
   
    const config = requestConfig('POST', data, token);

    try {
        const response = await fetch(`${api}/reservations/create`, config);
        const create = await response.json();

        console.log('Reserva criada', create);

        return create;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//RETORNA TODAS AS RESERVAS
export const getAllReserve = async() => {
    
    const config = requestConfig('GET', null, null);

    try {

        const response = await fetch(`${api}/reservations/all`, config)
        const allReserve = await response.json();

        console.log('Retorna todas as reservas', allReserve)

        return allReserve;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//RETORNA TODAS AS MINHAS RESERVAS
export const getMyReserve = async(token) => {

    const config = requestConfig('GET', null, token);

    try {
        const response = await fetch(`${api}/reservations/my-reserve`, config);
        const myReserve = await response.json();

        console.log('Retorna toas as minhas reservas', myReserve);

        return myReserve;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//DELETE RESERVA
export const deleteReserve = async(id, token) => {

    const config = requestConfig('DELETE', null, token);

    try {
        
        const response = await fetch(`${api}/reservations/${id}`, config);
        const delReserve = await response.json();

        console.log('Deleta reserva', delReserve);

        return delReserve;

    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

const reserveService = {
    createReserve,
    getAllReserve,
    getMyReserve,
    deleteReserve
}

export default reserveService;