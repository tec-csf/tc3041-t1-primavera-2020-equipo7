import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table }  from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import RudButton from './_shared/RUD_Button';

import Details from './../Details/VotantesDetails';
import Edit from './../Forms/VotantesForm';

/**
 * Es la tabla que se usa para el index de los votantes
*/

const VotantesTabla = props => {

	const type = props.match.path.replace('/', '');
	
	return <Table celled padded>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>ID</Table.HeaderCell>
				<Table.HeaderCell>Nombre</Table.HeaderCell>
				{type !== 'apoderados' && <Table.HeaderCell>Mesa</Table.HeaderCell>}
				{type === 'votantes' && <Table.HeaderCell>Nacionalidad</Table.HeaderCell> }
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
			{ props.info.map( item => {
				return <Table.Row key={item.id}>
					<Table.Cell>{item.id}</Table.Cell>
					<Table.Cell>{item.nombre}</Table.Cell>
					{type !== 'apoderados' && <Table.Cell>{item.letra}</Table.Cell>}
					<Table.Cell>
						{
						type === 'votantes' 
						? item.es_mexicano ? 'Mexicano' : 'Extranjero'
						: item.fecha_inicio.replace('00:00:00 GMT', '') + ' - ' + item.fecha_final.replace('00:00:00 GMT', '')
						}
					</Table.Cell>
					{type === 'suplentes' && <Table.Cell> {item.superior} </Table.Cell>}
					{
						type === 'apoderados' &&
						<React.Fragment>
							<Table.Cell> {item.siglas} </Table.Cell>
							<Table.Cell> {item.orden} </Table.Cell>
						</React.Fragment>
					}
					<RudButton
						id={item.id}
						refresh={props.loadInfo}
						onDelete={item.nombre}
						title={item.nombre}
						onShow={Details}
						onEdit={Edit}
					/>
				</Table.Row>
				} ) }
		</Table.Body>
	</Table>;
}

VotantesTabla.propTypes = {
	/** To show info */
	info: PropTypes.array.isRequired,
	/** To load info when updating or deleting */
	loadInfo: PropTypes.func.isRequired
}

export default withRouter(VotantesTabla);