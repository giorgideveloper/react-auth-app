import axios from 'axios';

const api = axios.create({
	baseURL: 'https://frenchschool.jrwebdeveloper.com/api/v1',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
	editRecord(endpoint, id, data) {
		return api.put(`/${endpoint}/${id}`, data);
	},
	deleteUser(endpoint, id) {
		return api.delete(`/${endpoint}/${id}`);
	},
};
