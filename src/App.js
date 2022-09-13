import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';
import LoginGate from './components/LoginGate';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<MainPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/login'
				element={
					<LoginGate>
						<LoginPage />
					</LoginGate>
				}
			/>
		</Routes>
	);
}

export default App;
