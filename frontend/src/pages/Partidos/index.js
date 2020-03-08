import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import axios from '../../axios';
//own
import Table from '../../components/Tables/PartidosTable';
import New from '../../components/Forms/_CU';
import PartidosForms from '../../components/Forms/PartidosForm';
import Copyright from '../../components/Credits';
import Loader from '../../components/Loader';
//hoc
//context
//css

class Partidos extends React.Component {

	state = {
		all_partidos: [],
		loading: true,
	}

	loadData = () => {
		this.setState({loading : true});
		axios.get('/partidos/')
		.then(res => {
			this.setState({ loading: false, all_partidos: res.data });
			console.log(res.data)
		})
		.catch(err => console.log('get /partidos', err))
	}

	componentDidMount() {
		this.loadData();
	}

	render(){
		return (
			<Container>
				<Header size="huge"> Partidos </Header>
				<Copyright />
				<New message='Agregar Nuevo Partido' Form={PartidosForms} refresh={this.loadData}/>
				<Table info={this.state.all_partidos} loadInfo={this.loadData} />
				{ this.state.loading && <Loader/> }
			</Container>
		);
	}
}

export default Partidos;