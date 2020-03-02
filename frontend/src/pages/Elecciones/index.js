import React from 'react';
import { Header, Container } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/EleccionesTable';
import New from '../../components/Forms/_CU';
import ElectionsForms from '../../components/Forms/EleccionesForms';
import Copyright from '../../components/Credits';
//hoc
//context
//css

const Elecciones = () => {

	return (
		<Container>
			<Header size="huge"> Elecciones </Header>
			<Copyright />
			<New message='Crear Nuevas Elecciones' Form={ElectionsForms} />
			<Table />
		</Container>
	);
}

export default Elecciones;