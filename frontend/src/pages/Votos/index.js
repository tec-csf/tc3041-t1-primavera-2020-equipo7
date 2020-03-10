import React from 'react';
import { Header, Container, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from '../../axios';
//own
import Table from '../../components/Tables/VotosTable';
import New from '../../components/Forms/_CU';
import VotosForms from '../../components/Forms/VotosForm';
import Copyright from '../../components/Credits';
import Loader from '../../components/Loader';
import Periods from '../../components/Forms/_Periods';
import ChartistGraph from 'react-chartist';

//hoc
//context
//css

class Votos extends React.Component {

	state = {
		all_votos: [],
		loading: true,
		elecciones: [],
		colegios: [],
		data : {
			//labels: ['Bananas', 'Apples', 'Grapes'],
			//series: [20, 15, 40]
		},
		options : {
			labelInterpolationFnc: function(value) {
				return value[0]
			}
		},
		responsiveOptions : [
			['screen and (min-width: 640px)', {
				chartPadding: 30,
				labelOffset: 100,
				labelDirection: 'explode',
				labelInterpolationFnc: function(value) {
					return value;
				}
			}],
			['screen and (min-width: 1024px)', {
				labelOffset: 80,
				chartPadding: 20
			}]
		]
		
	}

	loadData = () => {
		this.setState({loading : true});
		//console.log('/votos' + this.props.type.toLowerCase() + '/');
		axios.get('/votos' + this.props.type.toLowerCase() + '/')
		.then(res => {
			console.log('getting', res.data)
			this.setState({ loading: false, all_votos: [...res.data] });
		})
		.catch(err => {
			console.log('get /votos' + this.props.type, err)
			this.setState({ loading: false, all_votos: [] });
		});
	}

	componentDidMount() {
		this.loadData();
		axios.get('/elecciones/')
			.then(res => {
				//console.log('for graph all:', res.data)
				const type_search = this.props.type === 'Municipales' ? 'Municipal' : 'Federal'
				const afterFilter = res.data.filter(item => item.tipo === type_search )

				this.setState({elecciones: [...afterFilter]})
				console.log('for grpah after filter', afterFilter);
			})
			.catch(err => {
				console.log('err getting elecciones in voto', err);
			});
	}

	componentDidUpdate(prevProps){
		if(prevProps.type !== this.props.type){
			this.loadData();
		}
	}

	changeEleccionesHandler = (e) => {
		//console.log('buscando a', e.target.value)
		const idEleccion = e.target.value;
		axios.get('/colegios/')
		.then(res => {
			//console.log('buscando a', idEleccion, res.data)
			const afterFilter = res.data.filter(item => item.id_eleccion === parseInt(idEleccion ))
			this.setState({colegios: [...afterFilter]})
			console.log('for grpah after filter', afterFilter);
		}).catch(err => {
			console.log('err colegios in voto', err);
		});
	}

	//ver todos los votos
	changeColegioHandler = (e) => {
		const idColegio = e.target.value;

		axios.get('/votos' + this.props.type.toLowerCase() + '/')
		.then(res => {
			///console.log('getting', res.data)
			const afterFilter = res.data.filter(item => item.id_colegio === parseInt(idColegio));
			this.setState({all_votos: [...afterFilter]});
			//console.log('after filter votos', afterFilter);
			const conteo = {}
			afterFilter.forEach(element => {
				//console.log('actual', conteo[element.siglas])
				conteo[element.siglas] = conteo[element.siglas] ? conteo[element.siglas] + 1 : 1
			});
			//console.log('conteo', conteo)
			//console.log(Object.keys(conteo))
			//console.log(Object.values(conteo))
			this.setState({data : {
				labels: Object.keys(conteo),
				series: Object.values(conteo)
			},});
		})
		.catch(err => {
			console.log('get /votos' + this.props.type, err)
		});

	}

	render(){
		return (
			<Container>
				<br/>
				<Header size="huge"> Votos {this.props.type} </Header>
				<Copyright />
				<New message='Agregar Nuevo Voto' Form={VotosForms} refresh={this.loadData}/>
				<Periods newInfo={(newData) => this.setState({all_votos:[...newData]})}/>
				<Form>
				<Form.Field width='5'>
					<label> Elecciones </label>
						<select
							name='graph'
							onChange={(e) => {this.changeEleccionesHandler(e)}}
						>
							<option value=''>--seleccione--</option>
							{
								this.state.elecciones && this.state.elecciones.map(item => {
									return <option value={item.id} key={item.id}> {item.descripcion} </option>
								})
							}
						</select>
				</Form.Field>
				<Form.Field width='5'>
					<label> Colegios </label>
						<select
							name='graph2'
							onChange={(e) => {this.changeColegioHandler(e)}}
						>
							<option value=''>--seleccione--</option>
							{
								this.state.colegios && this.state.colegios.map(item => {
									return <option value={item.id} key={item.id}> {item.direccion} </option>
								})
							}
						</select>
				</Form.Field>
				</Form>
				<ChartistGraph
					style={{height: '400px'}}
					data={this.state.data}
					options={this.state.options}
					type='Pie'
					responsiveOptions={this.state.responsiveOptions}
				/>
				<Table info={this.state.all_votos} loadInfo={this.loadData}/>
				{ this.state.loading && <Loader/> }
			</Container>
		);
	}
}

Votos.propTypes = {
	/** Tipo de votos */
	type: PropTypes.oneOf(['Federales', 'Municipales']).isRequired,
}

export default Votos;