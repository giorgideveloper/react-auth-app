import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiService from '../services/ApiService';
import toast from '../helper/Toast';

export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
	},

	extraReducers(builder) {
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.users = state.users.concat(action.payload);
		});
	},
	reducers: {
		// Get all users
		// getUsers(state, action) {
		// 	state.users = action.payload;
		// },

		clearUsers(state, action) {
			state.users = [];
		},
		// Add user
		AddUser(state, action) {
			const lastUser = state.users.at(-1);

			ApiService.addRecord(action.payload.endpoint, action.payload.data);
			state.users = [
				...state.users,
				{
					id: lastUser.id + 1,
					name: action.payload.data.name,
					email: action.payload.data.email,
					password: action.payload.data.password,
				},
			];
			toast('success', 'Add user successfully');
		},
		// Edit user
		editUser(state, action) {
			ApiService.editRecord(
				action.payload.endpoint,
				action.payload.id,
				action.payload.data
			);

			const newArr = state.users.map(user => {
				if (user.id === action.payload.id) {
					return {
						...user,
						name: action.payload.data.name,
						email: action.payload.data.email,
					};
				}
				return user;
			});

			state.users = newArr;
			toast('success', 'Edit user successfully');
		},
		// Delete user
		deleteUser(state, action) {
			ApiService.deleteUser('users', action.payload);
			let newUsers = state.users.filter(user => user.id !== action.payload);
			state.users = newUsers;
			toast('success', 'Delete user successfully');
		},
	},
});
export const getUsers = createAsyncThunk('users/getUsers', async () => {
	const response = await ApiService.getRecords(usersSlice.name);
	return response.data.data;
});
// Action creators are generated for each case reducer function
export const { AddUser, editUser, deleteUser, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
