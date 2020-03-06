import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const EleccionesDetalles = (props) => {

	const [elecciones, setElecciones] = useState();

	const getDetailsFromChild = data => {
		console.log(typeof(data))
		if(typeof(data) === 'object'){
			const dataList = [];
			dataList.push(data);
			setElecciones(dataList);
		}else{
			setElecciones(data);
		}
		console.log('detailing:', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		{ elecciones && elecciones.map( (eleccion, i) => {
			return <div key={i}>
			{ (elecciones.length > 1 && i === 1) ? <Header size='huge'> Historial </Header> : null }
				<p> <b> id: </b> {eleccion.id} </p>
				<p> <b> descripción: </b> {eleccion.descripcion} </p>
				<p> <b> fecha de incio: </b> {eleccion.fecha_inicio} </p>
				<p> <b> fecha final: </b> {eleccion.fecha_final} </p>
				<p> <b> incio en sistema: </b> {eleccion.sys_inicio} </p>
				<p> <b> fin en sistema: </b> {eleccion.sys_final} </p>
				<p> <b> transación: </b> {eleccion.trans_id} </p>
				{ i > 0 ? <hr/> : <br/>}
			</div>
			})
		}
	</Mask>;
}

EleccionesDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default EleccionesDetalles;