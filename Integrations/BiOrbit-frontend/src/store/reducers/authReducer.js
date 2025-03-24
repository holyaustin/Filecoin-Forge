import { authAction } from '../actionsTypes'

const initialState = {
	address:
		JSON.parse(window.localStorage.getItem('wallet')) || 'Connect wallet',
	provider: null,
	signer: null,
	chainId: 0
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authAction.LOGIN:
			const { address, provider, signer, chainId } = action.payload

			return { address, provider, signer, chainId }

		case authAction.LOGOUT:
			return initialState
		default:
			return state
	}
}
