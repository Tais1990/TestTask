import React from 'react';
import { Helmet } from 'react-helmet';
import Test from './Test';

export default () => ([
	<Helmet key="TestPageHelmet">
		<title>Test page</title>
	</Helmet>,
	<Test key="TestPageComponent"/>
]);
