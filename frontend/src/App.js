import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ui
import { Segment, Sidebar, Button, Icon } from 'semantic-ui-react';
// own
import SidebarNav from './components/Sidebar/Sidebar';
// own containers
// -- dashboard
import Dashboard from './pages/Dashboard';
// -- elecciones
import Elecciones from './pages/Elecciones/index';
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

							{/* <Route path='/votosfederales' exact render={ () => 0 } />

							<Route path='/votosmunicipales' exact render={ () => 0 } />

							<Route path='/votantes' exact render={ () => 0 } />

							<Route path='/partidos' exact render={ () => 0 } />

							<Route path='/apoderados' exact render={ () => 0 } />

							<Route path='/colegios' exact component={} /> } />

							<Route path='/mesas' exact component={} />

							<Route path='/presidentes' exact component={} />

							<Route path='/vocales' exact component={} />

							<Route path='/suplentes' exact component={} /> */}

							<Route render={ () => <h1> Bad route </h1> }/>
						</Switch>
				</Segment>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	</Router>
	);
}

export default App;
