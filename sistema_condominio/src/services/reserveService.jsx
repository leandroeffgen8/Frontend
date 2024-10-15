import { api, requestConfig } from '../utils/config';

export const createReserve = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {
        
        const response = await fetch(api + '/reservations/', config)
        const create = await response.json();

        console.log('Criando uma reserva', create);

        return create;

    } catch (error) {
        console.log(error);
    }

}

export const getAllReserve = async() => {
    
    const config = requestConfig('GET', null, null);

    try {

        const response = await fetch(api + '/reservations/', config)
        const allReserve = await response.json();

        console.log('Retorna todas as reservas', allReserve)

        return allReserve;
        
    } catch (error) {
        console.log(error);
    }

}

export const getAllReservation = async(token) => {

    const config = requestConfig('GET', null, token);

    try {
        const response = await fetch(api + '/reservations/my-reservations', config);
        const allMyReserve = await response.json();

        console.log('Retorna todas as minhas reservas', allMyReserve);
        
        return allMyReserve;
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteReservation = async(id, token) => {

    const config = requestConfig('DELETE', null, token);

    try {
        const response = await fetch(`${api}/reservations/${id}`, config);
        const delReserve = await response.json();

        console.log('Deleta minha reserva', delReserve)

        return delReserve;
        
    } catch (error) {
        console.log(error);
    }
}

const reserveService = {
    createReserve,
    getAllReserve,
    getAllReservation,
    deleteReservation
}

export default reserveService;