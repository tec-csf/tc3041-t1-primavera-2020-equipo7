import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button }  from 'semantic-ui-react';
// own
import DeleteModal from './Modals/Delete';
import ReadModal from '../../Details/_Read';
import EditModal from '../../Forms/_CU';

/**
 * Debe estar dentro de una tabla,
 * contiene los botones de editar, ver detalles y eliminar
*/

const CrudButton = (props) => {
	return (
		<Table.Cell textAlign='center'>
		<Button.Group>
			{
				props.onShow &&
				<ReadModal id={props.id} title={props.title} Body={props.onShow}/>
			}
			{
				props.onEdit &&
				<EditModal id={props.id} Form={props.onEdit} isEditing/>
			}
			{
				props.onDelete &&
				<DeleteModal message={props.onDelete} id={props.id} refresh={props.refresh}/>
			}
		</Button.Group>
	</Table.Cell>
	);
}

CrudButton.propTypes = {
	/** El id para hacer el request al API solo para eliminar */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/** Mensaje que se muestra cuando aparece el dialogo de elimar*/
	onDelete: PropTypes.string,
	/** Title para ver detalles, necesario si se manda un onShow() */
	title: PropTypes.string,
	/** Componente que se rendera cuando se piden ver los detalles, mandar title de preferencia */
	onShow: PropTypes.elementType,
	/** Componente que se rendera cuando se hara una edición */
	onEdit: PropTypes.elementType,
	/** refresh index */
	refresh: PropTypes.func
}

/** @component */
export default CrudButton;