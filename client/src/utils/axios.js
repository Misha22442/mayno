import axios from 'axios';

// Зміни на посилання Vercel після деплою
const instance = axios.create({
    baseURL: 'http://localhost:5000' 
    // baseURL: 'https://tviy-server.vercel.app'
});

export default instance;