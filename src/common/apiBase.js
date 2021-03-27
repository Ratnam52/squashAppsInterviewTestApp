import axios from 'axios'

const url = 'https://squash-apps-interview-test-api.herokuapp.com/api/';

const apiBase = axios.create({
    headers: {
        "Authorization": "",
        "x-api-key": "",
        "Accept": "appbaseURLlication/json",
        "Content-Type": "application/json"
    },
    baseURL: url
});

export default apiBase;