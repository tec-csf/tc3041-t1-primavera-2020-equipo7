import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from '../../axios';
//own
import Table from '../../components/Tables/VotantesTable';
import New from '../../components/Forms/_CU';
import VotantesForms from '../../components/Forms/VotantesForm';
import Copyright from '../../components/Credits';
import Loader from '../../components/Loader';
//hoc
//context
//css

class Persona extends React.Component {

	state = {
		all_personas: [],
		loading: true,
	}

	convertTypeToHeader = () => {
		if(this.props.type === 'vocal'){ return 'Vocales' }
		return this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1) + 's';
	}

	convertTypeToQuery = () => {
		if(this.props.type === 'vocal'){ return 'vocales' }
		return this.props.type + 's';
	}

	loadData = () => {
		this.setState({loading : true});
		axios.get('/' + this.convertTypeToQuery() + '/')
		.then(res => {
			console.log(res.data)
			this.setState({ loading: false, all_personas: res.data });
		})
		.catch(err => console.log('get /persona', err))
	}

	shouldComponentUpdate(nextProps) {
		if(this.props.type !== nextProps.type){
			this.loadData();
			return true;
		}

		return false;
	}

	componentDidMount() {
		this.loadData();
	}

	render(){
		return (
			<Container>
				<Header size="huge"> {this.convertTypeToHeader()} </Header>
				<Copyright />
				<New message={'Agregar un nuevo ' + this.props.type} Form={VotantesForms} refresh={this.loadData}/>
				<Table info={this.state.all_personas} loadInfo={this.loadData}/>
				{ this.state.loading && <Loader/> }
			</Container>
		);
	}


}

Persona.propTypes = {
	/** Para saber que renderar y que formularios mostrar */
	type: PropTypes.oneOf(['votante', 'presidente', 'vocal', 'suplente', 'apoderado']).isRequired,
}

export default Persona;