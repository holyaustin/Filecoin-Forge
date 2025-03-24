import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import './NftCard.scss'

export function NftCard(props) {
	const {
		key,
		user,
		protectedArea,
		contracts,
		nft,
		setLoading,
		setSincronized,
		onError
	} = props
	const [image, setImage] = useState('')
	const [detectionDate, setDetectionDate] = useState('')

	let bigNumber = ethers.BigNumber.from(nft[0])
	const id = parseInt(bigNumber.toString())

	const uri = nft[2]

	bigNumber = ethers.BigNumber.from(nft[3])
	const price = parseInt(bigNumber.toString(), 10)

	const onBuySatelliteImage = async () => {
		try {
			setLoading(true)
			const tx = await contracts.biorbitContract.buySatelliteImage(
				nft[0],
				protectedArea._name,
				{
					value: price,
					gasLimit: 3000000
				}
			)

			user.provider.waitForTransaction(tx.hash).then(async _response => {
				setTimeout(async () => {
					window.alert('NFT sold')
					setSincronized(false)
				}, 3000)
			})
		} catch (error) {
			onError(error)
		}
	}

	useEffect(() => {
		const fetch = async () => {
			const metadata = await fetchUrl(
				'https://ipfs.io/ipfs/bafkreih37glhaeymjunlpelnwdwcz5mkvqa57w3kywlif3yiwj4hc4bafe'
			)
			setDetectionDate(metadata.detectionDate)
			setImage(metadata.image)
		}
		fetch()
	}, [])

	return (
		<div className='col-md-4 mb-5'>
			<div className='card h-100'>
				<div className='card-body'>
					<h3 className='card-title'>{`ID: ${id} - ${detectionDate}`}</h3>
					<img
						className='my-image bd-placeholder-img card-img-top'
						src={image}
						alt='image'
					/>
				</div>
				<div className='card-footer'>
					<button
						className='btn btn-primary btn-sm'
						onClick={onBuySatelliteImage}
					>
						Buy
					</button>
				</div>
			</div>
		</div>
	)
}

async function fetchUrl(url) {
	try {
		const response = await fetch(url, { mode: 'cors' })
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const data = await response.json()
		const image =
			'https://ipfs.io/ipfs/bafkreie73v3fccwk5xw5r7x6qvoyfqtiuekihgt3zk3jvnz2rgzadsxz4a'
		const detectionDate = '2023-03-30'
		return { image, detectionDate }
	} catch (error) {
		console.log(error)
	}
}
