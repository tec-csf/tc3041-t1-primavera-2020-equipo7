import React, { useState } from "react";
import { es } from "date-fns/locale";
import { format } from 'date-fns';
import { DatePickerCalendar } from "react-nice-dates";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const PartidosForm = props => {

	// for dates | aqui se pone con new Date()
	const [startDate, setStartDate] = useState();
	const [isValidDate, setIsValidDate] = useState(true);

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
		setIsValidDate(startDate);
		if (!(startDate)) return;
		console.log(
			props.isEditing ? "mandando form edeiting" : "mandandolo a new"
			);
		console.log(data, startDate);
		props.handleClose();
	}
	console.log(errors)
	return (
		<ParentComponent {...propsForComponent}>
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
				<Form.Group widths="equal">
					<Form.Field width='4' required>
						<label> Siglas </label>
						<input type='text' name='siglas' ref={register({ required: true })}/>
						{ errors.siglas && errors.siglas.type === 'required' && <Message negative>
							<Message.Header>Siglas es un campo requerido</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Nombre </label>
						<input type='text' name='nombre_partido' ref={register({ required: true })}/>
						{ errors.nombre_partido && errors.nombre_partido.type === 'required' && <Message negative>
							<Message.Header>Se debe proporcionar el nombre del partido</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Field required>
						<label> Presidente </label>
						<input type='text' name='presi' ref={register({ required: true })}/>
						{ errors.presi && errors.presi.type === 'required' && <Message negative>
							<Message.Header>El nombre del presidente es necesario</Message.Header>
						</Message> }
						{ (!isValidDate && !(startDate)) 
							&& <Message negative>
							<Message.Header>Seleccione una fecha de inicio para el partido</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label>Periodo del partido</label>
						<p>
							Fecha de inicio: {startDate ? format(startDate, 'dd MMM yyyy', { locale: es }) : '---'}
						</p>
						<DatePickerCalendar date={startDate} onDateChange={setStartDate} locale={es} minimunDate={new Date()}/>
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

PartidosForm.propTypes = {
	/** id for get details */
	id: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired
};

export default PartidosForm;
