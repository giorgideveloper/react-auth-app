import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/Auth';
import { useRef } from 'react';
import toast from '../helper/Toast';

function Login() {
	const dispatch = useDispatch();
	const emailRef = useRef('');
	const passwordRef = useRef('');

	// Login user function
	function loginUser() {
		dispatch(
			login({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				device_name: window.navigator.userAgent,
			})
		);
		toast('success', 'Successfully authenticated. Redirecting...');
		setTimeout(() => (window.location = '/'), 1000);
	}

	return (
		<div className='flex flex-row  justify-center text-center align-middle '>
			<div className='basis-1/4  p-4  border border-purple-500 rounded-lg m-8 h-62  '>
				<div className=' flex flex-col '>
					<h1 className='text-lg text-weight-bold'>Welcome to React</h1>{' '}
					<input
						type='email'
						className='border border-purple-500 rounded-lg p-1 my-2  '
						placeholder='email'
						ref={emailRef}
					/>
					<input
						type='password'
						className='border border-purple-500 rounded-lg p-1 '
						placeholder='password'
						ref={passwordRef}
					/>
				</div>

				<div className=' flex justify-center'>
					<button
						className='mx-1 mt-2 bg-purple-600 bg-opacity-60 block mx-auto py-1 px-11 rounded-xl text-white hover:bg-opacity-100 transition-all '
						type='submit'
						onClick={() => loginUser()}
					>
						login
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
