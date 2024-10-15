import { api, requestConfig } from '../utils/config';

export const createVisitors = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {
        
        const response = await fetch(api + '/visitors', config);
        const create = await response.json();

        console.log('Criando um chamado para visitas: ', create);

        return create;

    } catch (error) {
        console.log(error)
    }

}

export const getMyVisitors = async(data, token) => {

    const config = requestConfig('GET', null, token);

    try {

        const response = await fetch(api + '/visitors/myvisitors', config);
        const allMyVisitors = await response.json();

        console.log('Retorna todas as minhas visitas', allMyVisitors);

        return allMyVisitors;
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllVisitors = async(token) => {

    const config = requestConfig('GET', null, token);

    try {

        const response = await fetch(api + '/visitors/all/', config);
        const allVisitors = await response.json();

        console.log('Retorna todas as visitas ou prestadores de serviço', allVisitors);

        return allVisitors;
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteVisits = async(id, token) => {

    const config = requestConfig('DELETE', null, token);

    try {

        const response = await fetch(`${api}/visitors/myvisitors/${id}`, config)
        const delVisits = await response.json();

        console.log('Deleta um visitante', delVisits);

        return delVisits;
        
    } catch (error) {
        console.log(error);
    }

}

const visitorService = {
    createVisitors,
    getMyVisitors,
    getAllVisitors,
    deleteVisits
}

export default visitorService;