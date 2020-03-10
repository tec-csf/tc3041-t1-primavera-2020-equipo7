import React from 'react';
import PropTypes from 'prop-types';

import Overlaps from './searchs/Overlaps';
import Contains from './searchs/Contains';
import Exclude from './searchs/Exclude';


const Periods = props => {
	return <React.Fragment>
		<Overlaps newInfo={props.newInfo}/>
		<Contains newInfo={props.newInfo}/>
		<Exclude newInfo={props.newInfo}/>
	</React.Fragment>
}

Periods.propTypes = {
	/** search after  */
	newInfo: PropTypes.func.isRequired
}

export default Periods;