import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import toast from '../helper/Toast';

function UserList() {
	const [users, setUsers] = useState([]);

	const getAllUsers = () => {
		ApiService.getRecords('users').then(users => setUsers(users.data.data));
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const editUsers = (id, str) => {
		ApiService.editUser(id, {});
	};

	const deleteUsers = id => {
		ApiService.deleteUser(id);
		console.log(id);
		toast('success', 'Delete user successfully');
		setTimeout(() => window.location.reload(), 2000);
	};

	return (
		<>
			{/* <ul role='list' className='p-6 divide-y divide-slate-200'>
				{users?.map(item => (
					<li key={item.id} className='flex py-4 first:pt-0 last:pb-0'>
						<img
							className='h-10 w-10 rounded-full'
							src='https://ui-avatars.com/api/?background=random'
							alt='avatar'
						/>
						<div className='ml-3 overflow-hidden'>
							<p className='text-sm font-medium text-slate-900'>
								{item.name}
								<MdDeleteForever className='inline float-right text-lg cursor-pointer' />
								<FiEdit className='inline float-right text-lg cursor-pointer' />
							</p>
							<p className='text-sm text-slate-500 truncate'>{item.email}</p>
						</div>
					</li>
				))}
			</ul> */}

			<table className=' flex justify-center w-full text-lg '>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
					{users?.map(item => (
						<tr key={item.id} className='odd:bg-white even:bg-slate-50 p-2'>
							<td>{item.name} </td>
							<td className='pl-5'>
								{item.email}{' '}
								<span className='flex float-right text-xl mt-1 cursor-pointer'>
									<FiEdit onClick={() => editUsers(item.id)} />
									<MdDeleteForever onClick={() => deleteUsers(item.id)} />
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default UserList;
