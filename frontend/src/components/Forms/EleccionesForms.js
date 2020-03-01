import React, { useState } from "react";
import { es } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const EleccionesForm = props => {
	// for dates | aqui se pone con new Date()
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	// if on edit mode
	const getDetailsFromChild = data => {
		console.log("load to edit", data);
	};

	// Controls for show
	const onSubmitHandler = () => {
		console.log(
			props.isEditing ? "mandando form edeiting" : "mandandolo a new"
		);
		props.handleClose();
	};

	const ParentComponent = props.isEditing ? Mask : React.Fragment;
	const propsForComponent = props.isEditing
		? { callback: getDetailsFromChild, id: props.id }
		: null;

	return (
		<ParentComponent {...propsForComponent}>
			<Form onSubmit={onSubmitHandler}>
				<Form.Group widths="equal">
					<Form.Field label="Tipo de Elecciones" control="select">
						<option value="f">Federal</option>
						<option value="m">Municipal</option>
					</Form.Field>
					<Form.Field>
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
										className={
											"input" + (focus === START_DATE ? " -focused" : "")
										}
										{...startDateInputProps}
										placeholder="Fecha de inicio"
									/>
									<span className="date-range_arrow" />
									<input
										className={"input" + (focus === END_DATE ? " -focused" : "")}
										{...endDateInputProps}
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

EleccionesForm.propTypes = {
	/** id for get details */
	id: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired
};

export default EleccionesForm;
