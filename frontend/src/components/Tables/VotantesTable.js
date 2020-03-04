import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table }  from 'semantic-ui-react';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/EleccionesDetails';
import Edit from './../Forms/EleccionesForms';

/**
 * Es la tabla que se usa para el index de los votantes
*/

const EleccionesTabla = props => {

	const type = props.match.path.replace('/', '');
	
	return <Table celled padded>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>IFE</Table.HeaderCell>
				<Table.HeaderCell>Nombre</Table.HeaderCell>
				<Table.HeaderCell>Mesa</Table.HeaderCell>
				{type === 'votantes' && <Table.HeaderCell>Tipo</Table.HeaderCell> }
				{type !== 'votantes' &&
					<Table.HeaderCell> Fecha Inicio - Fecha Fin </Table.HeaderCell	>
				}
				{type === 'suplentes' && <Table.HeaderCell> Superior </Table.HeaderCell> }
				{type === 'apoderados' &&
					<React.Fragment>
						<Table.HeaderCell> Siglas </Table.HeaderCell>
						<Table.HeaderCell> Orden </Table.HeaderCell>
					</React.Fragment>
				}
				<Table.HeaderCell>######</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>BLABLABLA</Table.Cell>
				<Table.Cell>José Juan Rosales</Table.Cell>
				<Table.Cell>A</Table.Cell>
				<Table.Cell>Mexican</Table.Cell>
				{ type === 'suplentes' && <Table.Cell> some one else </Table.Cell> }
				{type === 'apoderados' &&
					<React.Fragment>
						<Table.Cell> PTM </Table.Cell>
						<Table.Cell> 0 </Table.Cell>
					</React.Fragment>
				}
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
}

export default withRouter(EleccionesTabla);