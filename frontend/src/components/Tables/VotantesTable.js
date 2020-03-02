import React from 'react';
import { Table }  from 'semantic-ui-react';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/EleccionesDetails';
import Edit from './../Forms/EleccionesForms';

/**
 * Es la tabla que se usa para el index de los votantes
*/
const EleccionesTabla = () => <Table celled padded>
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>IFE</Table.HeaderCell>
			<Table.HeaderCell>Nombre</Table.HeaderCell>
			<Table.HeaderCell>Mesa</Table.HeaderCell>
			<Table.HeaderCell>Tipo</Table.HeaderCell>
			<Table.HeaderCell>######</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell>BLABLABLA</Table.Cell>
			<Table.Cell>José Juan Rosales</Table.Cell>
			<Table.Cell>A</Table.Cell>
			<Table.Cell>Mexican</Table.Cell>
			<RudButton
				id='1'
				onDelete='Elecciones de Junio 2018'
				title='José Juan'
				onShow={Details}
				onEdit={Edit}
			/>
		</Table.Row>
	</Table.Body>
</Table>;

export default EleccionesTabla;