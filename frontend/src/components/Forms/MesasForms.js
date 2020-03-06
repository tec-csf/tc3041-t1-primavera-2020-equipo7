import React, { useState } from "react";
import { START_DATE } from "react-nice-dates";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const MesasForm = props => {

	// for dates | aqui se pone con new Date()
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [focus, setFocus] = useState(START_DATE);
	const [isValidDate, setIsValidDate] = useState(true);
	
	const handleFocusChange = newFocus => {
		setFocus(newFocus || START_DATE);
	}

	// if on edit mode
	const getDetailsFromChild = data => {
		console.log("load to edit", data);
	};

	// Controls for show
	const ParentComponent = props.isEditing ? Mask : React.Fragment;
	const propsForComponent = props.isEditing
		? { callback: getDetailsFromChild, id: props.id }
		: null;

	// Forms Validation
	const { register, handleSubmit, errors } = useForm()
	const onSubmitHandler = data => {
		setIsValidDate(startDate && endDate);
		if (!(startDate && endDate)) return;
		console.log(
			props.isEditing ? "mandando form edeiting" : "mandandolo a new"
			);
		console.log(data, startDate, endDate);
		props.handleClose();
	}
	
	return (
		<ParentComponent {...propsForComponent}>
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
				<Form.Group widths="4">
					<Form.Field required>
						<label> Identificador </label>
						<input type='text' name='id_mesa' ref={register({ required: true })}/>
						{ errors.id_mesa && errors.id_mesa.type === 'required' && <Message negative>
							<Message.Header>Es necesario un identificador</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Field required>
						<label> Elecciones </label>
						<select name='elecciones' ref={register({ required: true })}>
							<option value=''>--seleccione--</option>
							<option value='1'>junio 15</option>
							<option value='2'>marzo 16</option>
						</select>
						{ errors.elecciones && errors.elecciones.type === 'required' && <Message negative>
							<Message.Header>La mesa debe pertenecer a unas elecciones</Message.Header>
						</Message> }
						{ (!isValidDate && !(startDate && endDate)) 
							&& <Message negative>
							<Message.Header>Seleccione un periodo para la mesa</Message.Header>
							<p> Para agregar una nueva mesa es necesario elegir un periodo de fechas </p>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Button
					positive
					icon="checkmark"
					labelPosition="right"
					content={props.isEditing ? "Actualizar" : "Agregar"}
					type="submit"
					floated="right"
				/>
				<br />
				<br />
			</Form>
		</ParentComponent>
	);
};

MesasForm.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired
};

export default MesasForm;
