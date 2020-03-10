import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import axios from '../../axios';
//own
import Table from '../../components/Tables/ColegiosTables';
import New from '../../components/Forms/_CU';
import CoelgiosForms from '../../components/Forms/ColegiosForm';
import Copyright from '../../components/Credits';
import Loader from '../../components/Loader';
//import Periods from '../../components/Forms/_Periods';
//hoc
//context
//css

class Colegios extends React.Component {

	state = {
		all_colegios: [],
		loading: true,
	}

	loadData = () => {
		this.setState({loading: true});
		axios.get('/colegios/')
		.then(res => {
			this.setState({ loading: false, all_colegios: res.data });
			//console.log(res.data);
		})
		.catch(err => console.log('get /colegios', err))
	}

	componentDidMount() {
		this.loadData();
	}


	render(){
			return (
			<Container>
				<br/>
				<Header size="huge"> Colegios </Header>
				<Copyright />
				<New message='Agregar Nuevo Colegios' Form={CoelgiosForms} refresh={this.loadData}/>
				{/* <Periods newInfo={(newData) => this.setState({all_colegios:[...newData]})}/> */}
				<Table info={this.state.all_colegios} loadInfo={this.loadData}/>
				{ this.state.loading && <Loader/> }
			</Container>
		);
	}
}

export default Colegios;