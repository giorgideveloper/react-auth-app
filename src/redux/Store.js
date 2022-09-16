import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth';
import usersReducer from './Users';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		users: usersReducer,
	},
});
