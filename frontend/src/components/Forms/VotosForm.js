import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { Form, Button, Message } from "semantic-ui-react";
import axios from '../../axios';
//own

//hoc
//context
//css

const VotosForm = props => {

	// if on edit mode
	/*const getDetailsFromChild = data => {
		console.log("load to edit", data);
	};*/

	// Controls for show
	/*const ParentComponent = props.isEditing ? Mask : React.Fragment;
	const propsForComponent = props.isEditing
		? { callback: getDetailsFromChild, id: props.id }
		: null;*/

	const [elecciones, setElecciones] = useState();
	const [colegios, setColegios] = useState();
	const [mesas, setMesas] = useState();
	const [partidos, setPartidos] = useState();

	useEffect(() => {
		let tipo_eleccion = props.match.path.replace('/votos', '').replace('es', '');
		tipo_eleccion = tipo_eleccion.charAt(0).toUpperCase() + tipo_eleccion.slice(1);

		axios.get('/elecciones/')
		.then(res => {
			//console.log('elecciones for voto: ', res.data);
			//console.log(tipo_eleccion)
			const afterFilter = res.data.filter(item => item.tipo === tipo_eleccion);
			//console.log('elecciones for voto: ', afterFilter);
			setElecciones([...afterFilter]);

			axios.get('/partidos/')
			.then(res => {
				//console.log('partidos for votos', res.data);
				setPartidos([...res.data]);
			})
			.catch(err => {
				console.log('err getting partidos in votos', err);
			});

		})
		.catch(err => {
			console.log('err getting elecciones in votos', err);
		});
	}, [props.match.path]);

	const onChangeEleccionesHandler = () => {
		axios.get('/colegios/')
		.then(res => {
			const afterFilter = res.data.filter(item => item.id_eleccion === parseInt(watch('id_eleccion')) );
			//console.log('colegios for voto: ', afterFilter);
			setColegios(afterFilter);
		})
		.catch(err => {
			console.log('err getting colegios in votos', err);
		});
	}

	const onChangeColegioHandler = () => {
		axios.get('/mesas/')
		.then(res => {
			const afterFilter = res.data.filter(item => item.id_colegio === parseInt(watch('id_colegio')) );
			//console.log('mesas for voto: ', afterFilter);
			setMesas([...afterFilter]);
		})
		.catch(err => {
			console.log('err getting mesas in votos', err);
		});
	}


	// Forms Validation
	const { register, handleSubmit, errors, watch } = useForm()
	const onSubmitHandler = data => {
		console.log(data);
		axios.post(props.match.path + '/', data)
		.then(res => {
			console.log(props.match.path,'Creating success:', res);
			props.refresh();
			props.handleClose();
		})
		.catch(err => {
			console.log('Creating', err);
			console.log('err response:', err.response);
		})
	}

	return (
		<React.Fragment>
		{ (elecciones && elecciones[0]) && <Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='false'>
			<Form.Group widths="equal">
				<Form.Field required>
					<label> Elecciones </label>
					<select
						name='id_eleccion'
						ref={register({ required: true })}
						onChange={() => onChangeEleccionesHandler()}
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
				<Form.Field required>
					<label> Colegio </label>
					<select
						name='id_colegio'
						ref={register({ required: true })}
						onChange={() => onChangeColegioHandler()}
					>
						<option value=''>--seleccione--</option>
						{
							colegios && colegios.map(item => {
								return <option value={item.id} key={item.id}> {item.direccion} </option>
							})
						}
					</select>
					{ errors.id_colegio && errors.id_colegio.type === 'required' && <Message negative>
						<Message.Header>Debes seleccionar un colegio</Message.Header>
						<p> Para agregar un voto es necesario seleccionar un colegio </p>
					</Message> }
				</Form.Field>
				<Form.Field required>
					<label> Mesa</label>
					<select name='id_mesa' ref={register({ required: true })}>
					<option value=''>--seleccione--</option>
						{
							mesas && mesas.map(item => {
								return <option value={item.id} key={item.id}> {item.letra} </option>
							})
						}
					</select>
					{ errors.id_mesa && errors.id_mesa.type === 'required' && <Message negative>
						<Message.Header>Debes seleccionar una mesa</Message.Header>
						<p> Para agregar un voto es necesario seleccionar una mesa </p>
					</Message> }
				</Form.Field>
			</Form.Group>
			<Form.Group widths="equal">
				<Form.Field required>
					<label> Tipo Voto </label>
					<select name='tipo_voto' ref={register({ required: true })}>
						<option value=''>--Selecciona--</option>
						<option value='0'>Nulo</option>
						<option value='1'>Bueno</option>
					</select>
					{ errors.tipo_voto && errors.tipo_voto.type === 'required' && <Message negative>
						<Message.Header>Debes seleccionar un tipo de voto</Message.Header>
						<p> Para agregar un voto es necesario seleccionar un tipo de voto</p>
					</Message> }
				</Form.Field>
				<Form.Field required>
					<label> Partido </label>
					<select name='siglas' ref={register({ required: true })}>
						<option value=''>--Selecciona--</option>
						{
							partidos && partidos.map(item => {
								return <option value={item.siglas} key={item.siglas}> {item.nombre} </option>
							})
						}
					</select>
					{ errors.siglas && errors.siglas.type === 'required' && <Message negative>
						<Message.Header>Debes seleccionar un partido</Message.Header>
						<p> Para agregar un voto es necesario seleccionar un partido </p>
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
		</Form>}
		</React.Fragment>
	);
};

VotosForm.propTypes = {
	/** id for get details */
	id: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired,
};

export default withRouter(VotosForm);
