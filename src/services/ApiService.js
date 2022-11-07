import axios from 'axios';

const api = axios.create({
	baseURL: 'https://frenchschool.jrwebdeveloper.com/api/v1',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default {
	login(data) {
		return api.post('/login', data);
	},
	logout() {
		return api.post('/logout');
	},
	getRecords(endpoint) {
		//
		return api.get(`/${endpoint}`);
	},
	addRecord(endpoint, data) {
		return api.post(`/${endpoint}`, data);
	},
	editRecord(endpoint, id, data) {
		return api.put(`/${endpoint}/${id}`, data);
	},
	deleteUser(endpoint, id) {
		return api.delete(`/${endpoint}/${id}`);
	},
	setHeaders(token) {
		api.defaults.withCredentials = true;
		api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	},
	clearHeaders() {
		api.defaults.withCredentials = false;
		delete api.defaults.headers.common['Authorization'];
	},
};
