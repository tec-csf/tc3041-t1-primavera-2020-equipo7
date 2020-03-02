import React from 'react';
import { Header, Container } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/VotantesTable';
import New from '../../components/Forms/_CU';
import VotantesForms from '../../components/Forms/VotantesForm';
import Copyright from '../../components/Credits';
//hoc
//context
//css

const Votantes = () => {

	return (
		<Container>
			<Header size="huge"> Votantes </Header>
			<Copyright />
			<New message='Agregar un nuevo votante' Form={VotantesForms} />
			<Table />
		</Container>
	);
}

export default Votantes;