import { contractAction } from '../actionsTypes'

export const makeContracts = payload => ({
	type: contractAction.MAKE_CONTRACTS,
	payload
})

export const destroyContracts = payload => ({
	type: contractAction.DESTROY_CONTRACT,
	payload
})
