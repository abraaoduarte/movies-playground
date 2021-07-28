import axios from 'axios';

const client = axios.create({
	baseURL: process.env.API,
});

export default client;
