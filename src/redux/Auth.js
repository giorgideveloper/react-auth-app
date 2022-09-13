import { createSlice } from '@reduxjs/toolkit';
import ApiService from '../services/ApiService';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: sessionStorage.getItem('user')
			? JSON.parse(sessionStorage.getItem('user'))
			: null,
	},
	reducers: {
		login: (state, action) => {
			sessionStorage.setItem('token', action.payload['token']);
			sessionStorage.setItem('user', JSON.stringify(action.payload['user']));
		},
		logout: (state, action) => {
			sessionStorage.clear();
			state.user = null;
			ApiService.logout();
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
