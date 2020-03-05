import React from 'react';
import { Table }  from 'semantic-ui-react';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/ColegiosDetails';
import Edit from './../Forms/ColegiosForm';

/**
 * Es la tabla que se usa para el index de de los colegios
*/
const ColegiosTabla = () => <Table celled padded>
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>Colegio</Table.HeaderCell>
			<Table.HeaderCell>Eleccion</Table.HeaderCell>
			<Table.HeaderCell>Fecha inicio</Table.HeaderCell>
			<Table.HeaderCell>Fecha fin</Table.HeaderCell>
			<Table.HeaderCell>######</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell>1</Table.Cell>
			<Table.Cell>Junio 2018</Table.Cell>
			<Table.Cell>16-06-2018</Table.Cell>
			<Table.Cell>16-07-2018</Table.Cell>
			<RudButton
				id='1'
				onDelete='Colegios 1'
				title='Colegios 1'
				onShow={Details}
				onEdit={Edit}
			/>
		</Table.Row>
	</Table.Body>
</Table>;

export default ColegiosTabla;