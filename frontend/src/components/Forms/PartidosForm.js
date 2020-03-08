import React, { useState } from "react";
import { es } from "date-fns/locale";
import { format } from 'date-fns';
import { DatePickerCalendar } from "react-nice-dates";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import axios from '../../axios';
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
	const [partido, setPartido] = useState();
	const getDetailsFromChild = data => {
		setPartido(data[0]);
		console.log('editing :', data[0]);
		setStartDate(new Date(data[0].fecha_inicio.replace('00:00:00 GMT', '')));
	}

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
		const info_send = { ...data, 'fecha_inicio' : startDate }
		console.log(info_send);
		axios.post('partidos/' + (props.isEditing ? props.id + '/' : ''), info_send)
		.then(res => {
			console.log(props.isEditing ? 'Updating' : 'Creating' ,' success:', res);
			props.refresh();
			props.handleClose();
		})
		.catch(err => {
			console.log('Updating', err);
			console.log('err response:', err.response);
		})
	}

	return (
		<ParentComponent {...propsForComponent}>
			{((!props.isEditing) || (partido && partido.siglas)) && 
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
				<Form.Group widths="equal">
					<Form.Field width='4' required>
						<label> Siglas </label>
						<input
							type='text'
							name='siglas'
							ref={register({ required: true, maxLength: 10 })}
							defaultValue={partido && partido.siglas ? partido.siglas : null}
						/>
						{ errors.siglas && errors.siglas.type === 'required' && <Message negative>
							<Message.Header>Siglas es un campo requerido</Message.Header>
						</Message> }
						{ errors.siglas && errors.siglas.type === 'maxLength' && <Message negative>
							<Message.Header>Demasiado largo</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Nombre </label>
						<input
							type='text'
							name='nombre'
							ref={register({ required: true })}
							defaultValue={partido && partido.nombre ? partido.nombre : null}
						/>
						{ errors.nombre && errors.nombre.type === 'required' && <Message negative>
							<Message.Header>Se debe proporcionar el nombre del partido</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Field required>
						<label> Presidente </label>
						<input
							type='text'
							name='presidente'
							ref={register({ required: true })}
							defaultValue={partido && partido.presidente ? partido.presidente : null}
						/>
						{ errors.presidente && errors.presidente.type === 'required' && <Message negative>
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

						{ props.isEditing ? 
							<p> Fecha fin: { partido.fecha_final.replace('00:00:00 GMT', '') } </p>
							: <i>La fecha de fin es +6 años</i>
						}
						
						{!props.isEditing && <DatePickerCalendar
							date={startDate}
							onDateChange={setStartDate}
							locale={es}
							minimunDate={new Date()}
						/>}
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
			</Form>}
		</ParentComponent>
	);
};

PartidosForm.propTypes = {
	/** id for get details */
	id: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired,
};

export default PartidosForm;
