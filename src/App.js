import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import SplitButton from 'react-bootstrap/SplitButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


	

function App() {
  return (
    <div className="App">
     <h2> Indistinguishability game </h2>
      <header className="App-header">
      

      	<Router>
     	 <Link to='/GamePage'>
      	<Button> Start Game </Button>

		</Link>



		  <Switch>
          <Route path="/GamePage">
            <GamePage />
            </Route>
            </Switch>
			</Router>
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


      </header>
      <body>
      Test

      
      </body>
    </div>
  );
}

export default App;
class GamePage extends React.Component{
 componentWillMount() {
    document.body.classList.add('page-not-found')
  }
  
  componentWillUnmount() {
    document.body.classList.remove('page-not-found');
  }
		render(){
 
		
		return(
		<p> Game time! </p>
		);
	}}

class Home extends React.Component{
render(){
	return(

 <div className="App">
     <h2> Indistinguishability game </h2>
      <header className="App-header">
      

      	<Router>
     	 <Link to='/GamePage'>
      	<Button> Start Game </Button>

		</Link>



		  <Switch>
          <Route path="/GamePage">
            <GamePage />
            </Route>
            </Switch>
			</Router>

      <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>


      </header>
      <body>
      Test

      
      </body>
    </div>
	);
}


}