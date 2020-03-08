import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from '../../axios';
//own
import Table from '../../components/Tables/VotosTable';
import New from '../../components/Forms/_CU';
import VotosForms from '../../components/Forms/VotosForm';
import Copyright from '../../components/Credits';
import Loader from '../../components/Loader';

//hoc
//context
//css

class Votos extends React.Component {

	state = {
		all_votos: [],
		loading: true,
	}

	loadData = () => {
		this.setState({loading : true});
		//console.log('/votos' + this.props.type.toLowerCase() + '/');
		axios.get('/votos' + this.props.type.toLowerCase() + '/')
		.then(res => {
			//console.log(res.data)
			this.setState({ loading: false, all_votos: res.data });
		})
		.catch(err => {
			console.log('get /votos' + this.props.type, err)
			this.setState({ loading: false, all_votos: [] });
		});
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps){
		if(prevProps.type !== this.props.type){
			this.loadData();
		}
	}

	render(){
		return (
			<Container>
				<Header size="huge"> Votos {this.props.type} </Header>
				<Copyright />
				<New message='Agregar Nuevo Voto' Form={VotosForms} refresh={this.loadData}/>
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