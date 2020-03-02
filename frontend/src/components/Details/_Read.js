import React, { useState } from 'react';
import { Modal, Button, Icon, Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
//hoc
//context
//css

const ReadModal = (props) => {
	//console.log(props)
	// para saber cuando hacer el resquest
	const [isOpenModel, setModelState] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	return <Modal
		trigger={<Button icon onClick={handleOpen}><Icon name='eye' /></Button>}
		closeIcon
		centered={false}
		onClose={handleClose}
		open={isOpenModel}
		>
		<Header>{props.title}</Header>
		<Modal.Content>
			<Container>
				{ <props.Body id={props.id}/> }
			</Container>
		</Modal.Content>
	</Modal>;
}

ReadModal.propTypes = {
	/** El id para hacer el request al API solo para eliminar */
	id: PropTypes.string.isRequired,
	/** Es un header dentro del modal */
	title: PropTypes.string,
	/** Body si details esta disponible */
	Body: PropTypes.elementType.isRequired,
}

export default ReadModal;