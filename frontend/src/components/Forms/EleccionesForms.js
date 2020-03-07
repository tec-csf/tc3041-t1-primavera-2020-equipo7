import React, { useState } from "react";
import { es } from "date-fns/locale";
import { format } from 'date-fns';
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import { useForm } from 'react-hook-form';
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import axios from '../../axios';
import { withRouter } from 'react-router-dom';
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
	const [eleccion, setEleccion] = useState();
	const getDetailsFromChild = data => {
		setEleccion(data[0]);
		console.log('editing :', data[0]);
		setStartDate(new Date(data[0].fecha_inicio.replace('00:00:00 GMT', '')));
		setEndDate(new Date(data[0].fecha_final.replace('00:00:00 GMT', '')));
	}

	// Controls for show
	const ParentComponent = props.isEditing ? Mask : React.Fragment;
	const propsForComponent = props.isEditing
		? { callback: getDetailsFromChild, id: props.id }
		: null;

	// Forms Validation
	const { register, handleSubmit, errors } = useForm();
	const onSubmitHandler = data => {
		setIsValidDate(startDate && endDate);
		if (!(startDate && endDate)) return;

		let info_to_send;

		if(props.isEditing){
			info_to_send =  { ...data }
			axios.post(props.match.path + '/' + props.id + '/', info_to_send)
				.then(res => {
					console.log('Updating success:', res);
					props.refresh();
					props.handleClose();
				})
				.catch(err => {
					console.log('Updating', err);
					console.log('err response:', err.response);
				})
		}else {
			info_to_send =  { ...data, "fecha_inicio" : startDate, "fecha_fin" : endDate }
			axios.post(props.match.path + '/', info_to_send)
				.then(res => {
					console.log('Creating success:', res);
					props.refresh();
					props.handleClose();
				})
				.catch(err => {
					console.log('Creating', err);
					console.log('err response:', err.response);
				})
		}
	}
	
	return (
		<ParentComponent {...propsForComponent}>
			{ ((!props.isEditing) || (eleccion && eleccion.tipo)) && <Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
				<Form.Field required>
					<label> Campaña (descripción) </label>
					<input
						name='descripcion'
						ref={register({required: true})}
						defaultValue={eleccion ? eleccion.descripcion : null}
					/>
					{ errors.descripcion && errors.descripcion.type === 'required' && <Message negative>
					<Message.Header>Es necesaria una descripción/comentario</Message.Header>
					<p> Se utilizará como referencia </p>
				</Message> }
				</Form.Field>
				<Form.Group widths="equal">
					<Form.Field required>
						<label> Tipo de Elecciones </label>
						<select
							name='tipo_elecciones'
							ref={register({ required: true, pattern: /^(f|m)$/ })}
							defaultValue={eleccion ? eleccion.tipo.charAt(0).toLowerCase() : null}
						>
							<option value=''>--seleccione--</option>
							<option value='f'>Federal</option>
							<option value='m'>Municipal</option>
						</select>
						{ errors.tipo_elecciones && errors.tipo_elecciones.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar un tipo</Message.Header>
							<p> Para agregar una nueva elección es necesario seleccionar un tipo </p>
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
						{ !props.isEditing && <DateRangePickerCalendar
							startDate={startDate}
							endDate={endDate}
							focus={focus}
							onStartDateChange={setStartDate}
							onEndDateChange={setEndDate}
							onFocusChange={handleFocusChange}
							locale={es}
							minimumDate={new Date()}
						/>}
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
			</Form>}
		</ParentComponent>
	);
};

EleccionesForm.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired
};

export default withRouter(EleccionesForm);
