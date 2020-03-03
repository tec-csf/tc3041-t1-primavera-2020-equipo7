import React from 'react';
import PropTypes from 'prop-types';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const EleccionesDetalles = (props) => {

	const getDetailsFromChild = data => {
		console.log('getting from son:', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		<p> Mostrando aquí los detalles de las elecciones </p>
	</Mask>;
}

EleccionesDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.string.isRequired
}

export default EleccionesDetalles;