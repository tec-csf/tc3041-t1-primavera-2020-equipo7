import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Esta la barra lateral, la cual contiene las distintas opciones
 * por las cuales debe navegar el usuario por lo que es dinámico.
*/

const SidebarNav = props => {
	return (
			<Sidebar
				as={Menu}
				animation='push'
				icon='labeled'
				inverted
				onHide={() => props.hideSideBar()}
				vertical
				visible={props.sideBarStatus}
				width='thin'
			>
				<Menu.Item as={NavLink} to="/" exact>
					<Icon name='line graph' /> Inicio
				</Menu.Item>
				<Menu.Item as={NavLink} to="/elecciones" exact>
					<Icon name='check square' /> Elecciones
				</Menu.Item>
				<Menu.Item as={NavLink} to="/votosfederales" exact>
					<Icon name='box' /> Votos Federales
				</Menu.Item>
				<Menu.Item as={NavLink} to="/votosmunicipales" exact>
					<Icon name='box' /> Votos Municipal
				</Menu.Item>
				<Menu.Item as={NavLink} to="/votantes" exact>
					<Icon name='address card' /> Votantes
				</Menu.Item>
				<Menu.Item as={NavLink} to="/partidos" exact>
					<Icon name='users' /> Partidos
				</Menu.Item>
				<Menu.Item as={NavLink} to="/apoderados" exact>
					<Icon name='user circle outline' /> Apoderados
				</Menu.Item>
				<Menu.Item as={NavLink} to="/colegios" exact>
					<Icon name='university' /> Colegio
				</Menu.Item>
				<Menu.Item as={NavLink} to="/mesas" exact>
					<Icon name='table' /> Mesas
				</Menu.Item>
				<Menu.Item as={NavLink} to="/presidentes" exact>
					<Icon name='black tie' inverted/> Presidentes
				</Menu.Item>
				<Menu.Item as={NavLink} to="/vocales">
					<Icon name='user' /> Vocales
				</Menu.Item>
				<Menu.Item as={NavLink} to="/suplentes">
					<Icon name='user outline' /> Suplentes
				</Menu.Item>
			</Sidebar>
	)
}

SidebarNav.propTypes = {
	/**
	 * Checa si debe abrirse y cerrarse, también debe pasarse a la TopNav
	 * y la app lo controla para saber si aplicar el dimmer
	*/
	sideBarStatus : PropTypes.bool.isRequired,
}

export default SidebarNav;
