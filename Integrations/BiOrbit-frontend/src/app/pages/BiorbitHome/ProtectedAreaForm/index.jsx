import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import './ProtectedAreaForm.scss'

export function ProtectedAreaForm(props) {
	const { user, contracts, dispatch, onError, createItem } = props
	const [isValid, setIsValid] = useState(false)
	const [coordinates, setCoordinates] = useState('')
	const [text, setText] = useState('')
	const [show, setShow] = useState(false)
	const protectedAreaName = useRef('')
	const protectedAreaPhoto = useRef(null)
	const protectedAreaDescription = useRef('')
	const protectedAreaCoordinates = useRef('')
	const protectedAreaCountry = useRef('')

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const handleSubmit = async event => {
		event.preventDefault()
		const info = {
			_name: protectedAreaName.current.value,
			_photo: protectedAreaPhoto.current.files[0],
			_description: protectedAreaDescription.current.value,
			_coordinates: protectedAreaCoordinates.current.value,
			_country: protectedAreaCountry.current.value
		}

		info._name = changeSpacetoUnderscoreAndLowerCase(info._name)
		info._photo = await convertToBase64(info._photo)
		const donation = await contracts.biorbitContract.donation()

		await createItem({
			...info
		})
		handleClose()

		try {
			try {
				const tx = await contracts.biorbitContract.monitorProtectedArea(
					info._name,
					info._coordinates,
					{ value: donation, gasLimit: 3000000 }
				)

				user.provider.waitForTransaction(tx.hash).then(async _response => {
					setTimeout(async () => {
						window.alert(
							'The protected area will begin to be monitored, come back tomorrow'
						)
					}, 3000)
				})
			} catch (error) {
				onError(error)
			}
		} catch (error) {
			onError(error)
		}
	}

	const handleTextChange = event => {
		const enteredText = event.target.value
		const wordCount = enteredText.trim().split(/\s+/).length
		if (wordCount <= 280) {
			setText(enteredText)
		}
	}

	const handleCoordinatesChange = event => {
		const enteredCoordinates = event.target.value
		const coordinatesWithoutSpaces = enteredCoordinates.replace(/\s+/g, '')

		setCoordinates(coordinatesWithoutSpaces)
	}

	useEffect(() => {
		if (
			protectedAreaName.current?.value !== '' &&
			protectedAreaPhoto.current?.value !== '' &&
			text.trim() !== '' &&
			coordinates !== ''
		) {
			setIsValid(true)
		} else {
			setIsValid(false)
		}
	}, [protectedAreaName, protectedAreaPhoto, text, coordinates])

	return (
		<>
			<Button
				variant='btn btn-secondary my-2'
				onClick={handleShow}
				disabled={user.address !== 'Connect wallet' ? false : true}
			>
				Monitor protected area
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Monitor Protected Area</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Protected area name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Yellowstone National Park'
								autoFocus
								ref={protectedAreaName}
							/>
						</Form.Group>
						<Form.Group controlId='formFileSm' className='mb-3'>
							<Form.Label>Upload protected area photo</Form.Label>
							<Form.Control
								type='file'
								size='sm'
								accept='image/*'
								ref={protectedAreaPhoto}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'
						>
							<Form.Label>Protected area description</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								value={text}
								onChange={handleTextChange}
								maxLength={280}
								ref={protectedAreaDescription}
							/>
							<Form.Text>{`${
								text.trim().split(/\s+/).length
							}/280 words`}</Form.Text>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Protected area coordinates</Form.Label>
							<Form.Control
								type='text'
								placeholder=''
								autoFocus
								value={coordinates}
								onChange={handleCoordinatesChange}
								ref={protectedAreaCoordinates}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Protected area country</Form.Label>
							<Form.Control
								type='text'
								placeholder='United State'
								autoFocus
								ref={protectedAreaCountry}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='primary' disabled={!isValid} onClick={handleSubmit}>
						Monitor protected area
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

function changeSpacetoUnderscoreAndLowerCase(string) {
	return string.trim().replace(/\s+/g, '_').toLowerCase()
}

function convertToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			resolve(reader.result.split(',')[1])
		}
		reader.onerror = error => reject(error)
	})
}
