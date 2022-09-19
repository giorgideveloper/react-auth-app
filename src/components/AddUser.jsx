import React, { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { MdAddBox } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AddUser } from '../redux/Users';

function AddNewUser() {
	//Boostrap Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Name, Email, Pass, PassConfirmation Ref
	const userNameAdd = useRef('');
	const userEmailAdd = useRef('');
	const userPassAdd = useRef('');
	const userPassAddConf = useRef('');
	const dispatch = useDispatch();

	// Add new user function
	const addNewUser = (endpoint, data) => {
		dispatch(AddUser({ endpoint, data }));
		handleClose();
	};

	return (
		<>
			<div className='cursor-pointer'>
				<MdAddBox onClick={() => handleShow()} />
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='name'
								defaultValue={''}
								autoFocus
								ref={userNameAdd}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='name@example.com'
								defaultValue={''}
								autoFocus
								ref={userEmailAdd}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='Password'
								placeholder='*****'
								defaultValue={''}
								autoFocus
								ref={userPassAdd}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
							<Form.Label>Password Confirm</Form.Label>
							<Form.Control
								type='password'
								placeholder='*****'
								defaultValue={''}
								autoFocus
								ref={userPassAddConf}
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
							addNewUser('users', {
								name: userNameAdd.current.value,
								email: userEmailAdd.current.value,
								password: userPassAdd.current.value,
								password_confirmation: userPassAddConf.current.value,
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

export default AddNewUser;
