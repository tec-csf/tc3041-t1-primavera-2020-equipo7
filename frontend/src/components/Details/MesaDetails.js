import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const MesaDetalles = (props) => {

	const [mesas, setMesa] = useState();
	const getDetailsFromChild = data => {
		setMesa(data)
		console.log('detailing', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		{ mesas && mesas.map( (colegio, i) => {
			return <div key={i}>
			{
				(mesas.length > 1 && i === 1) &&
				<React.Fragment> <hr/> <Header size='huge'> Historial </Header> </React.Fragment> 
			}
				<p> <b> id: </b> {colegio.id} </p>
				<p> <b> letra: </b> {colegio.letra} </p>
				<p> <b> elección pertenenciente: </b> {colegio.descripcion_eleccion} </p>
				<p> <b> id colegio: </b> {colegio.id_colegio} </p>
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

MesaDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

export default MesaDetalles;