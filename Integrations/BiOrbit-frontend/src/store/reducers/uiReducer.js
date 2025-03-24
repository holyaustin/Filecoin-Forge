import { uiAction } from '../actionsTypes'
const initialState = {
	loading: false
}

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case uiAction.SET_LOADING:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
