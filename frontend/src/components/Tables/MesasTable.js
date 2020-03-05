import React from 'react';
import { Table }  from 'semantic-ui-react';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/MesaDetails';
import Edit from './../Forms/MesasForms';

/**
 * Es la tabla que se usa para el index de de las mesas
*/
const EleccionesTabla = props => {
	return <Table celled padded>
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
			{ props.info.map( item => {
					return <Table.Row key={item.id}>
						<Table.Cell>{item.id}</Table.Cell>
						<Table.Cell>{item.eleccion}</Table.Cell>
						<Table.Cell>{item.fecha_inicio.replace('00:00:00 GMT', '')}</Table.Cell>
						<Table.Cell>{item.fecha_final.replace('00:00:00 GMT', '')}</Table.Cell>
						<RudButton
							id={item.id}
							refresh={props.loadInfo}
							onDelete={'Mesa ' + item.id}
							title={'Mesa ' + item.id}
							onShow={Details}
							onEdit={Edit}
						/>
					</Table.Row>
				} ) }
		</Table.Body>
	</Table>;
}

export default EleccionesTabla;