import { createAction } from 'redux-act';
import * as status from './status';

export function createAjaxAction(actionName, requestOptions) {
	return {
		id: actionName,
		[status.REQUEST]: createAction(`${actionName} ${status.REQUEST}`,
			payload => payload,
			(payload, resolve = null, reject = null) => ({
				resolve,
				reject,
				requestOptions
			}),
		),
		[status.SUCCESS]: createAction(`${actionName} ${status.SUCCESS}`),
		[status.FAILURE]: createAction(`${actionName} ${status.FAILURE}`)
	};
}
