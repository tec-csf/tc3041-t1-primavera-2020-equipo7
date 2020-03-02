import React from "react";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const EleccionesForm = props => {

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
		console.log(
			props.isEditing ? "mandando form edeiting" : "mandandolo a new"
			);
		console.log(data);
		props.handleClose();
	}

	return (
		<ParentComponent {...propsForComponent}>
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
				<Form.Group widths="equal">
					<Form.Field required>
						<label> Colegio </label>
						<select name='colegio' ref={register({ required: true })}>
							<option value=''>--Selecciona--</option>
							<option value='1'>1</option>
							<option value='2'>2</option>
						</select>
						{ errors.colegio && errors.colegio.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar un colegio</Message.Header>
							<p> Para agregar un voto es necesario seleccionar un colegio </p>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Mesa</label>
						<select name='mesa' ref={register({ required: true })}>
							<option value=''>--Selecciona--</option>
							<option value='A'>A</option>
							<option value='B'>B</option>
						</select>
						{ errors.mesa && errors.mesa.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar una mesa</Message.Header>
							<p> Para agregar un voto es necesario seleccionar una mesa </p>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Field required>
						<label> Tipo Voto </label>
						<select name='tipo_voto' ref={register({ required: true })}>
							<option value=''>--Selecciona--</option>
							<option value='b'>Blanco</option>
							<option value='n'>Nulo</option>
							<option value='ok'>Bueno</option>
						</select>
						{ errors.tipo_voto && errors.tipo_voto.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar un tipo de voto</Message.Header>
							<p> Para agregar un voto es necesario seleccionar un tipo de voto</p>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Partido </label>
						<select name='partido' ref={register({ required: true })}>
							<option value=''>--Selecciona--</option>
							<option value='A'>Partido A</option>
							<option value='B'>Partido B</option>
						</select>
						{ errors.partido && errors.partido.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar un partido</Message.Header>
							<p> Para agregar un voto es necesario seleccionar un partido </p>
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

EleccionesForm.propTypes = {
	/** id for get details */
	id: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired
};

export default EleccionesForm;
