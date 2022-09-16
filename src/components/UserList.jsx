import React, { useEffect, useState, useReducer, useRef } from 'react';
import ApiService from '../services/ApiService';
import { MdDeleteForever } from 'react-icons/md';
import toast from '../helper/Toast';
import MyModal from './MyModal';
import confirm from '../helper/Confirm';

function UserList() {
	const [users, setUsers] = useState([]);
	const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

	const getAllUsers = () => {
		ApiService.getRecords('users').then(users => setUsers(users.data.data));
	};

	useEffect(() => {
		getAllUsers();
	}, [reducerValue]);

	const deleteUsers = id => {
		confirm().then(result => {
			if (result.isConfirmed) {
				ApiService.deleteUser('users', id);
				toast('success', 'Delete user successfully');
				forceUpdate();
			}
		});
	};
	return (
		<>
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
								<span className='flex float-right text-xl mt-2 cursor-pointer'>
									<MyModal id={item.id} name={item.name} email={item.email} />
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
