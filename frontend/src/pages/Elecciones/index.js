import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import axios from '../../axios';
//own
import Table from '../../components/Tables/EleccionesTable';
import New from '../../components/Forms/_CU';
import ElectionsForms from '../../components/Forms/EleccionesForms';
import Copyright from '../../components/Credits';
import Loader from '../../components/Loader';
import Periods from '../../components/Forms/_Periods';
//hoc
//context
//css

class Elecciones extends React.Component {

	state = {
		all_elecciones: [],
		loading: true,
	}

	loadData = () => {
		this.setState({loading : true});
		axios.get('/elecciones/')
		.then(res => {
			//console.log('getting:', res.data)
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
				<br/>
				<Header size="huge"> Elecciones </Header>
				<Copyright />
				<New message='Crear Nuevas Elecciones' Form={ElectionsForms} refresh={this.loadData}/>
				{/* <Periods newInfo={(newData) => console.log(newData)}/> */}
				<Periods newInfo={(newData) => this.setState({all_elecciones:[...newData]})}/>
				<Table info={this.state.all_elecciones} loadInfo={this.loadData}/>
				{ this.state.loading && <Loader/> }
			</Container>
		);
	}
}

export default Elecciones;