import React from 'react';
import toast from '../helper/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Auth';

function Content() {
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth.user);
	function logoutUser() {
		dispatch(logout());
		toast('success', `Goodbye ${auth.name}`);
	}
	console.log(auth.name);

	return (
		<>
			<div> Hello, {auth.name} !!!!!</div>
			<button
				type='submit'
				className='mx-1 mt-2 bg-purple-600 bg-opacity-60 block mx-auto py-1 px-10 rounded-xl text-white hover:bg-opacity-100 transition-all '
				onClick={() => logoutUser()}
			>
				logout
			</button>
		</>
	);
}

export default Content;
