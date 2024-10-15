import { api, requestConfig } from '../utils/config';

export const createNotification = async(data, token) => {
   
  const config = requestConfig('POST', data, token);
  
    try {
      const response = await fetch(api + '/notifications', config);
      const notification = await response.json();
  
      console.log('Resposta do servidor ao criar notificação', notification);
  
      return notification;
  
    } catch (error) {
      console.log(error);
    }
}
  
export const getAllNotification = async(token) => {

    const config = requestConfig('GET', null, token);

    try {
      
      const response = await fetch(api + '/notifications/', config);
      const allNotification = await response.json();

      console.log('Retorna todas as notificações', allNotification);

      return allNotification;

    } catch (error) {
      console.log(error);
    }
}

const notificationService = {
    createNotification,
    getAllNotification
}

export default notificationService;