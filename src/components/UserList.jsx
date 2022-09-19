import React, { useEffect } from 'react';
import ApiService from '../services/ApiService';
import { MdDeleteForever } from 'react-icons/md';
import MyModal from './MyModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../redux/Users';
import confirm from '../helper/Confirm';
import AddNewUser from './AddUser';

function UserList() {
	// Store redux
	const dispatch = useDispatch();
	const storeUsers = useSelector(state => state.users.users);

	// Get All Users function
	async function getAllUsers() {
		const response = await ApiService.getRecords('users');
		dispatch(getUsers(response.data.data));
	}

	// Delete All Users function
	const deleteUsers = id => {
		confirm().then(result => {
			if (result.isConfirmed) {
				dispatch(deleteUser(id));
			}
		});
	};

	// UseEffect All Users function
	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<>
			<div className='flex justify-center text-2xl '>
				<span>Add user</span>
				<AddNewUser />
			</div>

			<table className=' flex justify-center w-full text-lg '>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
					{storeUsers?.map(item => (
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
