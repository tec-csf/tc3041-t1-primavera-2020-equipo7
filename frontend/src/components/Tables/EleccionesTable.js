import React from 'react';
import { Table }  from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/EleccionesDetails';
import Edit from './../Forms/EleccionesForms';

/**
 * Es la tabla que se usa para el index de de las elecciones
*/

const EleccionesTabla = props => {
	return <Table celled padded>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Campaña</Table.HeaderCell>
				<Table.HeaderCell>Tipo</Table.HeaderCell>
				<Table.HeaderCell>Fecha inicio</Table.HeaderCell>
				<Table.HeaderCell>Fecha fin</Table.HeaderCell>
				<Table.HeaderCell>######</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{ props.info.map( item => {
				return <Table.Row key={item.id}>
					<Table.Cell>{item.descripcion}</Table.Cell>
					<Table.Cell>{item.tipo}</Table.Cell>
					<Table.Cell>{item.fecha_inicio.replace('00:00:00 GMT', '')}</Table.Cell>
					<Table.Cell>{item.fecha_final.replace('00:00:00 GMT', '')}</Table.Cell>
					<RudButton
						id={item.id}
						refresh={props.loadInfo}
						onDelete={'Elecciones de ' + item.descripcion}
						title={item.descripcion}
						onShow={Details}
						onEdit={Edit}
					/>
				</Table.Row>
			} ) }
		</Table.Body>
	</Table>;
}

EleccionesTabla.propTypes = {
	/** To show info */
	info: PropTypes.array.isRequired,
	/** To load info when updating or deleting */
	loadInfo: PropTypes.func.isRequired
}

export default EleccionesTabla;