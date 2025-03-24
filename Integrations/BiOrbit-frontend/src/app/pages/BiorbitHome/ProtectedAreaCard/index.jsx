import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProtectedAreaCard.scss'

export function ProtectedAreaCard(props) {
	const { key, protectedArea, user, contracts, dispatch, onError } = props
	const navigate = useNavigate()

	const goDetails = () => {
		return navigate(`/${protectedArea._name}`, { state: { protectedArea } })
	}

	return (
		<div className='col'>
			<div className='card shadow-sm'>
				<img
					className='my-image bd-placeholder-img card-img-top'
					src={MyImageComponent(protectedArea._photo)}
					alt='photo'
				/>
				<div className='card-body'>
					<strong>
						<p className='card-title'>
							{convertToTitleCase(protectedArea._name)}
						</p>
					</strong>
					<p className='card-text'>
						{shortenString(protectedArea._description)}
					</p>
					<div className='d-flex justify-content-between align-items-center'>
						<div className='btn-group'>
							<button
								type='button'
								className='btn btn-sm btn-outline-secondary'
								disabled={user.address !== 'Connect wallet' ? false : true}
								onClick={goDetails}
							>
								View
							</button>
						</div>
						<small className='text-muted'>{protectedArea._country}</small>
					</div>
				</div>
			</div>
		</div>
	)
}

function convertToTitleCase(str) {
	return str
		.toLowerCase()
		.split('_')
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(' ')
}

function shortenString(str) {
	if (!str) {
		return ''
	}

	if (str.length <= 200) {
		return str
	}

	const shortenedStr = str.substring(0, 96) + '...'
	return shortenedStr
}

function MyImageComponent(photo) {
	return `data:image/png;base64,${photo}`
}
