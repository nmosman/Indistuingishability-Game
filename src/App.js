import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import SplitButton from 'react-bootstrap/SplitButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


//Store the container for rendering our website
const appRoot = document.querySelector('.appRoot');

// Component for main component
//TODO add a common component for all pages
class App extends React.Component {
  render() {
    return (
      <div>
          <div className="App">
     <h2> Indistinguishability game </h2>
      <header className="App-header">

		<Router>
		  <Switch>
		  <Route exact path="/" component = {Home} />
          <Route path="/gamepage" component = {GamePage} />
          <Route path="/settings" component = {Settings} /> 
          <Route path="/info" component = {Info} />

           </Switch>
			</Router>
        {/* Render active Route or indexRoute */}
        {this.props.children}

        </header>
      </div>
      </div>

    );
  }
}	

class GamePage extends React.Component{
 componentWillMount() {
    document.body.classList.add('page-not-found')
  }
  
  componentWillUnmount() {
    document.body.classList.remove('page-not-found');
  }
		render(){
 
		
		return(
			
		 <div >
		 <body>
	
		<Container>
  <Row className="justify-content-md-center">
    <Col><b>Defender</b>
 <p>=============================================== </p>
 <br></br><b> Coin Flip </b>
 <br></br><b> k = (11, 11, 21) </b>
 <br></br><b> b = 0 </b>
 <br></br><b> c = (14,15,9) </b>
    </Col>

    <Col><b>Attacker</b>  <p> =============================== </p>
      <br></br><b> Message 0: (12,34,10) </b>
   <br></br><b> Message 1: (21,05,12) </b>
    <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    </InputGroup.Prepend>
    
  </InputGroup>
  <br></br>
 <Button> Submit your guess </Button>

    </Col>
 
  </Row>

</Container>
</body>
		</div>
		);
	}}


class Settings extends React.Component{
	 componentWillMount() {
    document.body.classList.add('page-not-found')
  }
  
  componentWillUnmount() {
    document.body.classList.remove('page-not-found');
  }
		render(){
 
		
		return(
		 <div className="App">
		<p> Settings! </p>
		</div>
		);
	}
}


class Info extends React.Component{


	 componentWillMount() {
    document.body.classList.add('page-not-found')
  }
  
  componentWillUnmount() {
    document.body.classList.remove('page-not-found');
  }
		render(){
 
		
		return(
		 <div className="App">
		<p> Info Page! </p>
		</div>
		);
	}
}



class Home extends React.Component{
	render(){
return (
    <div className="App">
     <h2> Indistinguishability game </h2>
      <header className="App-header">
      

     
     	 <Link to='/gamepage'>
      	<Button> Start Game </Button>

		</Link>
	


  <p> Select your encrpytion scheme</p>
      <Dropdown title='Encrpytion Scheme'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Encrpytion Scheme
  </Dropdown.Toggle>


  <Dropdown.Menu >
    <Dropdown.Item href="#/action-1">OTP with 1 digit (no carry)</Dropdown.Item>
    <Dropdown.Item href="#/action-2">1 digit with carry</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Custom</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

 <Link to='/settings'>
      	<Button> Game Settings </Button>

		</Link>
		 <Link to='/info'>
      	<Button> Info </Button>

		</Link>
      </header>
      <body>
      Test

      
      </body>
    </div>
  );
}
}

export default App;







