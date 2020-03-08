import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const ColegiosDetalles = (props) => {

	const [colegios, setColegio] = useState();
	const getDetailsFromChild = data => {
		setColegio(data);
		// console.log('detailing:', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		{ colegios && colegios.map( (colegio, i) => {
			return <div key={i}>
			{
				(colegios.length > 1 && i === 1) &&
				<React.Fragment> <hr/> <Header size='huge'> Historial </Header> </React.Fragment> 
			}
				<p> <b> id: </b> {colegio.id} </p>
				<p> <b> elección pertenenciente: </b> {colegio.descripcion_eleccion} </p>
				<p> <b> id de elección: </b> {colegio.id_eleccion} </p>
				<p> <b> direccion: </b> {colegio.direccion} </p>
				<p> <b> fecha de incio: </b> {colegio.fecha_inicio} </p>
				<p> <b> fecha final: </b> {colegio.fecha_final} </p>
				<p> <b> incio en sistema: </b> {colegio.sys_inicio} </p>
				<p> <b> fin en sistema: </b> {colegio.sys_final} </p>
				<p> <b> transación: </b> {colegio.trans_id} </p>
				{ i > 0 ? <hr/> : <br/>}
			</div>
			})
		}
	</Mask>;
}

ColegiosDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default ColegiosDetalles;