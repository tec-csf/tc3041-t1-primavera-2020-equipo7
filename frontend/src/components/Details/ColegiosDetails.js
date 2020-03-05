import React from 'react';
import PropTypes from 'prop-types';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const ColegiosDetalles = (props) => {

	const getDetailsFromChild = data => {
		console.log('get from son:', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		<p> Mostrando aqui los detalles de un colegio </p>
	</Mask>;
}

ColegiosDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.string.isRequired
}

export default ColegiosDetalles;