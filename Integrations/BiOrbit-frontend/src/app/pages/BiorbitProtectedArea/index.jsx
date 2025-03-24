import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import './BiorbitProtectedArea.scss'
import { Collection } from './Collection'
import { NftCard } from './NftCard'

export function BiorbitProtectedArea() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth)
	const contracts = useSelector(state => state.contracts)
	const [nfts, setNfts] = useState([])
	const [collection, setCollection] = useState({ date: [], coverForest: [] })
	const [loading, setLoading] = useState(true)
	const [sincronized, setSincronized] = useState(false)
	const { slug } = useParams()
	const { state } = useLocation()
	const { protectedArea } = state || {}

	const onError = error => {
		console.log('❌ error: ', error)
		window.alert('There war an error, look the console')
		setLoading(false)
	}

	useEffect(() => {
		const fetch = async () => {
			try {
				console.log(
					await contracts.biorbitContract.getProtectedAreaByName(
						protectedArea._name
					)
				)
				const protectedAreaStats =
					await contracts.biorbitContract.getProtectedAreaByName(
						protectedArea._name
					)
				setCollection({
					date: protectedAreaStats[5],
					coverForest: protectedAreaStats[6]
				})

				setNfts(
					await contracts.biorbitContract.getSoldSatelliteImagesByProtectedArea(
						protectedArea._name
					)
				)
			} catch (error) {}

			setLoading(false)
			setSincronized(true)
		}

		fetch()
	}, [sincronized])

	if (user.address === 'Connect wallet') {
		return <Navigate to='/' />
	}

	return (
		<div className='container px-4 px-lg-5'>
			<div className='row gx-4 gx-lg-5 align-items-center my-5'>
				<div className='col-lg-7'>
					<img
						className='img-fluid rounded mb-4 mb-lg-0'
						src={MyImageComponent(protectedArea._photo)}
						alt='...'
					/>
				</div>
				<div className='col-lg-5'>
					<h1 className='font-weight-light'>
						{convertToTitleCase(protectedArea._name)}
					</h1>
					<p>{protectedArea._description}</p>
					<p className='font-weight-light'>{protectedArea._country}</p>
				</div>
			</div>
			<div className='card text-white bg-secondary my-5 py-4 text-center'>
				<div className='card-body'>
					<p className='text-white m-0'>
						This is an NFT asset generated based on the required forest
						monitoring request, its price is standard and means the
						computational power required to process it and bring it here,
						however the value that you decide to put on it is the contribution
						to this Public Good, thank you from the BIOrbit core team 🛰️
					</p>
				</div>
			</div>
			<div className='row gx-4 gx-lg-5'>
				{loading ? (
					<Spinner />
				) : nfts.length === 0 ? (
					'There are not NFTs 😢😢'
				) : (
					nfts.map((nft, index) => (
						<NftCard
							key={index}
							user={user}
							protectedArea={protectedArea}
							contracts={contracts}
							nft={nft}
							setLoading={setLoading}
							setSincronized={setSincronized}
							onError={onError}
						/>
					))
				)}
			</div>
			<Collection collection={collection} />
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

function MyImageComponent(photo) {
	return `data:image/png;base64,${photo}`
}
