import React from 'react';
import { Loader, Dimmer, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
//own
//hoc
//context
//css

class GetMethod extends React.Component {

	state = { isLoading : true }

	componentDidMount() {

		axios.get(this.props.match.path + '/' + this.props.id)
		.then(res => {
			//console.log(typeof(res));
			//console.log('Details', this.props.match.path + '/' + this.props.id)
			this.setState({ isLoading: false });
			this.props.callback(res.data);
		})
		.catch(err => console.log('get' + this.props.match.path, err))

	}

	dismiss() {
		this.props.unmountMe();
	}

	render() {
		return this.state.isLoading ? <Dimmer active> <Loader /> </Dimmer> : <Container textAlign='center'> {this.props.children} </Container>;
	}
}

GetMethod.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/** callback to send info to the parent */
	callback: PropTypes.func.isRequired,
}

export default withRouter(GetMethod);