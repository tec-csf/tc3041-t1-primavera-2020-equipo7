import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
//own
import Mask from '../../util/GetMethod';
//hoc
//context
//css

const VotantesDetalles = props => {

	const type = props.match.path.replace('/', '');

	const [votantes, setVotantes] = useState();

	const getDetailsFromChild = data => {
		setVotantes(data); 
		console.log('detailing:', data);
	}

	return <Mask callback={getDetailsFromChild} id={props.id}>
		{ votantes && votantes.map( (votante, i) => {
			return <div key={i}>
			{
				(votantes.length > 1 && i === 1) &&
				<React.Fragment> <hr/> <Header size='huge'> Historial </Header> </React.Fragment> 
			}
				<p> <b> IFE/Pasaporte: </b> {votante.id} </p>
				<p> <b> nombre: </b> {votante.nombre} </p>
				<p> <b> dirección: </b> {votante.direccion} </p>
				<p> <b> fecha de nacimiento: </b> {votante.fecha_nac} </p>
				{ type !== 'apoderados' && <React.Fragment>
				<p> <b> id mesa: </b> {votante.id_mesa} </p>
				<p> <b> letra mesa: </b> {votante.letra} </p>
				<p> <b> id colegio: </b> {votante.id_colegio} </p>
				<p> <b> id eleccion: </b> {votante.id_eleccion} </p>
				<p> <b> descripción eleccion: </b> {votante.descripcion} </p>
				<p> <b> fecha de inicio votante: </b> {votante.fecha_inicio} </p>
				<p> <b> fecha final votante: </b> {votante.fecha_final} </p>
				</React.Fragment>}
				{ type === 'apoderados' && <React.Fragment>
				<p> <b> fecha de incio: </b> {votante.fecha_inicio} </p>
				<p> <b> fecha final: </b> {votante.fecha_final} </p>
				<p> <b> orden: </b> {votante.orden} </p>
				<p> <b> siglas: </b> {votante.siglas} </p>
				</React.Fragment>}
				{ type === 'suplentes' && <React.Fragment>
				<p> <b> id superior </b> {votante.id_superior} </p>
				</React.Fragment> }
				{ type === 'votantes' && <React.Fragment>
				<p> <b> Nacionalidad: </b> {votante.tipo === 1 ? 'Mexicano' : 'Extranjero'} </p>
				</React.Fragment>}
				<p> <b> inicio en sistema: </b> {votante.sys_inicio} </p>
				<p> <b> fin en sistema: </b> {votante.sys_final} </p>
				<p> <b> transacción: </b> {votante.trans_id} </p>
				{ i > 0 ? <hr/> : <br/>}
			</div>
			})
		}
	</Mask>;
}

VotantesDetalles.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default withRouter(VotantesDetalles);