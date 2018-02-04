import MainScreen from 'pages/Home';
import NotFoundScreen from 'pages/NotFound';
import Test from 'pages/Test';

const routes = [
	{
		path: '/',
		exact: true,
		component: MainScreen
	},
	{
		path: '/test',
		exact: true,
		component: Test
	},
	{
		exact: true,
		component: NotFoundScreen
	}
];

export default routes;
