import React from 'react';
import PropTypes from 'prop-types';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const VotosDetalles = (props) => {

	const getDetailsFromChild = data => {
		console.log('obteniendo del son', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		<p> Mostrando aqui los detalles de un votante </p>
	</Mask>;
}

VotosDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.string.isRequired
}

export default VotosDetalles;