import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { es } from "date-fns/locale";
import { format } from 'date-fns';
import { DatePickerCalendar, useDateInput } from "react-nice-dates";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import { Form, Button, Message, Dimmer, Loader } from "semantic-ui-react";
import axios from '../../axios';
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


	const [elecciones, setElecciones] = useState();
	const [colegios, setColegios] = useState();
	const [mesas, setMesas] = useState();

	//if apoderado
	const [partidos, setPartidos] = useState();

	// if suplente
	const [superiores, setSuperior] = useState();

	//if on create mode, only need to load eleccion info.
	useEffect(() => {

		
		if(!props.isEditing){

			if(type === 'apoderados'){
				axios.get('/partidos/')
				.then(res => {
					setPartidos([...res.data])
					console.log('creating | partidos', res.data);
				})
				.catch(err => {
					console.log('err getting partidos in persona', err);
				})
			}else{
				axios.get('/elecciones/')
				.then(res => {
					setElecciones([...res.data])
					console.log('creating | elecciones', res.data);
				})
				.catch(err => {
					console.log('err getting elecciones in persona', err);
				});
			}

		}
	}, [props.isEditing, type])

	//when eleccion changes
	const onChangeEleccionHandler = () => {
		axios.get('/colegios/')
		.then(res => {
			//console.log(res.data)
			const afterFilter = res.data.filter(item => item.id_eleccion === parseInt(watch('id_eleccion')) )
			console.log('after filter: colegios ', afterFilter)
			setColegios([...afterFilter])
		})
		.catch(err => {
			console.log('err getting elecciones in persona', err);
		});
	}

	//when colegio changes
	const onChangeColegioHandler = () => {
		axios.get('/mesas/')
		.then(res => {
			const afterFilter = res.data.filter(item => item.id_colegio === parseInt(watch('id_colegio')) );
			console.log('after filter: mesas', afterFilter);
			setMesas([...afterFilter]);
		})
		.catch(err => {
			console.log('err getting mesas in persona', err);
		});
	}

	//when change mesa and is suplente
	const onChangeMesaHandler = () => {
		if(type === 'suplentes'){
			axios.get('/presidentes/')
			.then(res => {
				const afterFilterPresidente = res.data.filter(item => item.id_mesa === parseInt(watch('id_mesa')) );
				console.log('after filter: presidentes', afterFilterPresidente);
				axios.get('/vocales/')
				.then(res => {
					const afterFilterSuplente = res.data.filter(item => item.id_mesa === parseInt(watch('id_mesa')) );
					console.log('after filter: vocales', afterFilterSuplente);
					setSuperior([...afterFilterPresidente, ...afterFilterSuplente]);
				})
				.catch(err => {
					console.log('err getting presidentes in persona', err);
				});
			})
			.catch(err => {
				console.log('err getting presidentes in persona', err);
			});
		}
	}

	// if on edit mode
	const [persona, setPersona] = useState();
	const getDetailsFromChild = data => {

		console.log('getting: ', data)

		setPersona(data[0]);
		console.log("editing", data[0]);
		setDateBorn(new Date(data[0].fecha_nac.replace('00:00:00 GMT', '')));
		setStartDate(new Date(data[0].fecha_inicio.replace('00:00:00 GMT', '')));

		//get elecciones, colegios, mesas and partidos
		if(type === 'apoderados'){
			axios.get('/partidos/')
			.then(res => {
				setPartidos([...res.data])
				console.log('editing | partidos', res.data);
			})
			.catch(err => {
				console.log('err getting partidos in persona', err);
			})
		}else{
			axios.get('/elecciones/') 
			.then(res => {
				setElecciones([...res.data]);
				console.log('editing elecciones: ', res.data);
				axios.get('/colegios/')
				.then(res => {
					//console.log(res.data)
					const afterFilter = res.data.filter(item => item.id_eleccion === data[0].id_eleccion )
					console.log('after filter: colegios ', afterFilter)
					setColegios([...afterFilter]);
					axios.get('/mesas/')
					.then(res => {
						const afterFilter = res.data.filter(item => item.id_colegio === data[0].id_colegio );
						console.log('after filter: mesas', afterFilter);
						setMesas([...afterFilter]);
						if(type === 'suplentes'){
							console.log('buscando por mesa', data[0].id_mesa)
							axios.get('/presidentes/')
							.then(res => {
								const afterFilterPresidente = res.data.filter(item => item.id_mesa === data[0].id_mesa );
								console.log('after filter: presidentes', afterFilterPresidente);
								axios.get('/vocales/')
								.then(res => {
									const afterFilterSuplente = res.data.filter(item => item.id_mesa === data[0].id_mesa );
									console.log('after filter: vocales', afterFilterSuplente);
									setSuperior([...afterFilterPresidente, ...afterFilterSuplente]);
								})
								.catch(err => {
									console.log('err getting presidentes in persona', err);
								});
							})
							.catch(err => {
								console.log('err getting presidentes in persona', err);
							});
						}
					})
					.catch(err => {
						console.log('err getting mesas in persona', err);
					});
				})
				.catch(err => {
					console.log('err getting elecciones in persona', err);
				});
			})
			.catch(err => {
				console.log('err getting elecciones in persona', err);
			});
		} // del else
	}; //de la funcion

	// Controls for show
	const ParentComponent = props.isEditing ? Mask : React.Fragment;
	const propsForComponent = props.isEditing
		? { callback: getDetailsFromChild, id: props.id }
		: null;

	// Forms Validation
	const { register, handleSubmit, errors, watch } = useForm()
	const onSubmitHandler = data => {

		if(type !== 'apoderados'){
			setIsValidDate(startDate);
			if (!(startDate)) return;
		}

		setValidBornDate(dateBorn);
		if( !(dateBorn) ) return;

		let info_send;
		if(type === 'apoderados'){
			info_send = {...data, "fecha_nac" : dateBorn}
		}else{
			info_send = {...data, "fecha_inicio" : startDate, "fecha_nac" : dateBorn}
		}

		console.log('posting: ', props.match.path + '/' + (props.isEditing ? props.id + '/' : ''), info_send)

		axios.post(props.match.path + '/' + (props.isEditing ? props.id + '/' : ''), info_send)
		.then(res => {
			console.log(props.isEditing ? 'Updating' : 'Creating' ,' success:', res);
			props.refresh();
			props.handleClose();
		})
		.catch(err => {
			console.log(props.isEditing ? 'Updating' : 'Creating' , err);
			console.log('err response:', err.response);
		})

		//console.log(data, startDate, dateBorn, type);
	}
	
	return (
		<ParentComponent {...propsForComponent}>
			{
			(
				(!props.isEditing) ||
				(persona && persona.id &&
					(
						(type === 'apoderados' && partidos && partidos[0].siglas) ||
						((type === 'votantes' || type === 'presidentes' || type === 'vocales') && mesas && mesas[0] && elecciones && elecciones[0] && colegios && colegios[0]) ||
						(type === 'suplentes' && mesas && mesas[0] && elecciones && elecciones[0] && colegios && colegios[0] && superiores )
					)
				)
			) ?
			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='off'>
				{ type !== 'apoderados' && <Form.Group widths="equal">
					<Form.Field required>
						<label> Elecciones </label>
								<select
								name='id_eleccion'
								ref={register({ required: true })}
								defaultValue={ (props.isEditing && persona) && persona.id_eleccion ? persona.id_eleccion : null }
								onChange={() => onChangeEleccionHandler()}
								>
									<option value=''>--seleccione--</option>
									{
										elecciones && elecciones.map(item => {
											return <option value={item.id} key={item.id}> {item.descripcion} </option>
										})
									}
								</select>
							{ errors.id_eleccion && errors.id_eleccion.type === 'required' && <Message negative>
								<Message.Header>Son necesarias las elecciones</Message.Header>
							</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Colegio </label>
								<select
								name='id_colegio'
								ref={register({ required: true })}
								defaultValue={ (props.isEditing && persona) && persona.id_colegio ? persona.id_colegio : null }
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
								<Message.Header>Es necesario seleccionar un colegio</Message.Header>
							</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Mesa</label>
						<select
							name='id_mesa'
							ref={register({ required: true })}
							defaultValue={persona && persona.id_mesa ? persona.id_mesa : null}
							onChange={() => onChangeMesaHandler()}
						>
						<option value=''>--seleccione--</option>
							{
								mesas && mesas.map(item => {
									return <option value={item.id} key={item.id}> {item.letra} </option>
								})
							}
						</select>
						{ errors.id_mesa && errors.id_mesa.type === 'required' && <Message negative>
							<Message.Header>Debes seleccionar una mesa</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>}
				<Form.Group widths='equal'>
					<Form.Field required >
						<label> Nombre Completo </label>
						<input
							type='text'
							name='nombre'
							ref={ register({ required: true }) }
							defaultValue={persona && persona.nombre ? persona.nombre : null}
						/>
						{ errors.nombre && errors.nombre.type === 'required' && <Message negative>
							<Message.Header>Se debe proporcionar un nombre</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Fecha de nacimiento </label>
						<p>Fecha nacimiento: {dateBorn && format(dateBorn, 'dd MMM yyyy', { locale: es })}</p>
						<input className='input' {...inputProps} />
						{/* <DatePickerCalendar date={dateBorn} onDateChange={setDateBorn} locale={es} /> */}
						{ (!isValidDateBorn && !(dateBorn)) 
							&& <Message negative>
							<Message.Header>Ingrese la fecha de nacimiento</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Field required>
						<label> IFE/Pasaporte </label>
						<input
							type='text'
							name='id'
							ref={ register({ required: true })}
							defaultValue={persona && persona.id ? persona.id : null}
						/>
						{ errors.id && errors.id.type === 'required' && <Message negative>
							<Message.Header>Se debe proporcionar el IFE o Pasaporte</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field required>
						<label> Dirección </label>
						<input
							type='text'
							name='direccion'
							ref={ register({ required: true })}
							defaultValue={persona && persona.direccion ? persona.direccion : null}
						/>
						{ errors.direccion && errors.direccion.type === 'required' && <Message negative>
							<Message.Header>Se debe proporcionar una dirección</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>
					{ type === 'votantes' && <Form.Field>
						<label> Extranjero </label>
						<input
							type='checkbox'
							name='es_extranjero'
							ref={register()}
							defaultChecked={persona && !persona.tipo === 1 ? true : false}
						/>
					</Form.Field> }
					{ type === 'suplentes' && <Form.Field>
						<label> Superior </label>
						<select
							name='superior'
							ref={register({ required: true })}
							defaultValue={persona && persona.id_superior ? persona.id_superior : null}
						>
							<option value=''>--seleccione--</option>
							{
								superiores && superiores[0] && superiores.map(item => {
									return <option value={item.id} key={item.id}> {item.nombre} </option>
								})
							}
						</select>
						{ errors.superior && errors.superior.type === 'required' && <Message negative>
							<Message.Header>El suplente debe tener un superior</Message.Header>
						</Message> }
					</Form.Field> }
				
				{ type === 'apoderados' && <Form.Group>
					<Form.Field>
						<label> Siglas </label>
						<select name='siglas' ref={register({ required: true })} defaultValue={persona && persona.siglas ? persona.siglas : null} >
							<option value=''>--seleccione--</option>
							{
								partidos && partidos.map(item => {
									return <option value={item.siglas} key={item.siglas}> {item.siglas} </option>
								})
							}
						</select>
						{ errors.siglas && errors.siglas.type === 'required' && <Message negative>
							<Message.Header>El apoderado debe pertenecer a un partido</Message.Header>
						</Message> }
					</Form.Field>
					<Form.Field>
						<label> Orden </label>
						<select name='orden' ref={register({ required: true })} defaultValue={persona && persona.orden ? persona.orden : null} >
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
				{type !== 'apoderados' && <Form.Group widths='equal'>
					<Form.Field required>
						<label> Periodo </label>
						<p>
							Fecha de inicio: {startDate ? format(startDate, 'dd MMM yyyy', { locale: es }) : '---'}
						</p>
						{ props.isEditing ?
							<React.Fragment>
							<p> Fecha fin: {persona.fecha_final.replace('00:00:00 GMT', '')} </p>
							<i> (si se modifica la de fecha de inicio esta se actualizará) </i>
							</React.Fragment> 
							: <i>La fecha de fin es +10 años</i>
						}
						<DatePickerCalendar date={startDate} onDateChange={setStartDate} locale={es} minimunDate={new Date()}/>
						{ (!isValidDate && !(startDate)) 
							&& <Message negative>
							<Message.Header>Seleccione un periodo válido</Message.Header>
						</Message> }
					</Form.Field>
				</Form.Group>}
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
			</Form>  : <Dimmer active> <Loader /> </Dimmer>}
		</ParentComponent>
	);
};

VotantesForm.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
};

export default withRouter(VotantesForm);
