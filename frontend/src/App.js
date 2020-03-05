import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ui
import { Segment, Sidebar, Button, Icon, Container } from 'semantic-ui-react';
// own
import SidebarNav from './components/Sidebar/Sidebar';
// own containers
// -- dashboard
import Dashboard from './pages/Dashboard';
// -- elecciones
import Elecciones from './pages/Elecciones/index';
// -- votos
import Votos from './pages/Votos/index';
// -- votantes
import Votantes from './pages/Votantes/index';
// -- partidos
import Partidos from './pages/Partidos/index';
// -- colegios
import Colegios from './pages/Colegios/index';
// -- mesas
import Mesas from './pages/Mesas/index';
// -- css
import 'react-nice-dates/build/style.css';


const App = () => {

	/** Controla, el **Sidebar** en App */
	const [sideBarIsVisible, setSideBarVisible] = useState(false);
	// tmp usser, will be in react context

	return (
	<Router>
		<Sidebar.Pushable as={Segment} className='full-height'>
			<SidebarNav sideBarStatus={sideBarIsVisible} hideSideBar={() => setSideBarVisible(false)}/>
			<Sidebar.Pusher>
				<Segment basic>
					<Button icon onClick={() => setSideBarVisible(prev => !prev)}>
						<Icon name={sideBarIsVisible ? 'close' : 'bars'} />
					</Button>
						<Switch>
							<Route path='/' exact component={Dashboard}/>

							<Route path='/elecciones' exact component={Elecciones}/>

							<Route path='/votosfederales' exact render={ () => <Votos type='Federales'/> } />

							<Route path='/votosmunicipales' exact render={ () => <Votos type='Municipales'/> } />

							<Route path='/votantes' exact render={() => <Votantes type='votante'/>} />

							<Route path='/partidos' exact component={Partidos} />

							<Route path='/colegios' exact component={Colegios} /> } />

							<Route path='/mesas' exact component={Mesas} />

							<Route path='/presidentes' exact render={() => <Votantes type='presidente'/>} />

							<Route path='/vocales' exact render={() => <Votantes type='vocal'/>} />

							<Route path='/suplentes' exact render={() => <Votantes type='suplente'/>} />

							<Route path='/apoderados' exact render={ () => <Votantes type='apoderado'/> } />
						 */}

							<Route render={ () => <Container>
								<h1> Hmm... creo que en esta URL no hay nada <span role="img" aria-label="whoknows"> 🤷‍♂️️ </span> </h1>
								{setSideBarVisible(true)}
								<h2> <span role='img' aria-label='left'> 👈️ </span> Aqui hay un menú para que no te pierdas </h2>
							</Container> }/>

						</Switch>
				</Segment>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	</Router>
	);
}

export default App;
