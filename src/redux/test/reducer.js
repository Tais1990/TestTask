import { createReducer } from 'redux-act';
import { SUCCESS } from '../ajax/status';
import * as actions from './actions';

const initialState = {
	testActionResult: 'test from store'
};

const testReducer = createReducer({
	[actions.testRequestGet[SUCCESS]]: (state, payload) => ({
		...state,
		testRequestGetResult: payload
	}),
	[actions.testRequestPost[SUCCESS]]: (state, payload) => ({
		...state,
		testRequestPostResult: payload
	}),
	[actions.testAction]: (state, payload) => ({
		...state,
		testActionResult: payload
	})
}, initialState);

export default testReducer;
