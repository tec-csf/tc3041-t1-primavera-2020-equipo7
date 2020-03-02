import React from 'react';
import { Header, Container } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/PartidosTable';
import New from '../../components/Forms/_CU';
import ElectionsForms from '../../components/Forms/PartidosForm';
import Copyright from '../../components/Credits';
//hoc
//context
//css

const Elecciones = () => {

	return (
		<Container>
			<Header size="huge"> Partidos </Header>
			<Copyright />
			<New message='Agregar Nuevo Partido' Form={ElectionsForms} />
			<Table />
		</Container>
	);
}

export default Elecciones;