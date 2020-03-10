import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import { Container, Form, Button, Message } from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios';
registerLocale('es', es);

const PeriodForm = props => {
	const [startDate, setStartDate] = useState();
	const [isValidDate, setIsValidDate] = useState(true);

	const onSubmitHandler = () => {
		if(startDate){
			//console.log('Buscando por fecha exacata');
			//console.log(startDate);
			//props.newInfo('get a' + props.match.path );
			axios.post(props.match.path + '/fecha_ex/', {"fecha" : startDate})
			.then(res => {
				props.newInfo(res.data);
				console.log('getting periods', res.data);
			})
			.catch(err => console.log('err getting periods', props.match.path, err))
		}else{
			setIsValidDate(false);
			return;
		}
	}

	return (
		<Container textAlign='center'>
			{ !isValidDate && <Message negative>
				<Message.Header>Ingrese una fecha para buscar</Message.Header>
			</Message> }
			<Form onSubmit={onSubmitHandler}>
				<Form.Group widths='equal'>
					<DatePicker
						selected={startDate}
						onChange={date => {setStartDate(date); setIsValidDate(date)}}
						selectsStart
						startDate={startDate}
						locale='es'
						placeholderText='Fecha inicio'
					/>
					<Button
						icon="search"
						labelPosition="right"
						content="Buscar por fecha exacta"
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