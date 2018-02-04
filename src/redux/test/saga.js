import { takeLatest, select, put, all } from 'redux-saga/effects';
import { REQUEST } from '../ajax/status';
import { handleLatestAjaxAction } from '../ajax/saga';

import { testRequestGetResultSelector } from './selectors';
import * as actions from './actions';

function * testRequestGet({ payload }) {
	const testRequestGetResultData = yield select(testRequestGetResultSelector);

	if (!testRequestGetResultData) {
		yield put(actions.testRequestGet[REQUEST]({ params: payload }));
	}
}

export default function * test() {
	yield all([
		handleLatestAjaxAction(actions.testRequestGet),
		handleLatestAjaxAction(actions.testRequestPost),
		takeLatest(actions.testRequestGetIsNeeded.getType(), testRequestGet)
	]);
}
