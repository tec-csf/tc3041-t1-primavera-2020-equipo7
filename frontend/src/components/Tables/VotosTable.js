import React from 'react';
import { Table, Icon }  from 'semantic-ui-react';
// own
import RudButton from './_shared/RUD_Button';
import Details from './../Details/VotosDetails';

/**
 * Es la tabla que se usa para el index de de los votos municipales y federales
*/
const EleccionesTabla = () => <Table celled padded>
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>Mesa</Table.HeaderCell>
			<Table.HeaderCell>Partido</Table.HeaderCell>
			<Table.HeaderCell>Tipo Voto</Table.HeaderCell>
			<Table.HeaderCell>Hora</Table.HeaderCell>
			<Table.HeaderCell>######</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row textAlign='center'>
			<Table.Cell>A</Table.Cell>
			<Table.Cell>Partidosvki</Table.Cell>
			<Table.Cell> <Icon name='check circle'/> ok </Table.Cell>
			<Table.Cell>16-07-2018 15:14:09:1356</Table.Cell>
			<RudButton
				id='1'
				title='ok'
				onShow={Details}
			/>
		</Table.Row>
	</Table.Body>
</Table>;

export default EleccionesTabla;