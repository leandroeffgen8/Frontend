import { api, requestConfig } from '../utils/config';


//CRIAR UMA AGENDA PARA A ASSENBLEIA
export const createAssembly = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {

        const response = await fetch(`${api}/assembly/create`, config);
        const assembleia = await response.json();

        console.log('Retorna as data da assembleias', assembleia);

        return assembleia;
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

//RETORNA TODAS AS DATAS DE ASSEMBLEIAS
export const getAllAssembly = async() => {

    const config = requestConfig('GET', null, null);

    try {

        const response = await fetch(`${api}/assembly/all`, config);
        const allAssembly = await response.json();

        console.log('Retorna as datas das assembleias', allAssembly);

        return allAssembly;        
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

const assemblyService = {
    createAssembly,
    getAllAssembly
}


export default assemblyService;