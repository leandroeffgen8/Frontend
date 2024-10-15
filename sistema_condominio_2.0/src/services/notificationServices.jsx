import { api, requestConfig } from '../utils/config';

//CRIA UMA NOTIFICAÇÃO
export const createNotification = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {

        const response = await fetch(`${api}/notification/create`, config);
        const notification = await response.json();

        console.log('Retorna as notificações', notification);

        return notification
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

//RETORNA TODAS AS NOTIFICAÇÕES
export const getAllNotification = async(token) => {

    const config = requestConfig('GET', null, token);

    try {

        const response = await fetch(`${api}/notification/all`, config);
        const allNotification = await response.json();

        console.log('Retorna todas as notificações', allNotification);

        return allNotification;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//ATUALIZA NOTIFICAÇÃO
export const updateNotification = async(id, data, token) => {

    const config = requestConfig('PUT', data, token);

    try {

        const response = await fetch(`${api}/notification/${id}`, config);
        const updateInicident = await response.json();

        console.log('Atualiza notificação', updateInicident)

        return updateInicident;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

//DELETA NOTIFICAÇÂO
export const deleteNotification = async(id, token) => {

    const config = requestConfig('DELETE', null, token);

    try {

        const response = await fetch(`${api}/notification/${id}`, config);
        const delNotification = await response.json();

        console.log('Delete notificação', delNotification);

        return delNotification
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

const notificationService = {
    createNotification,
    getAllNotification,
    updateNotification,
    deleteNotification
}

export default notificationService;