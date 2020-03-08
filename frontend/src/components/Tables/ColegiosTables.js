import React from 'react';
import { Table }  from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/ColegiosDetails';
import Edit from './../Forms/ColegiosForm';

/**
 * Es la tabla que se usa para el index de de los colegios
*/
const ColegiosTabla = props => <Table celled padded>
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>Colegio</Table.HeaderCell>
			<Table.HeaderCell>Dirección</Table.HeaderCell>
			<Table.HeaderCell>Eleccion</Table.HeaderCell>
			<Table.HeaderCell>Fecha inicio</Table.HeaderCell>
			<Table.HeaderCell>Fecha fin</Table.HeaderCell>
			<Table.HeaderCell>######</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
	<Table.Body>
			{ props.info.map( item => {
				return <Table.Row key={item.id}>
					<Table.Cell>{item.id}</Table.Cell>
					<Table.Cell>{item.direccion}</Table.Cell>
					<Table.Cell>{item.descripcion_eleccion}</Table.Cell>
					<Table.Cell>{item.fecha_inicio.replace('00:00:00 GMT', '')}</Table.Cell>
					<Table.Cell>{item.fecha_final.replace('00:00:00 GMT', '')}</Table.Cell>
					<RudButton
						id={item.id}
						refresh={props.loadInfo}
						onDelete={'Colegio ' + item.id}
						title={'Colegio ' + item.id}
						onShow={Details}
						onEdit={Edit}
					/>
				</Table.Row>
			} ) }
	</Table.Body>
</Table>;

ColegiosTabla.propTypes = {
	/** To show info */
	info: PropTypes.array.isRequired,
	/** To load info when updating or deleting */
	loadInfo: PropTypes.func.isRequired
}

export default ColegiosTabla;