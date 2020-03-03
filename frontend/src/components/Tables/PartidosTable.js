import React from 'react';
import { Table }  from 'semantic-ui-react';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/PartidosDetails';
import Edit from './../Forms/PartidosForm';

/**
 * Es la tabla que se usa para el index de de las elecciones
*/
const EleccionesTabla = () => <Table celled padded>
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>Siglas</Table.HeaderCell>
			<Table.HeaderCell>Nombre</Table.HeaderCell>
			<Table.HeaderCell>Presidente</Table.HeaderCell>
			<Table.HeaderCell>Fecha Inicio</Table.HeaderCell>
			<Table.HeaderCell>Fecha Fin</Table.HeaderCell>
			<Table.HeaderCell>######</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell>PTM</Table.Cell>
			<Table.Cell>Partido del Trabajo Municipal</Table.Cell>
			<Table.Cell>Marco Marquéz</Table.Cell>
			<Table.Cell>16-06-2018</Table.Cell>
			<Table.Cell>16-07-2018</Table.Cell>
			<RudButton
				id='1'
				onDelete='Partido del Trabajo Municipal'
				title='PTM'
				onShow={Details}
				onEdit={Edit}
			/>
		</Table.Row>
	</Table.Body>
</Table>;

export default EleccionesTabla;