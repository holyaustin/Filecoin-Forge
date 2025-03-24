import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Wallet.scss'
import { login, logout } from '../../../../store/actions/authActions'
import {
	destroyContracts,
	makeContracts
} from '../../../../store/actions/contractActions'

export function Wallet() {
	const [loading, setLoading] = useState(false)
	const user = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const connectWallet = async () => {
		if (!window.ethereum?.isMetaMask) {
			window.alert(
				"Metamask wasn't detected, please install metamask extension"
			)
			return
		}

		if (user.address === 'Connect wallet') {
			setLoading(true)

			const provider = new ethers.providers.Web3Provider(window.ethereum)
			await provider.send('eth_requestAccounts', [])
			const accounts = await provider.send('eth_requestAccounts', [])
			const address = accounts[0]

			const signer = provider.getSigner()
			const chainId = await signer.getChainId()
			if (chainId !== 80001) {
				window.alert('Change your network to Mumbai testnet!')
				dispatch(logout())
				setLoading(false)
				navigate('/')
				return
			}
			dispatch(login({ address, provider, signer, chainId }))
			dispatch(makeContracts(signer))
			setLoading(false)
		} else {
			dispatch(destroyContracts())
			dispatch(logout())
			setLoading(false)
			navigate('/')
		}
	}

	return (
		<button className='wallet' onClick={connectWallet}>
			{loading
				? 'loading...'
				: user.address !== 'Connect wallet'
				? '...' + String(user.address).slice(36)
				: 'Connect wallet'}
		</button>
	)
}
