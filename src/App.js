import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { login } from './redux/Auth';
import { useRef } from 'react';

function App() {
	const dispatch = useDispatch();
	const emailRef = useRef('');
	const passwordRef = useRef('');

	function loginUser() {
		dispatch(
			login({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				device_name: 'chrome',
			})
		);
	}

	return (
		<div className='flex flex-row justify-center text-center align-middle '>
			<div className='basis-1/3  p-4  bg-sky-500/75  '>
				<input type='email' placeholder='email' ref={emailRef} />
				<input type='password' placeholder='password' ref={passwordRef} />
				<button type='submit' onClick={() => loginUser()}>
					login
				</button>
			</div>
		</div>
	);
}

export default App;
