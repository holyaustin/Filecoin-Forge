import { authAction } from '../actionsTypes'

export const login = payload => ({
	type: authAction.LOGIN,
	payload
})

export const logout = payload => ({
	type: authAction.LOGOUT,
	payload
})
