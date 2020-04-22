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


var key = generate_key(2,1)
var msgs = [generate_key(2,1), generate_key(2,1)] 
var coinRes = flipCoin()


//Store the container for rendering our website
const appRoot = document.querySelector('.appRoot');

function refreshPage(){ 
    window.location.reload(); 
}

// Component for main component

//Show answers once guess is submitted
function showAnswers() {
  document.querySelector("#k").className = ".spoiled"
  document.querySelector("#b").className = ".spoiled"

}
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
 <br></br><b> k = <span className="spoiler" id="k"> {formatKey(key)} </span> </b>
 <br></br><b> b = <span className="spoiler" id="b"> {coinRes} </span></b>
 <br></br><b> c = {formatKey(perform_op(key, msgs[coinRes], "*", 1))} </b>
    </Col>

    <Col><b>Attacker</b>  <p> =============================== </p>
      <br></br><b> Message 0: {formatKey(msgs[0]) } </b>
   <br></br><b> Message 1: {formatKey(msgs[1]) }  </b>
    <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    </InputGroup.Prepend>
    
  </InputGroup>
  <br></br>
 <Button onClick={showAnswers}> Submit your guess </Button>
 <Link to='/gamepage'>
		<Button onClick={refreshPage}> New Game </Button>
 </Link>
 <Link to='/'>
 <Button> Home </Button>
 </Link>

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

function generate_key(length, digits = 1){
    var numbers = []
    var i;
    for(i = 0; i < length; i++){
    	numbers.push(Math.floor(Math.random()*Math.pow(10,digits)))
      console.log(numbers)
    }
  
    return(numbers)
}


function formatKey(key){
	var resString = "("
	 for(var i = 0; i < key.length; i++){
	  if(i == key.length - 1) 
	  {
		  resString += key[i] + ")"
	  }else{
		  resString += "" + key[i] + ","
	  }
    }
	return resString 
}


function flipCoin(){
	var res = Math.round(Math.random())
	return res
	
}

// Perform encrpytion scheme based on given operation and carry flag 
function perform_op(key, message, op, carry = 0){
  
    var res = [];
    var i; 
    for(i = 0; i < key.length; i++){
     
          if(op == "+"){
         
            var result = key[i] + message[i]
	
            if(carry){
                result = result % 10 
            }
            res.push(result)
           }
	        else if(op == "-"){
	            result = key[i] - message[i]
            		if(carry){
                	result = result % 10 
                	}
            	res.push(result)
            }
        	else if(op == "*"){
            	result = key[i] * message[i]
            	if(carry) {
                	result = result % 10 
            	}
            	res.push(result)
        	}
        	
        }
    var resString = "("
    for(i = 0; i < key.length; i++){
	  if(i == key.length - 1) 
	  {
		  resString += res[i] + ")"
	  }else{
		  resString += "" + res[i] + ","
		
	  }
	}

	
    return res 
  }


