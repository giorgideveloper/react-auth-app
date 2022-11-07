import React from 'react';
import toast from '../helper/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Auth';
import UserList from './UserList';

function Content() {
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth.user);

	// Logout user function
	function logoutUser() {
		dispatch(logout());
		toast('success', `Goodbye`);
	}

	return (
		<>
			<div className='flex justify-around'>
				<ul role='list' className='p-6 divide-y divide-slate-200'>
					<li className='flex py-4 first:pt-0 last:pb-0 '>
						<img
							className='h-10 w-10 rounded-full'
							src='https://ui-avatars.com/api/?background=random'
							alt='avatar'
						/>
						<div className='ml-3 overflow-hidden'>
							<p className='text-lg font-medium text-slate-900'>
								{' '}
								Welcome: <span className='font-bold'>{auth.name}</span>
							</p>
						</div>
						<div className='flex justify-end float-right right '>
							<button
								type='submit'
								className='mx-1 mt-2 bg-purple-600 bg-opacity-60 block mx-auto py-1 px-10 rounded-xl text-white hover:bg-opacity-100 transition-all text-right '
								onClick={() => logoutUser()}
							>
								logout
							</button>
						</div>
					</li>
				</ul>{' '}
			</div>
			<UserList />
		</>
	);
}

export default Content;
