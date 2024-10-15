export const api = 'http://localhost:5000/api';
export const uploads = 'http://localhost:5000/uploads'

export const requestConfig = (method, data, token = null, image = null) => {
    
    let config;

    if(image){
        config = {
            method,
            body: data,
            headers: {}
        }
    }else if(method === 'DELETE' || data === null){
        config = {
            method,
            headers: {}
        }
    }else{
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}` 
    }

    return config;
}

// export const requestConfig = (method, data = null, token = null, image = null) => {
//     let config = {
//         method,
//         headers: {}
//     };
    

//     // Configuração para upload de imagens
//     if (image) {
//         config.body = data;
//         config.headers = {}; // Headers específicos para upload podem ser configurados aqui
//     } else if (method === 'POST' || method === 'PUT') {
//         // Adiciona o corpo apenas para POST e PUT
//         config.body = JSON.stringify(data);
//         config.headers["Content-Type"] = "application/json";
//     } else if (method === 'GET' || method === 'DELETE') {
//         // Não adiciona corpo para GET e DELETE
//         config.body = undefined; // Garantir que o corpo não seja adicionado
//     }

//     // Adiciona o token de autenticação se fornecido
//     if(token){
//         config.headers.Authorization = `Bearer ${token}` 
//     }

//     return config;
// }
