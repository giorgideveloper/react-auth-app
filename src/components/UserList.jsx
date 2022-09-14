import React, { useEffect, useState, useReducer, useRef } from 'react';
import ApiService from '../services/ApiService';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import toast from '../helper/Toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UserList() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [users, setUsers] = useState([]);
	const userNameUpdate = useRef('');
	const userEmailUpdate = useRef('');
	const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

	const getAllUsers = () => {
		ApiService.getRecords('users').then(users => setUsers(users.data.data));
	};

	useEffect(() => {
		getAllUsers();
	}, [reducerValue]);

	const editUsers = (endpoint, id, data) => {
		ApiService.editRecord(endpoint, id, data);
		console.log(userNameUpdate.current.value);
		handleClose();
		forceUpdate();
	};

	/* 	const deleteUsers = id => {
		ApiService.deleteUser(id);
		console.log(id);
		toast('success', 'Delete user successfully');
		forceUpdate();
	}; */
	const item = useRef({});
	console.log(item);
	const changeItem = obj => {
		item.current.value = obj;
		console.log(item.name);
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
								<span className='flex float-right text-xl mt-1 cursor-pointer'>
									<FiEdit
										onClick={() => {
											handleShow();
											changeItem(item);
										}}
									/>
									{/* 	<MdDeleteForever onClick={() => deleteUsers(item.id)} /> */}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Modal key={item.id} show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='name'
								autoFocus
								ref={userNameUpdate}
								defaultValue={item.name}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='name@example.com'
								autoFocus
								ref={userEmailUpdate}
								defaultValue={item.email}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={() =>
							editUsers('users', item.id, {
								name: userNameUpdate.current.value,
								email: userEmailUpdate.current.value,
							})
						}
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default UserList;
