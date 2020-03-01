import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
//own
//hoc
//context
//css

class GetMethod extends React.Component {

	state = { isLoading : true }

	componentDidMount() {
		const data = { a : 4 }
		console.log('Details', this.props.match.path + '/' + this.props.id)
		this.setState({ isLoading: false });
		this.props.callback(data)
	}

	dismiss() {
		this.props.unmountMe();
	}

	render() {
		return this.state.isLoading ? <Dimmer active> <Loader /> </Dimmer> : this.props.children;
	}
}

GetMethod.propTypes = {
	/** id for get details */
	id: PropTypes.string.isRequired,
	/** callback to send info to the parent */
	callback: PropTypes.func.isRequired,
}

export default withRouter(GetMethod);