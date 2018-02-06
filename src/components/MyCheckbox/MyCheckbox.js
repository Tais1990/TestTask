import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

class MyCheckbox extends React.Component {
	static propTypes = {
		Checked: PropTypes.bool,
		Info: PropTypes.string,
		TextID: PropTypes.string,
		Color: PropTypes.string
	}
	static defaultProps = {
		Checked: false,
		Info: 'green',
		Color: 'black'
	}
	constructor(props) {
		super(props);
		this.state = {
			Checked: props.Checked,
			Info: props.Info,
			Color: props.Color
		};
	}
	changeTest() {
		console.log('checked = ' + !this.state.Checked);
		let element = document.getElementById(this.props.TextID);
		let oldColor = this.state.Color;
		let newColor = this.state.Checked ? 'black' : 'green';
		element.style.color = newColor;
		this.setState({Checked: !this.state.Checked, Info: oldColor, Color: newColor});
	}

	render() {
		return (
			<div><Checkbox onChange={this.changeTest.bind(this)}>color to {this.state.Info}</Checkbox></div>
		);
	}
}
export default MyCheckbox;
