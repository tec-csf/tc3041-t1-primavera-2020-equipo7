import React from 'react';
import { Table }  from 'semantic-ui-react';

//own

/**
 * Es la tabla que se usa para el index de de los votos municipales y federales
*/
const VotosTabla = props => <Table celled padded>
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>Elección</Table.HeaderCell>
			<Table.HeaderCell>Colegio</Table.HeaderCell>
			<Table.HeaderCell>Mesa</Table.HeaderCell>
			<Table.HeaderCell>Partido</Table.HeaderCell>
			<Table.HeaderCell>Tipo Voto</Table.HeaderCell>
			<Table.HeaderCell>Hora</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{ props.info.map(item => {
					return <Table.Row key={item.id} textAlign='center'>
						<Table.Cell>{item.descripcion}</Table.Cell>
						<Table.Cell>{item.id_colegio}</Table.Cell>
						<Table.Cell>{item.letra}</Table.Cell>
						<Table.Cell>{item.tipo_voto == 0 ? '~NA~' : item.siglas}</Table.Cell>
						<Table.Cell>{item.tipo_voto == 0 ? 'Nulo' : 'Bueno'}</Table.Cell>
						<Table.Cell>{item.fecha_hora_voto}</Table.Cell>
					</Table.Row>
				} ) }
	</Table.Body>
</Table>;

export default VotosTabla;