import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { testActionResultSelector } from '../../redux/test/selectors';
import { testAction } from '../../redux/test/actions';

import AsyncImage from 'components/AsyncImage';
import Icon from 'components/Icon';
import svgIcon1 from 'images/icons/sdf.svg';
import svgIcon2 from 'images/icons/testing.svg';
import testImage from 'images/static/test.jpg';

import { Checkbox } from 'antd';
import { createAction } from 'redux-act';
import { createReducer} from 'redux-act/lib';
import { createStore } from 'redux/lib';

import './Home.scss';

const mapStateToProps = createStructuredSelector({
	testActionResultSelector
});

const mapDispatchToProps = {
	testAction
};

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}


let testActionMyCheckbox = createAction((value) => ({value}));
const reducer = createReducer({
	  [testActionMyCheckbox]: (value) => {console.log('checked = ' + value.info + ' '+ value.state); return {state : !value.state, info : 'второе значение'}}
	});

let store = createStore(reducer, {state : true, info : 'начальное второе значение'});
testActionMyCheckbox.assignTo(store);

class MyCheckbox extends React.Component {
	static propTypes = {
     Checked: PropTypes.bool, 
     Info : PropTypes.string,  
     TextID : PropTypes.string, 
     Color : PropTypes.string,
  	}
  	static defaultProps = {
	   Checked: false,
	   Info: 'green',
	   Color: 'black',
	 }
	constructor(props) {
        super(props);
        this.state = {
            Checked: props.Checked,
            Info: props.Info,
            Color : props.Color,
        };
    } 	
  	
  	changeTest() {
  		console.log('checked = ' + !this.state.Checked);  	
  		let element = document.getElementById(this.props.TextID);
  		let oldColor = this.state.Color
  		let newColor = this.state.Checked ? 'black' : 'green'
  		element.style.color = newColor;	
  		this.setState({Checked : !this.state.Checked, Info: oldColor, Color : newColor})
  		
  	}
  	
	render() {
		return (
			<div><Checkbox onChange={this.changeTest.bind(this)}>color -> {this.state.Info}</Checkbox></div>
			);
	}
}

class Home extends React.Component {
	testEditStore = () => {
		const { testAction } = this.props;
		testAction('Edited store');
	};

	render() {
		const { testActionResultSelector } = this.props;

		return (
			<div>
				<h1 className="HomePage__title">Home page</h1>
				<div>Redux: {testActionResultSelector}</div>
				

				<div id = 'textChangeColor'>TEXT</div>
				<MyCheckbox TextID = 'textChangeColor'/>
				
				<button onClick={this.testEditStore}>
					Edit store
				</button>
				<Link to="/test">
					test
				</Link>
				<div>
					<AsyncImage
						src="https://www.w3schools.com/howto/img_fjords.jpg"
					/>
					<br />
					<AsyncImage
						src={testImage}
					/>
				</div>
				<div>
					<Icon
						className="HomePage__icon"
						src={svgIcon1}
					/><Icon
						className="HomePage__icon"
						src={svgIcon2}
					/>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	testAction: PropTypes.func,
	testActionResultSelector: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
