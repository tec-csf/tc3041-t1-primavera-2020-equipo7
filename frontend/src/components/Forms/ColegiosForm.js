import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import axios from '../../axios';
import { Loader, Dimmer } from 'semantic-ui-react';
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const ColegiosForm = props => {

	// if on edit mode
	const [colegio, setColegio] = useState();
	const [elecciones, setElecciones] = useState();

	useEffect(() => {
		if(!props.isEditing){
			axios.get('/elecciones/')
			.then(res => {
				setElecciones([...res.data])
				console.log('no editing: ', res.data);
			})
			.catch(err => {
				console.log('err getting elecciones in colegio', err);
			});
		}
	}, [props.isEditing])

	const getDetailsFromChild = data => {
		axios.get('/elecciones/')
		.then(res => {
			setElecciones([...res.data])
			//console.log('done', res.data);
		})
		.catch(err => {
			console.log('err getting elecciones in colegio', err);
		});

		setColegio(data[0]);
		console.log('editing :', data[0]);
	};
	
	// Controls for show
	const ParentComponent = props.isEditing ? Mask : React.Fragment;
	const propsForComponent = props.isEditing
		? { callback: getDetailsFromChild, id: props.id }
		: null;

	// Forms Validation
	const { register, handleSubmit, errors } = useForm()
	const onSubmitHandler = data => {

		axios.post('colegios/' + (props.isEditing ? props.id + '/' : ''), data)
			.then(res => {
				console.log('Updating success:', res);
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
			{( (!props.isEditing) || (colegio && colegio.id && elecciones && elecciones[0]) ) ?
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
				<Form.Group widths='equal'>
					<Form.Field required >
						<label> Dirección </label>
						<input
							type='text'
							name='direccion'
							ref={register({ required: true })}
							defaultValue={ colegio ? colegio.direccion : null }
						/>
						{ errors.direccion && errors.direccion.type === 'required' && <Message negative>
							<Message.Header>Es necesario una dirección </Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group >
					<Form.Field required width='5'>
						<label> Elecciones </label>
							<select
							name='id_eleccion'
							ref={register({ required: true })}
							defaultValue={ (props.isEditing && colegio) && colegio.id_eleccion ? colegio.id_eleccion : null }
							>
								<option value=''>--seleccione--</option>
								{
									elecciones && elecciones.map(item => {
										return <option value={item.id} key={item.id}> {item.descripcion} </option>
									})
								}
							</select>
						{ errors.id_eleccion && errors.id_eleccion.type === 'required' && <Message negative>
							<Message.Header>El colegio debe pertenecer a unas elecciones</Message.Header>
						</Message> }
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
			</Form> : <Dimmer active> <Loader /> </Dimmer> }
		</ParentComponent>
	);
};

ColegiosForm.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired
};

export default ColegiosForm;
