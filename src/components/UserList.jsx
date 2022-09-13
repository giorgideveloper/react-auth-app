import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

function UserList() {
	const [users, setUsers] = useState([]);

	const getAllUsers = () => {
		ApiService.getRecords('users').then(users => setUsers(users.data.data));
	};

	useEffect(() => {
		getAllUsers();
	}, []);
	console.log(users);

	return (
		<>
			{users?.map(item => (
				<ul
					key={item.id}
					style={{ margin: '2em' }}
					className='border-4 border-indigo-200 border-x-indigo-500 '
				>
					<li>{item.name}</li>
					<li>{item.email}</li>
				</ul>
			))}
		</>
	);
}

export default UserList;
