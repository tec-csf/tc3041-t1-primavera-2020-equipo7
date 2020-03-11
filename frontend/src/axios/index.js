import axios from 'axios';

const instance = axios.create({
	//baseURL: "http://10.49.68.108:5001/",
	//baseURL: "http://localhost:5000/",
	baseURL : "https://apieleccion.herokuapp.com/",
	//baseURL: 'http://10.49.88.43:5001/',
	withCredentials: false,
});

export default instance;