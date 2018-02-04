import { all } from 'redux-saga/effects';
import test from './test/saga';

export function * rootSaga() {
	yield all([
		test()
	]);
}
