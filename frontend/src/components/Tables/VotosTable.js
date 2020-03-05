import React from 'react';
import { Table }  from 'semantic-ui-react';

//own

/**
 * Es la tabla que se usa para el index de de los votos municipales y federales
*/
const EleccionesTabla = props => <Table celled padded>
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>Mesa</Table.HeaderCell>
			<Table.HeaderCell>Partido</Table.HeaderCell>
			<Table.HeaderCell>Tipo Voto</Table.HeaderCell>
			<Table.HeaderCell>Hora</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{ props.info.map( item => {
					return <Table.Row key={item.id} textAlign='center'>
						<Table.Cell>{item.mesa}</Table.Cell>
						<Table.Cell>{item.partido}</Table.Cell>
						<Table.Cell>{item.tipo}</Table.Cell>
						<Table.Cell>{item.hora}</Table.Cell>
					</Table.Row>
				} ) }
	</Table.Body>
</Table>;

export default EleccionesTabla;