import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';
import LoginGate from './components/LoginGate';
import Notfoundpage from './page/Notfoundpage';

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
			<Route path='*' element={<Notfoundpage />} />
		</Routes>
	);
}

export default App;
