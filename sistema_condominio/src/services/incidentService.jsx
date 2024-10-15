import { api, requestConfig } from '../utils/config';

export const registerIncident = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {
        
        const response = await fetch(api + '/incidents', config);
        const register = await response.json();

        console.log('Registrando um inicidente', register);

        return register;

    } catch (error) {
        console.log(error);
    }
}

export const getMyIncidents = async(token) => {

    const config = requestConfig('GET', null, token);

    try {

        const response = await fetch(api + '/incidents/my-incidents', config)
        const getMyincidents = await response.json();

        console.log('Retorna todos os meus chamados', getMyincidents)

        return getMyincidents;

    } catch (error) {
        console.log(error);
    }
}

export const geAllIncidents = async() => {
    
    const config = requestConfig('GET', null, null);

    try {

        const response = await fetch(api + '/incidents', config);
        const allIncidents = await response.json();

        console.log('Retorna todos os incidentes', allIncidents);

        return allIncidents;
        
    } catch (error) {
        console.log(error);
    }

}

export const updateIncidentStatus = async(id, status, token) => {

    const config = requestConfig('PUT', {status}, token);

    try {

        const response = await fetch(`${api}/incidents/${id}`, config);
        const updateInicident = await response.json();

        console.log('Atualiza o inicident', updateInicident)
      

        return updateInicident;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

export const deleteIncidents = async(id, status, token) => {

    const config = requestConfig('DELETE', {status}, token);

    console.log('ID:', id); // Verifica o ID
    console.log('STATUS:', status); // Verifica o status

    try {

        const response = await fetch(`${api}/incidents/${id}`, config);
        const delIncidents = await response.json();

        console.log('Delete os incidentes', delIncidents);

        return delIncidents;
        
    } catch (error) {
        console.log(error)
    }

}

const incidentService = {
    registerIncident,
    getMyIncidents,
    geAllIncidents,
    updateIncidentStatus,
    deleteIncidents
}

export default incidentService;