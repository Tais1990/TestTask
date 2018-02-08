import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { testActionResultSelector } from '../../redux/test/selectors';
import { testAction } from '../../redux/test/actions';

import MyCheckbox from 'components/MyCheckbox';
import AxiosTalaikis from 'components/AxiosTalaikis';

import './Home.scss';


const mapStateToProps = createStructuredSelector({
	testActionResultSelector
});

const mapDispatchToProps = {
	testAction
};
class Home extends React.Component {
	testEditStore = () => {
		const { testAction } = this.props;
		testAction('Edited store');
	};

	render() {
		return (
			<div>
				<h1 className="HomePage__title">Home page</h1>

				<div id = 'textChangeColor'>TEXT</div>
				<MyCheckbox TextID = 'textChangeColor'/>

				<AxiosTalaikis Name = 'Get Quote' Value = 'Default text' Author = ''/>
			</div>
		);
	}
}

Home.propTypes = {
	testAction: PropTypes.func,
	testActionResultSelector: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
