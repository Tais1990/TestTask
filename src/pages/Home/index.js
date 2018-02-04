import React from 'react';
import { Helmet } from 'react-helmet';
import Home from './Home';

export default () => ([
	<Helmet key="HomePageHelmet">
		<title>Home page</title>
	</Helmet>,
	<Home key="HomePageComponent"/>
]);
