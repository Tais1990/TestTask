import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	compose(
		(state = {}) => state,
		applyMiddleware(sagaMiddleware),
		// window && window.devToolsExtension ? window.devToolsExtension() : f => f,
	),
);

sagaMiddleware.run(rootSaga);

export default store;
