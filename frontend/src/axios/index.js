import axios from 'axios';

const instance = axios.create({
	baseURL: "http://localhost:5001/",
	//baseURL: 'http://10.49.89.73:5000/',
	withCredentials: false,
});

export default instance;