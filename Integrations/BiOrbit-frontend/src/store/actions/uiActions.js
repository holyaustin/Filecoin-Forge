import { uiAction } from '../actionsTypes'

export const setLoading = payload => ({
	type: uiAction.SET_LOADING,
	payload
})
