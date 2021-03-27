import apiBase from './apiBase';

const getFunction = (url) => {
    return apiBase.get(url)
        .then((response) => {
            return response
        }).catch((error) => {
            return error
        })
}

const postFunction = (data, url) => {
    return apiBase.post(url, data)
        .then((response) => {
            return response
        }).catch((error) => {
            return error
        })
}

const putFunction = (data, url) => {
    return apiBase.put(url, data)
        .then((response) => {
            return response
        }).catch((error) => {
            return error
        })
}

const apiFunctions = {
    getFunction,
    postFunction,
    putFunction
}

export default apiFunctions
