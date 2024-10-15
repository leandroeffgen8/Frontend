import { api, requestConfig } from '../utils/config';

export const createMaintenance = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {

        const response = await fetch(`${api}/maintenance`, config);
        const maintenance = await response.json();

        console.log('dadsadsad', response)

        console.log('Retorna as maintenance', maintenance);

        return maintenance;
        
    } catch (error) {
        console.log(error);
    }

}

export const getAllMaintenance = async(data, token) => {

    const config = requestConfig('GET', data, token);

    try {

        const response = await fetch(`${api}/maintenance/all`, config);
        const allMaintenance = await response.json();

        console.log('Retorna todas as manutenções', allMaintenance);

        return allMaintenance;
        
    } catch (error) {
        console.log(error);
    }
}

export const updateMaintenance = async(id, status, token) => {

    const config = requestConfig('PUT', {status}, token);

    try {

        const response = await fetch(`${api}/maintenance/${id}/status`, config);
        const updateMaintenance = await response.json();

        console.log('Retorna todas as manutenções', updateMaintenance);
        
        return updateMaintenance;

    } catch (error) {
        console.log(error);
    }

}

const maintenanceService = {
    createMaintenance,
    getAllMaintenance,
    updateMaintenance
}

export default maintenanceService;