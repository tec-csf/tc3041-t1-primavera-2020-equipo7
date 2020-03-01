import React from 'react';
import { Table }  from 'semantic-ui-react';
// own
import RudButton from '../_shared/RUD_Button';

import Details from '../../Details/EleccionesDetails';
import Edit from '../../Forms/EleccionesForms';

/**
 * Es la tabla que se usa para el index de de las elecciones
*/
const EleccionesTabla = () => <Table celled padded>
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
		<Table.Row>
			<Table.Cell>Junio 2018</Table.Cell>
			<Table.Cell>Federal</Table.Cell>
			<Table.Cell>16-06-2018</Table.Cell>
			<Table.Cell>16-07-2018</Table.Cell>
			<RudButton
				id='1'
				onDelete='Elecciones de Junio 2018'
				title='Junio 2018'
				onShow={Details}
				onEdit={Edit}
			/>
		</Table.Row>
	</Table.Body>
</Table>;

export default EleccionesTabla;