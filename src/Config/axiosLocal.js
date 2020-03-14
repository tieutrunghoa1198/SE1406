import axios from 'axios';
import config from './config';

export default axios.create({
    baseURL: config.rootAPI,
    headers: {
        'Content-Type': 'application/json'
    }
})