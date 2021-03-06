import React from 'react';
import axios from '../../axios';
import { Header, Container } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/MesasTable';
import New from '../../components/Forms/_CU';
import MesasForms from '../../components/Forms/MesasForms';
import Copyright from '../../components/Credits';
import Loader from '../../components/Loader';
//import Periods from '../../components/Forms/_Periods';
//hoc
//context
//css

class Mesas extends React.Component {

	state = {
		loading : true,
		all_mesas: [],
	}

	loadData = () => {
		this.setState({loading: true});
		axios.get('/mesas/')
		.then(res => {
			this.setState({ loading: false, all_mesas: res.data });
		})
		.catch(err => console.log('get /mesas', err))
	}

	componentDidMount(){
		this.loadData();
	}

	render(){
		return (
			<Container>
				<br/>
				<Header size="huge"> Mesas </Header>
				<Copyright />
				<New message='Agregar Nueva Mesa' Form={MesasForms} refresh={this.loadData}/>
				{/* <Periods newInfo={(newData) => this.setState({all_mesas:[...newData]})}/> */}
				<Table info={this.state.all_mesas} loadInfo={this.loadData}/>
				{ this.state.loading && <Loader/> }
			</Container>
		);
	}
}

export default Mesas;