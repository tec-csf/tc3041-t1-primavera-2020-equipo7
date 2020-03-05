import React from 'react';
import { Header, Container } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/ColegiosTables';
import New from '../../components/Forms/_CU';
import CoelgiosForms from '../../components/Forms/ColegiosForm';
import Copyright from '../../components/Credits';
//hoc
//context
//css

const Colegios = () => {

	return (
		<Container>
			<Header size="huge"> Colegios </Header>
			<Copyright />
			<New message='Agregar Nuevo Colegios' Form={CoelgiosForms} />
			<Table />
		</Container>
	);
}

export default Colegios;