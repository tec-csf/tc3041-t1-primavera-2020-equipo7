import React from 'react';
import { Table }  from 'semantic-ui-react';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/MesaDetails';
import Edit from './../Forms/MesasForms';

/**
 * Es la tabla que se usa para el index de de las mesas
*/
const EleccionesTabla = () => <Table celled padded>
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>Mesa</Table.HeaderCell>
			<Table.HeaderCell>Elección</Table.HeaderCell>
			<Table.HeaderCell>Fecha inicio</Table.HeaderCell>
			<Table.HeaderCell>Fecha fin</Table.HeaderCell>
			<Table.HeaderCell>######</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell>A</Table.Cell>
			<Table.Cell>Junio 2018</Table.Cell>
			<Table.Cell>16-06-2018</Table.Cell>
			<Table.Cell>16-07-2018</Table.Cell>
			<RudButton
				id='1'
				onDelete='Mesa A'
				title='Mesa A'
				onShow={Details}
				onEdit={Edit}
			/>
		</Table.Row>
	</Table.Body>
</Table>;

export default EleccionesTabla;