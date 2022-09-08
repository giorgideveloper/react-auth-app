import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/Auth';
import { useRef } from 'react';
import ApiService from '../services/ApiService';
import toast from '../helper/Toast';
import Content from '../components/Content';
import { Link } from 'react-router-dom';

function Login() {
	const dispatch = useDispatch();
	const emailRef = useRef('');
	const passwordRef = useRef('');

	function loginUser() {
		ApiService.login({
			email: emailRef.current.value,
			password: passwordRef.current.value,
			device_name: window.navigator.userAgent,
		})
			.then(res => {
				if (res.status === 200) {
					dispatch(login(res.data));
					toast('success', 'შესვლა');
					<Content />;
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
	function logoutUser() {
		ApiService.logout().then(res => {
			if (res.status === 200) {
				toast('success', 'გამოსვლა');
			}
		});
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
					<button
						type='submit'
						className='mx-1 mt-2 bg-purple-600 bg-opacity-60 block mx-auto py-1 px-10 rounded-xl text-white hover:bg-opacity-100 transition-all '
						onClick={() => logoutUser()}
					>
						logout
					</button>
				</div>
			</div>
			<Link to='/content'>content</Link>
		</div>
	);
}

export default Login;
