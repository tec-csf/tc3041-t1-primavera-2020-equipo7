import React, { useState } from "react";
import { es } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const VotantesForm = props => {
	// for dates | aqui se pone con new Date()
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

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
		//console.log('dates:', startDate, endDate)
		props.handleClose();
	}

	return (
		<ParentComponent {...propsForComponent}>
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
				<Form.Group widths="equal">
					<Form.Field>
						<label> Tipo de Elecciones </label>
						<select name='tipo_elecciones' ref={register({ required: true, pattern: /^(f|m)$/ })}>
							<option value='f'>Federal</option>
							<option value='m'>Municipal</option>
						</select>
						{ errors.tipo_elecciones && errors.tipo_elecciones.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar un tipo</Message.Header>
							<p> Para agregar una nueva elección es necesario seleccionar un tipo </p>
						</Message> }
						{ errors.tipo_elecciones && errors.tipo_elecciones.type === 'pattern' && <Message negative>
							<Message.Header>Algo anda mal</Message.Header>
							<p> No es normal que hayan cambiado los valores, vuelve a abrir el modal de nuevo </p>
						</Message> }
						{ (errors.fecha_inicio || errors.fecha_fin) && <Message negative>
							<Message.Header>Los campos fecha deben estar llenos</Message.Header>
							<p> Para agregar una nueva elección es necesario llenar los dos campos de fecha </p>
						</Message> }
					</Form.Field>
					<Form.Field>
						<b>Duración de las elecciones</b> (inclusivo - exclusivo)
						<DateRangePicker
							startDate={startDate}
							endDate={endDate}
							onStartDateChange={setStartDate}
							onEndDateChange={setEndDate}
							minimumDate={new Date()}
							format="dd MMM yyyy"
							locale={es}
						>
							{({ startDateInputProps, endDateInputProps, focus }) => (
								<div className="date-range">
									<input
										name='fecha_inicio'
										className={
											"input" + (focus === START_DATE ? " -focused" : "")
										}
										{ ...{...startDateInputProps, ref:register({required: true})} }
										placeholder="Fecha de inicio"
									/>
									<span className="date-range_arrow" />
									<input
										name='fecha_fin'
										className={"input" + (focus === END_DATE ? " -focused" : "")}
										{ ...{...endDateInputProps, ref:register({required: true})} }
										placeholder="Fecha de fin"
									/>
								</div>
							)}
						</DateRangePicker>
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

VotantesForm.propTypes = {
	/** id for get details */
	id: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired
};

export default VotantesForm;
