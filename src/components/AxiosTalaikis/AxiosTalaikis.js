import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './AxiosTalaikis.scss';

class AxiosTalaikis extends React.Component {
	static propTypes = {
		Name: PropTypes.string,
		Id: PropTypes.string,
		Value: PropTypes.string,
		Author: PropTypes.string
	}
	static defaultProps = {
		Name: 'default',
		Value: 'default',
		Author: 'default'
	}
	constructor(props) {
		super(props);
		this.state = {
			Value: props.Value,
			Author: props.Author
		};
	}
	request = () => {
		const tmp = this;
		axios.get('https://talaikis.com/api/quotes/random')
			.then(function(response) {
				tmp.setState({Value: response.data.quote, Author: response.data.author});
			})
			.catch(function(response) {
				console.log(response);
			});
	}

	render() {
		return (
			<div>
				<button onClick={this.request.bind(this)}>
					{this.props.Name}
				</button>
				<div>
					{this.state.Value}
				</div>
				<div className = 'author'>
					{this.state.Author}
				</div>
			</div>
		);
	}
}
export default AxiosTalaikis;
