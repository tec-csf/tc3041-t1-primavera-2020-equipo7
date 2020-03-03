import React, { useState } from "react";
import { es } from "date-fns/locale";
import { format } from 'date-fns';
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const ColegiosForm = props => {

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
						<input type='text' name='id_colegio' ref={register({ required: true })}/>
						{ errors.id_colegio && errors.id_colegio.type === 'required' && <Message negative>
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
							<Message.Header>El colegio debe pertenecer a unas elecciones</Message.Header>
						</Message> }
						{ (!isValidDate && !(startDate && endDate)) 
							&& <Message negative>
							<Message.Header>Seleccione un periodo para la elección</Message.Header>
							<p> Para agregar una nueva elección es necesario elegir un periodo de fechas </p>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label>Periodo </label>
						<p>Fecha de inicio: {startDate ? format(startDate, 'dd MMM yyyy', { locale: es }) : '---'}</p>
						<p>Fecha de fin: {endDate ? format(endDate, 'dd MMM yyyy', { locale: es }) : '---'}</p>
						<i>nota: (i-e)</i>
						<DateRangePickerCalendar
							startDate={startDate}
							endDate={endDate}
							focus={focus}
							onStartDateChange={setStartDate}
							onEndDateChange={setEndDate}
							onFocusChange={handleFocusChange}
							locale={es}
							minimumDate={new Date()}
						/>
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

ColegiosForm.propTypes = {
	/** id for get details */
	id: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired
};

export default ColegiosForm;
