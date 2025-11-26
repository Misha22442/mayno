import axios from 'axios';

// API URL - Render для production, localhost для development
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://mayno.onrender.com'
        : 'http://localhost:5000'
});

export default instance;