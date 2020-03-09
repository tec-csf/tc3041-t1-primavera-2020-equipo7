import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import { Container, Form, Button, Message } from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
registerLocale('es', es);

const PeriodForm = props => {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [areValidDates, setValidDates] = useState(true);

	const onSubmitHandler = () => {
		if(startDate && endDate){
			console.log('Buscando en rango de fechas');
			console.log(startDate, endDate)
			props.newInfo('get a' + props.match.path )
		}else{
			setValidDates(false);
			return;
		}
	}

	return (
		<Container textAlign='center'>
			<br/>
			{ !areValidDates && <Message negative>
				<Message.Header>Ingrese un periodo válido</Message.Header>
			</Message> }
			<Form onSubmit={onSubmitHandler}>
				<Form.Group widths='equal'>
					<DatePicker
						selected={startDate}
						onChange={date => {setStartDate(date); setValidDates(areValidDates ? true : date && endDate)}}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						locale='es'
						placeholderText='Fecha inicio'
					/>
					<DatePicker
						selected={endDate}
						onChange={date => {setEndDate(date); setValidDates(date && startDate)}}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						placeholderText='Fecha final'
					/>
					<Button
						icon="search"
						labelPosition="right"
						content="Buscar"
						type="submit"
						floated="left"
					/>
				</Form.Group>
			</Form>
		</Container>
	);
}

PeriodForm.propTypes = {
	/** search after  */
	newInfo: PropTypes.func.isRequired
}

export default withRouter(PeriodForm);