import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	);
}

export default App;
