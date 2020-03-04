import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { es } from "date-fns/locale";
import { format } from 'date-fns';
import { DatePickerCalendar, useDateInput } from "react-nice-dates";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const VotantesForm = props => {

	const type = props.match.path.replace('/', '');

	// for dates | aqui se pone con new Date()
	const [startDate, setStartDate] = useState();
	const [isValidDate, setIsValidDate] = useState(true);

	const [dateBorn, setDateBorn] = useState();
	const [isValidDateBorn, setValidBornDate] = useState(true);

	const inputProps = useDateInput({
		dateBorn,
		format: 'dd-MM-yyyy',
		locale: es,
		onDateChange: setDateBorn
	});

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
		setValidBornDate(dateBorn);
		if (!(startDate)) return;
		if( !(dateBorn) ) return;

		console.log(
			props.isEditing ? "mandando form edeiting" : "mandandolo a new"
			);
		console.log(data, startDate, dateBorn, type);
		props.handleClose();
	}
	
	return (
		<ParentComponent {...propsForComponent}>
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='off'>
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
					</Form.Field>
					<Form.Field required>
						<label> Colegio </label>
						<select name='colegio' ref={register({ required: true })}>
							<option value=''>--seleccione--</option>
							<option value='1'>1</option>
							<option value='2'>2</option>
						</select>
						{ errors.colegio && errors.colegio.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar un tipo</Message.Header>
							<p> Para agregar una nueva elección es necesario seleccionar un tipo </p>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Mesa </label>
						<select name='mesa' ref={register({ required: true })}>
							<option value=''>--seleccione--</option>
							<option value='1'>A</option>
							<option value='2'>B</option>
						</select>
						{ errors.mesa && errors.mesa.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar un tipo</Message.Header>
							<p> Para agregar una nueva elección es necesario seleccionar un tipo </p>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Field required>
						<label> Fecha de nacimiento </label>
						<p>Fecha nacimiento: {dateBorn && format(dateBorn, 'dd MMM yyyy', { locale: es })}</p>
						<input className='input' {...inputProps} />
						<DatePickerCalendar date={dateBorn} onDateChange={setDateBorn} locale={es} />
						{ (!isValidDateBorn && !(dateBorn)) 
							&& <Message negative>
							<Message.Header>Ingrese la fecha de nacimiento</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Periodo </label>
						<p>
							Fecha de inicio: {startDate ? format(startDate, 'dd MMM yyyy', { locale: es }) : '---'}
						</p>
						<DatePickerCalendar date={startDate} onDateChange={setStartDate} locale={es} minimunDate={new Date()}/>
						{ (!isValidDate && !(startDate)) 
							&& <Message negative>
							<Message.Header>Seleccione un periodo válido</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group>
					<Form.Field required width='6'>
						<label> Nombre Completo </label>
						<input type='text' name='nombre' ref={ register({ required: true }) }/>
						{ errors.nombre && errors.nombre.type === 'required' && <Message negative>
							<Message.Header>Se debe proporcionar un nombre</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field required width='9'>
						<label> Dirección </label>
						<input type='text' name='direccion' ref={ register({ required: true }) }/>
						{ errors.direccion && errors.direccion.type === 'required' && <Message negative>
							<Message.Header>Se debe proporcionar una dirección</Message.Header>
						</Message> }
					</Form.Field>
					{ type === 'votantes' && <Form.Field>
						<label> Extranjero </label>
						<input type='checkbox' name='es_extranjero' ref={register()}/>
					</Form.Field> }
					{ type === 'suplentes' && <Form.Field>
						<label> Superior </label>
						<select name='superior' ref={register({ required: true })}>
							<option value=''>--seleccione--</option>
							<option value='1'>someone a</option>
							<option value='2'>someone b</option>
						</select>
						{ errors.superior && errors.superior.type === 'required' && <Message negative>
							<Message.Header>El suplente debe tener un superior</Message.Header>
						</Message> }
					</Form.Field> }
				</Form.Group>
				{ type === 'apoderados' && <Form.Group>
					<Form.Field>
						<label> Siglas </label>
						<select name='siglas' ref={register({ required: true })}>
							<option value=''>--seleccione--</option>
							<option value='1'>PTM</option>
							<option value='2'>PSD</option>
						</select>
						{ errors.siglas && errors.siglas.type === 'required' && <Message negative>
							<Message.Header>El apoderado debe pertenecer a un partido</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field>
						<label> Orden </label>
						<select name='orden' ref={register({ required: true })}>
							<option value=''>--seleccione--</option>
							<option value='0'>0</option>
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
						</select>
						{ errors.orden && errors.orden.type === 'required' && <Message negative>
							<Message.Header>El apoderado debe tener un orden</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group> }
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

VotantesForm.propTypes = {
	/** id for get details */
	id: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
};

export default withRouter(VotantesForm);
