import { api, requestConfig } from '../utils/config';

// CRIA UMA ENQUETE
export const createPoll = async(data, token) => {

    const config = requestConfig('POST', data, token);

    try {

        const response = await fetch(`${api}/poll/create`, config);
        const poll = await response.json();

        console.log('Retorna uma enquete', poll);

        return poll
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

// RETORNA TODAS AS ENQUENTE
export const getPolls = async (token) => {
    const config = requestConfig('GET', null, token);
    
    try {
        const response = await fetch(`${api}/poll/all`, config);
        const polls = await response.json();
        
        console.log('Retorna todas as enquentes', polls)

        return polls;

    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

};

// VOTE EM UMA ENQUETE
export const votePoll = async(id, optionID, token) => {

    const config = requestConfig('POST', {optionID}, token);

    try {

        const response = await fetch(`${api}/poll/${id}/vote`, config);
        const poll = await response.json();

        console.log('Retorna os votos da enquente', poll);

        return poll
        
    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }

}

// RESULTADO DA ENQUETE
export const getResultsPoll = async (id, token) => {
    const config = requestConfig('GET', null, token);

    try {
        const response = await fetch(`${api}/poll/${id}`, config);
        const pollResults = await response.json();

        console.log('Retorna o resultado da enquente', pollResults)

        return pollResults;

    } catch (error) {
        console.log(error);
        return { errors: [error.message] };
    }
}

const pollService = {
    createPoll,
    getPolls,
    votePoll,
    getResultsPoll
}

export default pollService;