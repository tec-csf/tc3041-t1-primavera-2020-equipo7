import React from 'react';
import { Header, Container } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/MesasTable';
import New from '../../components/Forms/_CU';
import MesasForms from '../../components/Forms/MesasForms';
import Copyright from '../../components/Credits';
//hoc
//context
//css

const Mesas = () => {

	return (
		<Container>
			<Header size="huge"> Mesas </Header>
			<Copyright />
			<New message='Agregar Nueva Mesa' Form={MesasForms} />
			<Table />
		</Container>
	);
}

export default Mesas;