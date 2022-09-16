import { createSlice } from '@reduxjs/toolkit';
import ApiService from '../services/ApiService';

export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
	},

	reducers: {
		getAllUsers: (state, action) => {
			ApiService.getRecords('users').then(function (users) {
				state.users.push(users.data.data);
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const { getAllUsers } = usersSlice.actions;

export default usersSlice.reducer;
