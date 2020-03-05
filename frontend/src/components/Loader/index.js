import React from 'react';
import { Container } from 'semantic-ui-react';

const Loader = () => <Container textAlign='center'>
		<div className='lds-facebook'>
			<div></div><div></div><div></div>
		</div>
	</Container>

export default Loader;