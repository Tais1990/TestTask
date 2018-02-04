import React from 'react';
import { Helmet } from 'react-helmet';
import NotFound from './NotFound';

export default () => ([
	<Helmet key="NotFoundPageHelmet">
		<title>NotFound page</title>
	</Helmet>,
	<NotFound key="NotFoundPageComponent"/>
]);
