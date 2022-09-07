import { createSlice } from '@reduxjs/toolkit';
import ApiService from '../services/ApiService';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
	},
	reducers: {
		login: data => {
			console.log(data);
			ApiService.login(data);
		},
		logout: () => {
			ApiService.logout();
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
