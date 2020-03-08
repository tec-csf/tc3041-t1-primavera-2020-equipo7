import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message, Dimmer, Loader } from "semantic-ui-react";
import axios from '../../axios';
//own
import Mask from "../../util/GetMethod";
//hoc
//context
//css

const MesasForm = props => {

	const [elecciones, setElecciones] = useState();
	const [colegios, setColegios] = useState();
	const [mesa, setMesa] = useState();

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

	// if on edit mode
	const getDetailsFromChild = data => {
		setMesa({...data[0]})

		axios.get('/elecciones/')
		.then(res => {
			setElecciones([...res.data])
			axios.get('/colegios/')
			.then(res => {
				//console.log('done', res.data, data[0].id_colegio);
				const afterFilter = res.data.filter(item => item.id_eleccion === data[0].id_eleccion )
				//console.log('after filter: ', afterFilter)
				setColegios(afterFilter)
			})
			.catch(err => {
				console.log('err getting elecciones in colegio', err);
			});
		})
		.catch(err => {
			console.log('err getting elecciones in colegio', err);
		});

		console.log("editing", data[0]);
	};

	const getColegios = () => {
		axios.get('/colegios/')
		.then(res => {
			//console.log(res.data)
			const afterFilter = res.data.filter(item => item.id_eleccion === parseInt(watch('id_eleccion')) )
			//console.log('after filter: ', afterFilter)
			setColegios(afterFilter)
		})
		.catch(err => {
			console.log('err getting elecciones in colegio', err);
		});
	}

	// Controls for show
	const ParentComponent = props.isEditing ? Mask : React.Fragment;
	const propsForComponent = props.isEditing
		? { callback: getDetailsFromChild, id: props.id }
		: null;

	// Forms Validation
	const { register, handleSubmit, errors, watch } = useForm()
	const onSubmitHandler = data => {
		console.log(data);
		axios.post('mesas/' + (props.isEditing ? props.id + '/' : ''), data)
		.then(res => {
			console.log(props.isEditing ? 'Updating' : 'Creating' ,' success:', res);
			props.refresh();
			props.handleClose();
		})
		.catch(err => {
			console.log(props.isEditing ? 'Updating' : 'Creating' , err);
			console.log('err response:', err.response);
		})
	}
	
	return (
		<ParentComponent {...propsForComponent}>
			{	( (!props.isEditing) || (mesa && mesa.id && elecciones && elecciones[0] && colegios && colegios[0])) ?
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
				<Form.Group widths="equal">
					<Form.Field required>
						<label> Letra </label>
						<input
							type='text'
							name='letra'
							ref={register({ required: true, pattern: /^[A-Za-z]$/ })}
							defaultValue={(props.isEditing && mesa) && mesa.letra ? mesa.letra : null}
						/>
						{ errors.letra && errors.letra.type === 'required' && <Message negative>
							<Message.Header>Es necesario un identificador</Message.Header>
						</Message> }
						{ errors.letra && errors.letra.type === 'pattern' && <Message negative>
							<Message.Header>Sólo puede ser una letra</Message.Header>
							<p> Para agregar una mesa es necesario proporcionar una letra, ñÑ no permitida </p>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Elecciones </label>
							<select
							name='id_eleccion'
							ref={register({ required: true })}
							defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
							onChange={() => getColegios()}
							>
								<option value=''>--seleccione--</option>
								{
									elecciones && elecciones.map(item => {
										return <option value={item.id} key={item.id}> {item.descripcion} </option>
									})
								}
							</select>
						{ errors.id_eleccion && errors.id_eleccion.type === 'required' && <Message negative>
							<Message.Header>La mesa debe pertenecer a unas elecciones</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Colegio </label>
							<select
							name='id_colegio'
							ref={register({ required: true })}
							defaultValue={ (props.isEditing && mesa) && mesa.id_colegio ? mesa.id_colegio : null }
							>
								<option value=''>--seleccione--</option>
								{
									colegios && colegios.map(item => {
										return <option value={item.id} key={item.id}> {item.direccion} </option>
									})
								}
							</select>
						{ errors.id_colegio && errors.id_colegio.type === 'required' && <Message negative>
							<Message.Header>La mesa debe pertenecer a un colegio</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
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

MesasForm.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired,
};

export default MesasForm;
