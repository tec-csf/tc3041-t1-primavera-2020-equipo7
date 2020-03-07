import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import axios from '../../axios';
//own
import Table from '../../components/Tables/EleccionesTable';
import New from '../../components/Forms/_CU';
import ElectionsForms from '../../components/Forms/EleccionesForms';
import Copyright from '../../components/Credits';
import Loader from '../../components/Loader';
//hoc
//context
//css

class Elecciones extends React.Component {

	state = {
		all_elecciones: [],
		loading: true,
	}

	loadData = () => {

		axios.get('/elecciones/')
		.then(res => {
			this.setState({ loading: false, all_elecciones: res.data });
		})
		.catch(err => console.log('get /elecciones', err))
	}

	componentDidMount() {
		this.loadData();
	}

	render(){
		return (
			<Container>
				<Header size="huge"> Elecciones </Header>
				<Copyright />
				<New message='Crear Nuevas Elecciones' Form={ElectionsForms} refresh={this.loadData}/>
				<Table info={this.state.all_elecciones} loadInfo={this.loadData}/>
				{ this.state.loading && <Loader/> }
			</Container>
		);
	}
}

export default Elecciones;