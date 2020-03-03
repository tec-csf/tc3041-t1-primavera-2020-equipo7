import React from 'react';
import { Header, Container } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/VotosTable';
import New from '../../components/Forms/_CU';
import VotosForms from '../../components/Forms/VotosForm';
import Copyright from '../../components/Credits';
//hoc
//context
//css

const Votos = props => {

	return (
		<Container>
			<Header size="huge"> Votos {props.type} </Header>
			<Copyright />
			<New message='Agregar Nuevo Voto' Form={VotosForms} />
			<Table />
		</Container>
	);
}

export default Votos;