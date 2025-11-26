import axios from 'axios';

// API URL - Render backend
const instance = axios.create({
    baseURL: 'https://mayno.onrender.com'
});

export default instance;