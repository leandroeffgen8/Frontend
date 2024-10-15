import { api, requestConfig } from '../utils/config';


//ADICIONA PLACA DO CARRO
export const createCar = async(data, token) => {
    
    const config = requestConfig('POST', data, token);

    try {

        const response = await fetch(`${api}/car/create`, config);
        const car = await response.json();

        console.log('Retorna o carro cadastrado', car);
        
        return car;

    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

//RETORNA TODAS OS CARROS CADASTRADOS DO USUÁRIO
export const getMyCars = async(token) => {

    const config = requestConfig('GET', null, token);

    try {
        const response = await fetch(`${api}/car/my-cars`, config);
        const myCars = await response.json();

        console.log('Retorna todos meus carros cadastrados', myCars);

        return myCars;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//ATUALIZAR DADOS DO CARRO
export const updateCar = async(id, data, token) => {

    const config = requestConfig('PUT', data, token);

    try {

        const response = await fetch(`${api}/car/${id}`, config);
        const car = await response.json();

        console.log('Atualiza carro', car)

        return car;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

//DELETAR CARRO
export const deleteCar = async(id, token) => {

    const config = requestConfig('DELETE', null, token);

    try {
        
        const response = await fetch(`${api}/car/${id}`, config);
        const delCar = await response.json();

        console.log('Deleta reserva', delCar);

        return delCar;

    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

const carService = {
    createCar,
    getMyCars,
    updateCar,
    deleteCar
}

export default carService;
