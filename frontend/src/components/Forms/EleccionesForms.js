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

const EleccionesForm = props => {

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
				<Form.Field required>
					<label> Campaña (descripción) </label>
					<input name='campana' ref={register({required: true})}/>
				</Form.Field>
				<Form.Group widths="equal">
					<Form.Field required>
						<label> Tipo de Elecciones </label>
						<select name='tipo_elecciones' ref={register({ required: true, pattern: /^(f|m)$/ })}>
							<option value=''>--seleccione--</option>
							<option value='f'>Federal</option>
							<option value='m'>Municipal</option>
						</select>
						{ errors.tipo_elecciones && errors.tipo_elecciones.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar un tipo</Message.Header>
							<p> Para agregar una nueva elección es necesario seleccionar un tipo </p>
						</Message> }
						{ errors.campana && errors.campana.type === 'required' && <Message negative>
							<Message.Header>Es necesaria una descripción/comentario</Message.Header>
							<p> Se utilizará como referencia </p>
						</Message> }
						{ errors.tipo_elecciones && errors.tipo_elecciones.type === 'pattern' && <Message negative>
							<Message.Header>Opciones no válidas</Message.Header>
							<p> No es normal que hayan cambiado los valores, vuelve a abrir el modal de nuevo </p>
						</Message> }
						{ (!isValidDate && !(startDate && endDate)) 
							&& <Message negative>
							<Message.Header>Seleccione un periodo para la elección</Message.Header>
							<p> Para agregar una nueva elección es necesario llenar los dos campos de fecha </p>
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
					content={props.isEditing ? "Actualizar" : "Crear"}
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
