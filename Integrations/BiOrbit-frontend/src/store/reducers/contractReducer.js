import { contractAction } from '../actionsTypes'
import biorbitJson from '../../assets/json/contracts/Biorbit.json'
import { ethers } from 'ethers'

const initialState = {
	biorbitContract: null
}

export const contractReducer = (state = initialState, action) => {
	switch (action.type) {
		case contractAction.MAKE_CONTRACTS:
			const signer = action.payload
			const biorbitContract = generateContract(
				biorbitJson.address,
				biorbitJson.abi,
				signer
			)

			return {
				biorbitContract
			}

		case contractAction.DESTROY_CONTRACT:
			return {
				biorbitContract: null
			}

		default:
			return state
	}
}

function generateContract(address, abi, providerOrSigner) {
	const contract = new ethers.Contract(address, abi, providerOrSigner)
	return contract
}
