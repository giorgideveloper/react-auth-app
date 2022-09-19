import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FiEdit } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { editUser } from '../redux/Users';

function MyModal({ id, name, email }) {
	//Boostrap Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Name and Email Ref
	const userNameUpdate = useRef('');
	const userEmailUpdate = useRef('');
	const dispatch = useDispatch();

	// Edit user function
	const editUsers = (endpoint, id, data) => {
		dispatch(editUser({ endpoint, id, data }));
		handleClose();
	};

	return (
		<>
			<FiEdit
				onClick={() => {
					handleShow();
				}}
			/>
			<Modal show={show} onHide={handleClose}>
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
								defaultValue={name}
								autoFocus
								ref={userNameUpdate}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='name@example.com'
								defaultValue={email}
								autoFocus
								ref={userEmailUpdate}
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
							editUsers('users', id, {
								name: userNameUpdate.current.value,
								email: userEmailUpdate.current.value,
								device_name: window.navigator.userAgent,
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

export default MyModal;
