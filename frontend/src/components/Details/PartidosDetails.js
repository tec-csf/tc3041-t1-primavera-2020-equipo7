import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const PartidoDetalles = (props) => {

	const [partidos, setPartidos] = useState();

	const getDetailsFromChild = data => {
		setPartidos(data);
		console.log('detailing:', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		{ partidos && partidos.map( (partido, i) => {
			return <div key={i}>
			{
				(partidos.length > 1 && i === 1) &&
				<React.Fragment> <hr/> <Header size='huge'> Historial </Header> </React.Fragment> 
			}
				<p> <b> siglas: </b> {partido.siglas} </p>
				<p> <b> nombre: </b> {partido.nombre} </p>
				<p> <b> presidente: </b> {partido.presidente} </p>
				<p> <b> fecha inicio: </b> {partido.fecha_inicio} </p>
				<p> <b> fecha final: </b> {partido.fecha_final} </p>
				<p> <b> incio en sistema: </b> {partido.sys_inicio} </p>
				<p> <b> fin en sistema: </b> {partido.sys_final} </p>
				<p> <b> transación: </b> {partido.trans_id} </p>
				{ i > 0 ? <hr/> : <br/>}
			</div>
			})
		}
	</Mask>;
}

PartidoDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default PartidoDetalles;