import { api, requestConfig } from '../utils/config';

export const createAssembleia = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {

        const response = await fetch(`${api}/assembleia`, config);
        const assembleia = await response.json();

        console.log('Retorna as data da assembleias', assembleia);

        return assembleia;
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllAssembly = async() => {

    const config = requestConfig('GET', null, null);

    try {

        const response = await fetch(`${api}/assembleia/all`, config);
        const allAssembly = await response.json();

        console.log('Retorna as datas das assembleias', allAssembly);

        return allAssembly;        
        
    } catch (error) {
        console.log(error);
    }
}

const assembleiaService = {
    createAssembleia,
    getAllAssembly
}


export default assembleiaService;