import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import Table from '../../components/Tables/VotantesTable';
import New from '../../components/Forms/_CU';
import VotantesForms from '../../components/Forms/VotantesForm';
import Copyright from '../../components/Credits';
//hoc
//context
//css

const Votantes = props => {

	const convertTypeToHeader = () => {
		if(props.type === 'vocal'){ return 'Vocales' }
		return props.type.charAt(0).toUpperCase() + props.type.slice(1) + 's';
	}

	return (
		<Container>
			<Header size="huge"> {convertTypeToHeader()} </Header>
			<Copyright />
			<New message={'Agregar un nuevo ' + props.type} Form={VotantesForms} />
			<Table />
		</Container>
	);

}

Votantes.propTypes = {
	/** Para saber que renderar y que formularios mostrar */
	type: PropTypes.oneOf(['votante', 'presidente', 'vocal', 'suplente', 'apoderado']).isRequired,
}

export default Votantes;