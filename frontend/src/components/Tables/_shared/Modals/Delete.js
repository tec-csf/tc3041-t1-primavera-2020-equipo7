import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Icon, Header, Loader, Dimmer } from 'semantic-ui-react';
//own
//hoc
//context
//css

const DeleteModal = (props) => {

	// Control the modal
	const [isOpenModel, setModelState] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	const [isDeleting, setDelitingState] = useState(false);
	const deleteRecord = () => {
		setDelitingState(true);
		console.log('Borranding', props.match.path, '/', props.id);
		setDelitingState(false);
		handleClose()
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
			<p> Se borrará el registro: "{props.message}" y todas sus dependencias</p>
		}
	</Modal.Content>
	<Modal.Actions>
		<Button color='red' onClick={handleClose}>
			<Icon name='remove' /> No
		</Button>
		<Button color='green' onClick={deleteRecord}>
			<Icon name='checkmark' /> Si
		</Button>
	</Modal.Actions>
</Modal>;
}

DeleteModal.propTypes = {
	/** Mensaje dentro del contenido del diálogo */
	message: PropTypes.string.isRequired,
	/** Id para hacer el Delete */
	id: PropTypes.string.isRequired,
}

export default withRouter(DeleteModal);