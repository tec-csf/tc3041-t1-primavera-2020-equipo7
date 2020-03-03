import React from 'react';
import PropTypes from 'prop-types';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const MesaDetalles = (props) => {

	const getDetailsFromChild = data => {
		console.log('getting from son:', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		<p> Mostrando aquí los detalles la mesa </p>
	</Mask>;
}

MesaDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.string.isRequired
}

export default MesaDetalles;