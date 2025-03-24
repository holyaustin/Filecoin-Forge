import {
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore as createStore
} from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './reducers/authReducer'
import { contractReducer } from './reducers/contractReducer'
import { uiReducer } from './reducers/uiReducer'

const reducers = combineReducers({
	auth: authReducer,
	contracts: contractReducer,
	ui: uiReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(thunk))
)
