import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiService from '../services/ApiService';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: sessionStorage.getItem('user')
			? JSON.parse(sessionStorage.getItem('user'))
			: null,
		status: 'idle',
		error: null,
	},

	extraReducers(builder) {
		builder
			.addCase(logout.pending, (state, action) => {
				state.status = 'pending';
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.status = 'fulfilled';
				sessionStorage.clear();
				ApiService.clearHeaders();
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.error.message;
			});
		builder
			.addCase(login.pending, (state, action) => {
				state.status = 'pending';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'fulfilled';
				state.user = action.payload;
				sessionStorage.setItem('token', action.payload['token']);
				ApiService.setHeaders(action.payload['token']);
				sessionStorage.setItem('user', JSON.stringify(action.payload['user']));
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.error.message;
			});
	},
});

// Action creators are generated for each case reducer function
export const logout = createAsyncThunk('auth/logout', async () => {
	const response = await ApiService.logout();
	return response.data;
});

export const login = createAsyncThunk('auth/login', async data => {
	const response = await ApiService.login(data);
	return response.data;
});

export default authSlice.reducer;
