import axios from 'axios';

export default axios.create({
    baseURL: 'https://sujina-maharjan.com.np/',
     withCredentials: true
});