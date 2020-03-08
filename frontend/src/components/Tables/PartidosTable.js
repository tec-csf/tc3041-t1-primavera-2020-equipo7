import React from 'react';
import { Table }  from 'semantic-ui-react';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/PartidosDetails';
import Edit from './../Forms/PartidosForm';

/**
 * Es la tabla que se usa para el index de de los partidos
*/
const PartidosTabla = props => <Table celled padded>
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
		{props.info.map( item => {
				return <Table.Row key={item.siglas}>
					<Table.Cell>{item.siglas}</Table.Cell>
					<Table.Cell>{item.nombre}</Table.Cell>
					<Table.Cell>{item.presidente}</Table.Cell>
					<Table.Cell>{item.fecha_inicio.replace('00:00:00 GMT', '')}</Table.Cell>
					<Table.Cell>{item.fecha_final.replace('00:00:00 GMT', '')}</Table.Cell>
					<RudButton
						id={item.siglas}
						refresh={props.loadInfo}
						onDelete={item.siglas}
						title={item.nombre}
						onShow={Details}
						onEdit={Edit}
					/>
				</Table.Row>
			} ) }
	</Table.Body>
</Table>;

export default PartidosTabla;