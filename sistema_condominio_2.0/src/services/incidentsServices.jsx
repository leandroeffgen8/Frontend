import  { api, requestConfig } from '../utils/config';

//CRIA UMA NOTA DE INCIDENTE
export const createIncident = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {
        
        const response = await fetch(`${api}/incident/create`, config);
        const incident = await response.json();

        console.log('Retorna um incidente', incident);

        return incident;

    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

//RETORNA TODAS AS NOTAS DE INCIDENTES
export const getllIncidents = async() => {
    
    const config = requestConfig('GET', null, null);

    try {

        const response = await fetch(api + '/incident/all', config);
        const allIncidents = await response.json();

        console.log('Retorna todos os incidentes', allIncidents);

        return allIncidents;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//ATUALIZA STATUS DO INCIDENTE
export const updateIncidentStatus = async(id, status, token) => {

    const config = requestConfig('PUT', {status}, token);

    try {

        const response = await fetch(`${api}/incident/${id}`, config);
        const updateInicident = await response.json();

        console.log('Atualiza o inicident', updateInicident)

        return updateInicident;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

//RETORNA TODAS AS NOTAS DE INCIDENTE DO USUÁRIO
export const getMyIncidents = async(token) => {

    const config = requestConfig('GET', null, token);

    try {

        const response = await fetch(`${api}/incident/my-incidents`, config)
        const getMyincidents = await response.json();

        console.log('Retorna todos os meus chamados', getMyincidents)

        return getMyincidents;

    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//DELETA UMA NOTA DE INCIDENTE
export const deleteIncidents = async(id, status, token) => {

    const config = requestConfig('DELETE', {status}, token);

    try {

        const response = await fetch(`${api}/incident/${id}`, config);
        const delIncidents = await response.json();

        console.log('Delete os incidentes', delIncidents);

        return delIncidents;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

const incidentService = {
    createIncident,
    getllIncidents,
    updateIncidentStatus,
    getMyIncidents,
    deleteIncidents
}

export default incidentService;