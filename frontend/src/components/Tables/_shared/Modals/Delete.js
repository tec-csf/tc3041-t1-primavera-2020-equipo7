import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../../axios';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Icon, Header, Loader, Dimmer, Message } from 'semantic-ui-react';
//own
//hoc
//context
//css

const DeleteModal = props => {

	// Control the modal
	const [isOpenModel, setModelState] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	const [isDeleting, setDelitingState] = useState(false);
	const [errorDeleting, setErrorDeleting] = useState(false);

	const deleteRecord = () => {
		setDelitingState(true);
		//console.log('Borranding', (props.match.path + '/' + props.id));
		axios.delete(props.match.path + '/' + props.id + '/')
			.then(res => {
				console.log('Deleting success:', res);
				props.refresh();
				handleClose();
			})
			.catch(err => {
				console.log('Deleting failed:', err);
				console.log('Error response:', err.response);
				setErrorDeleting(err.response.data.error === 'Collection not found');
			}).then(() => setDelitingState(false))
	}

	return <Modal trigger={
		<Button icon onClick={handleOpen}> <Icon name='trash' /> </Button>
		}
		closeIcon
		dimmer='blurring'
		open={isOpenModel}
		onClose={handleClose}
		centered={false}
	>
	<Header icon='trash alternate outline' content='¿Esta seguro que desea eliminar?' />
	<Modal.Content>
		{
			isDeleting ?
			<Dimmer active> <Loader /> </Dimmer> : 
				errorDeleting ?
				<Message negative>
				<Message.Header>Algo salio mal..</Message.Header>
					<p>No se puede borrar este registro, es probable que tenga dependencias</p>
				</Message> :
				<p> Se borrará el registro: "{props.message}"</p>
		}
	</Modal.Content>
	{!errorDeleting ? <Modal.Actions>
		<Button color='red' onClick={handleClose}>
			<Icon name='remove' /> No
		</Button>
		<Button color='green' onClick={deleteRecord}>
			<Icon name='checkmark' /> Si
		</Button>
	</Modal.Actions>:
	<Modal.Actions>
	<Button color='red' onClick={handleClose}>
		<Icon name='remove' /> Cerrar
	</Button>
	</Modal.Actions>
	}
</Modal>;
}

DeleteModal.propTypes = {
	/** Id para hacer el Delete */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/** Mensaje dentro del contenido del diálogo */
	message: PropTypes.string.isRequired,
	/** refresh index */
	refresh: PropTypes.func.isRequired
}

export default withRouter(DeleteModal);