import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import SplitButton from 'react-bootstrap/SplitButton'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const RawHTML = (props) => <span dangerouslySetInnerHTML={{__html: props.html}}></span>;
var key = generate_key(2,1)
var msgs = [generate_key(2,1), generate_key(2,1)] 

var selectedGame = 1;



//global game states (kinda bad practice here but will be refactored in the near future)
var score;
var current_round = 1;
var rounds = 1;
var wins = 0;
var guess = -999;
var coinRes = flipCoin()
var inputMsgs = []
var cipherText = ""

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

function hideAnswers() {
  document.querySelector("#k").className = ".spoiler"
  document.querySelector("#b").className = ".spoiler"

}

function submitButton () {
  showAnswers();
}
//TODO add a common component for all pages
class App extends React.Component {
	constructor(props){
	super(props);
	var handleToUpdate = this.handleToUpdate.bind(this)
	this.state = {
		//defaults 
		//for game types 
		//1 - Scheme 1 - Addition with two digits and no carry 
		//2 - Scheme 2 - Addition with two digits and carry 
		//3
		//4 - Custom defined rule set 
			num_of_rounds: 5,
			game_type: 1,
			carry: 0,
			digits: 2,
			keyLength: 3,
			op: "+",
			scheme: "Scheme 1"
			
	};
}

handleToUpdate(state){
		this.setState(state)
}
  render() {
	  var handleToUpdate = this.handleToUpdate;
    return (
      <div>
          <div className="App">
     <h2> Indistinguishability game </h2>
	
      <header className="App-header">


		<Router basename="/">
		  <Switch>
		  <Route exact path="/" render={props =>  (<Home {...props} state ={this.state} handleToUpdate = {handleToUpdate.bind(this)} />) } />
          <Route path="/gamepage"  render={props =>  (<GamePage {...props} state ={this.state} handleToUpdate = {handleToUpdate.bind(this)} />) }/>
          <Route path="/settings" render={props =>  (<Settings {...props} state ={this.state} handleToUpdate = {handleToUpdate.bind(this)} />) }/>
          <Route path="/info" component = {Info} />
		  <Route path="/quiz" component = {Quiz} /> 

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
function getGameType(gameType, state){
	var rulesText = "Default rules";
	switch(gameType){
		case "Scheme 1":
			rulesText = " This is 1 digit with no carry";
			break;
		case "Scheme 2":
			rulesText = " This is Scheme 2";
			break;
		case "Scheme 3":
			 rulesText = " This is Scheme 3";
			break;
		case "Scheme 4":
			rulesText = " This is Scheme 4";
			break;
		case "Custom Scheme":
			rulesText = "<b>This is a Custom Scheme</b><br>";
			rulesText += "<small>From the user defined inputs, we have the following rules:<br>";
			rulesText += "Number of Rounds: " + state.num_of_rounds + " <br> ";
			rulesText += "Number of Digits in Keys/Messages: " + state.digits + " <br> ";
			rulesText += "<small>Number of Elements per Key/Message: " + state.keyLength + " <br> ";
			rulesText += "<small>Arithmetic Operation for Encryption Scheme: " + state.op + " <br> ";
			rulesText += "Carry for Addition: " + state.carry + " </small><br> ";
			break;
		
	}
	
	return rulesText;
}
class GamePage extends React.Component{
constructor(props){
	super(props);
	this.submitGuess = this.submitGuess.bind(this) 
	this.changeGuess = this.changeGuess.bind(this) 
	this.submitMessages = this.submitMessages.bind(this)
	this.updateMessages = this.updateMessages.bind(this)
	this.isValidMessage = this.isValidMessage.bind(this)
	this.refreshGame = this.refreshGame.bind(this)
	
	rounds = this.props.state.num_of_rounds
	
	this.state = {
			msg0: "",
			msg1: "",
			selectedMsg: "",
			current_round: 1,
			wins: 0,
			guess: -999,
			b: flipCoin(), 
			c: "",
			warningText: "",
			key: "",
			buttonText : "Next Round"
			
	}
	
	switch(this.props.state.scheme){
			 	case "Scheme 1":
					this.state.keyLength = 2;
					this.state.digits = 1;
					this.state.op = "+";
					this.state.carry = 1;
					break;
				case "Scheme 2":
					this.state.keyLength = 3;
					this.state.digits = 1;
					this.state.op = "+";
					this.state.carry = 0;
					break;
				case "Scheme 3":
					this.state.keyLength = 5;
					this.state.digits = 2;
					this.state.op = "+";
					this.state.carry = 1;
					break;
				case "Scheme 4":
				
					this.state.keyLength = 7;
					this.state.digits = 2;
					this.state.op = "+";
					this.state.carry = 0;
					
					break;
				case "Custom Scheme":
					this.state.keyLength = this.props.state.keyLength;  
					this.state.rounds = this.props.state.rounds;
					this.state.digits = this.props.state.digits;
					this.state.carry = this.props.state.carry;
					this.state.op = this.props.state.op 
			 }
	
	this.state.key = generate_key(this.state.keyLength, this.state.digits)
	

	console.log(this.state)
}
refreshGame(){ 
	if(this.state.buttonText == "New Game"){
		this.state.buttonText = "Next Round";
	}

	
	
	this.state.current_round +=1;
	current_round += 1;
	if(current_round > rounds){
		alert("You have won " + this.state.wins + " out of " + this.state.num_of_rounds + "!");
		this.state.current_round = 1
		this.state.wins = 0
		this.state.buttonText = "New Game"
		wins = 0;
		current_round = 1
		
	}
	else{
		hideAnswers()
		this.state.key = generate_key(this.state.keyLength, this.state.digits)
		this.state.b = flipCoin()
		this.state.c = "" 
		this.refs.m1.value = ""
		this.refs.m2.value = ""
		this.refs.kk.style.color = "black"
		this.refs.kk.style.background = "black"
		this.refs.bb.style.color = "black"
		this.refs.bb.style.background = "black"
	}
	    
}

async submitMessages(e){

	var msg0 = this.state.msg0;
	var msg1 = this.state.msg1;
	var msg_list = [msg0, msg1]
	if(!this.isValidMessage(msg0) || !this.isValidMessage(msg1)){
		this.state.warningText = "Both messages must have lengths of " + this.state.keyLength + " and be " + this.state.digits + "-digit numbers ";	
		await this.setState({c: ""})
		
	
	}
	else{
		await this.setState({ c: "<br></br><b> Defender's Cipher Text: </b> " + formatKey(perform_op(this.state.key, msg_list[this.state.b], this.state.op, this.state.digits)) + " " });
	
		console.log(this.state)
		
	}
	
}

isValidMessage(msg){
	var digits;
	//TODO need more validating 
	if(msg.length != this.state.keyLength)
	{
		return false;
	}
	
	for (var i = 0; i < msg.length; i++) { 
		
		digits = "" + msg[i];
		if(digits.length > this.state.digits){
			return false;
		}
	} 
	
	return true;
}
async updateMessages(e){
		var msg = e.target.value.split`,`.map(x=>+x)
		await this.setState({[e.target.name]: e.target.value.split`,`.map(x=>+x)})
		if(!this.isValidMessage(msg))
		{
			this.state.warningText = "Both messages must have lengths of " + this.state.keyLength + " and be " + this.state.digits + "-digit numbers "
		}
			
		
		else{
			this.state.warningText = ""
		}
		console.log(this.isValidMessage(msg))
		
}

submitGuess(e){
		
		alert("Your guess is: " + this.state.guess)
		if(this.state.guess == this.state.b){
			alert("You've guessed correctly, great work!")
			this.state.wins += 1
		}else{
			alert("Incorrect guess. :(")  
		}
		this.refs.kk.style.color = "black"
		this.refs.kk.style.background = "white"
		
		this.refs.bb.style.color = "black"
		this.refs.bb.style.background = "white"
		showAnswers();

		
 }
 
 async changeGuess(e){
	 
	 //do some logic to check if guess valid
	 await this.setState({guess : e.target.value})
	 
 }
 componentWillMount() {
	 
	 this.setState(this.props.state)
	 console.log("in gamepage")
	
	
	 
	 var handleToUpdate = this.props.handleToUpdate;
	 handleToUpdate(this.props.state)
	 
	
  }

  
  componentWillUnmount() {

  }
		render(){
		var keyLength;
		var digits;
		var op;
		var carry;
		var rounds;
		
		// Check scheme to see which rules we are dealing with 
		 switch(this.state.scheme){
			 	case "Scheme 1":
					this.state.keyLength = 2;
					this.state.digits = 1;
					this.state.op = "+";
					this.state.carry = 1;
					break;
				case "Scheme 2":
					this.state.keyLength = 3;
					this.state.digits = 1;
					this.state.op = "+";
					this.state.carry = 0;
					break;
				case "Scheme 3":
					this.state.keyLength = 5;
					this.state.digits = 2;
					this.state.op = "+";
					this.state.carry = 1;
					break;
				case "Scheme 4":
					keyLength = 7;
					this.state.keyLength = keyLength;
					
					digits = 2;
					this.state.digits = digits;
					
					op = "+";
					this.state.op = op;
					
					carry = 0;
					this.state.carry = carry;
					
					break;
				case "Custom Scheme":
					keyLength =  this.state.keyLength;
					rounds = this.state.rounds;
					digits = this.state.digits;
					carry = this.state.carry;
					op = this.state.op 
			 }
		
		keyLength =  this.state.keyLength;
		rounds = this.state.num_of_rounds;
		digits = this.state.digits;
		carry = this.state.carry;
		op = this.state.op 
		
		console.log(this.state)
	
		
		var carryText;
		
		switch(this.props.state.carry)
		{
			case 0:
				carryText = " Yes for addition"
				break;
			case 1:
				carryText = " Carry ignored"
				break;
		}
		
		var ciphertext = this.state.c;
		var	rulesText =  "<b>Scheme: " + this.state.scheme + " </b><br/>"
		rulesText += "<small><small>Number of Rounds: " + rounds + " <br/> ";
		rulesText += "Number of Digits in Keys/Messages: " + digits + " <br/> ";
		rulesText += "Number of Elements per Key/Message: " + keyLength + " <br/> ";
		rulesText += "Arithmetic Operation for Encryption Scheme: " + op + " <br/> ";
		rulesText += "Carry for Addition: " + carryText + " </small></small><br/> ";
		return(
			
		 <div >
		<br></br>
	
			
		<p><div class="Info"  dangerouslySetInnerHTML ={{__html: rulesText}}/> </p><br></br>
		 <body class="Game-Border">
	
		<Container fluid><small>Current Round: {current_round} / {rounds} </small> <br/><small>Wins: {this.state.wins} </small><hr/>
  <Row >
    <Col xs={6}><b>Defender   </b>
 <p><hr/></p>
 <br></br><b> Coin Flip </b>
 <br></br><b> k = <span className="spoiler" ref="kk" id="k"> {formatKey(this.state.key)} </span> </b>
 <br></br><b> b = <span className="spoiler" ref="bb" id="b"> {this.state.b} </span></b>
 <br></br> 
 <p> <div dangerouslySetInnerHTML ={{__html: this.state.c}}/> </p>
 

    </Col>

    <Col xs={6}><b>Attacker</b>  <p> <hr/> </p>
	
      <br></br><b> Message 0: <input type ="text" ref= "m1" name="msg0" onChange = {this.updateMessages}/> </b> <small> {formatKey(this.state.msg0) } </small>
   <br></br><b> Message 1: <input type ="text"  ref= "m2" name="msg1" onChange = {this.updateMessages} /> </b> <small> {formatKey(this.state.msg1) } </small><br></br>
   
   <p style={{color:'red'}}> <small> <div dangerouslySetInnerHTML ={{__html: this.state.warningText}}/> </small></p><br></br>
   <br></br>
     
   <Button onClick ={this.submitMessages}> Submit messages to defender</Button>

  <br></br><br />
  <Form >
   <Form.Group >
    <b>Input your Guess Here: </b>
    <Form.Control ref="blah" name="guess" id="guess-field" type="text"  placeholder="Choose wisely..." onChange = {this.changeGuess} onKeyPress={(e) => {if (e.key === "Enter") {this.submitGuess(e)}}} />
    <Button onClick = {this.submitGuess}>Submit your guess</Button>
  </Form.Group>
 </Form>
 <Link to='/gamepage'>
		<Button onClick={this.refreshGame}> {this.state.buttonText} </Button>
 </Link>
 <Link to='/'>
 <Button style={{marginLeft:'20px'}}> Home </Button>
 </Link>

    </Col>
 
  </Row>

</Container>
</body>
		</div>
		);
  }}


class Settings extends React.Component{
	constructor(props){
	super(props);
	
	this.handleChange = this.handleChange.bind(this) 
}

async handleChange(e){
		
		var val = e.target.value
		//alert("first val " + e.target.value)
		//this.setState(  {...this.state,[e.target.name]: val} )
		if(e.target.name === "carry"){
			if(e.target.checked){
				val = 0
			}
		
			
			else{
				val = 1
			}
		}
		await this.setState({[e.target.name]: val})
			console.log(this.state)
		var handleToUpdate = this.props.handleToUpdate;
	     
		handleToUpdate(this.state)
		

		
 }
 componentWillMount() {
	
	 this.setState(this.props.state)

	 var handleToUpdate = this.props.handleToUpdate;
	 handleToUpdate(this.props.state)
  }

  
  componentWillUnmount() {
    document.body.classList.remove('page-not-found');
  }
		render(){
 

		
		return(
		<div>
		<h2> Settings </h2>
		<div class="container">


 
<div class="row">
  <Form>
  <Form.Group >
    <Form.Label>Enter number of digits for each number in key</Form.Label>
		<Form.Control  placeholder="2" name = "digits"  onChange = {this.handleChange} />
  
  </Form.Group>
  
    <Form.Group >
    <Form.Label>Enter in the length of the key</Form.Label>
		<Form.Control   placeholder="3"  name = "keyLength"   onChange = {this.handleChange}/>
		<Form.Text> Example key: {formatKey(generate_key(this.state.keyLength, this.state.digits))} </Form.Text>
  </Form.Group>
  <Form.Group >
  <br></br>
    <Form.Label>Number of Rounds per Game</Form.Label>
		<Form.Control  placeholder="5" name = "num_of_rounds"  onChange = {this.handleChange} />
  
  </Form.Group>
 
</Form>

  
</div>
	<label>Select the arithmetic operator </label>
    <select className="form-control" name ="op" onChange = {this.handleChange}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
        </select>
 <div class="row">
 
    
  </div>
  <br></br>
    <div class="row">
    <div class="custom-control custom-switch">
        <input type="checkbox" name = "carry" onChange = {this.handleChange} class="custom-control-input" id="customSwitch2" />	
        <label class="custom-control-label " for="customSwitch2"> Carry on addition?</label>

    </div>
	
    
  </div>
     <br></br>  
  <div class="row">

    <Link to='/'>
 <Button> Home </Button>
 </Link>

  </div>

</div>
		
		
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
		
	<div class="Info">
	
		
		<b>What is this game? </b><br></br>



<small>It's simple. You play as the attacker who's attempting to determine the defender's key by sending two numerical messages of your choice. Note that in this game, messages and keys are formatted as n-tuple of integers.

<br/><br/> <small>For example, a key can look like this k = (21,59,48,12,10) </small>

<br/>

<br/>
As your messages get send to the defender, the defender will then randomly select which of the two messages to encrpyt, and then send the ciphertext message back to you! Your goal is to correctly determine which message the defender had selected.

<br/> By doing so, you'd then be able to do the selected encrpytion scheme operation backwards (decryption) and thus determine the <b>One-Time Pad</b>! :) </small>
<br/><br/> <b> How to use the app?</b><br/>
			<small>One can start off with selecting one of the four preset schemes (similar to those from our CPSC 329 Tutorials). <br/>
			Or, you can define your very own <b>encrpytion scheme</b> by defining <br/>
			<ul><li> The artihmetic operator</li>
			<li>Number of digits per element</li>
			<li>Number of elements in a key/message (for our app both have to be the same length for now) </li>
			<li>A flag for enabling carry on addition </li>
			</ul>
			
			<br/> To select a custom theme first go Home>Encryption Scheme and select <b> Custom Scheme </b>.<br/> Then go to <b>Settings</b> and enter in your values. Once done head back home and then start game! 
			
			
<b><br/><br/>In Game Controls </b><br/>

Enter in your two messages and ensure they are valid (number of digits and length). Then submit these to the defneder to reveal the encrpyted message and then have your crack at finding which message was selected! (0 or 1).

</small>
		</div>
		);
	}
}



class Home extends React.Component{
	constructor(props){
	super(props);
	this.state = this.props.state
	this.onSelect = this.onSelect.bind(this) 
}
	async onSelect(eventKey){
		selectedGame = eventKey 
	
		await this.setState({scheme: eventKey})
		var handleToUpdate = this.props.handleToUpdate;
	     
		handleToUpdate(this.state)
	}
	render(){
		const selection  = this.state;
return (
    <div className="App">
     <p style={{marginTop : '20px'}}> An interactive web app  on teaching how OTP works! </p>
      <header className="App-header">
      

     	 <Link to='/gamepage'>
      	<Button> Start Game </Button>

		</Link>
	




  <p> Select your encrpytion scheme</p>
      <Dropdown onSelect={this.onSelect}>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
{this.state.scheme}
  </Dropdown.Toggle>


  <Dropdown.Menu >
    <Dropdown.Item eventKey = "Scheme 1">Scheme 1</Dropdown.Item>
    <Dropdown.Item eventKey = "Scheme 2">Scheme 2</Dropdown.Item>
	<Dropdown.Item eventKey = "Scheme 3">Scheme 3</Dropdown.Item>
	<Dropdown.Item eventKey = "Scheme 4">Scheme 4</Dropdown.Item>
    <Dropdown.Item eventKey = "Custom Scheme">Custom Scheme</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

 <Link to='/settings'>

      	<Button> Game Settings </Button>

		</Link>
		 <Link to='/info'>
      	<Button> Tutorial </Button>

		</Link>
		<Link to='/quiz'>
		<Button> OTP Quiz </Button>
		</Link>
      </header>


    
      <small> Source Code: <a href="https://github.com/nmosman/Indistuingishability-Game"> https://github.com/nmosman/Indistuingishability-Game</a> </small> 
    
    </div>
  );
}
}

export default App;

class QuestionImage extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imgRef.current && prevProps.img.src !== this.props.img.src) {
      this.imgRef.current.classList.add('fade-in');

      let timer = setTimeout(() => {
        this.imgRef.current.classList.remove('fade-in');
        clearTimeout(timer);
      }, 1000)
    }
  }

  render() {
    return (
      <img ref={this.imgRef} className="img-fluid" src={this.props.img.src} alt={this.props.img.alt} />
    );
  }
}

const QuizProgress = (props) => {
  return (
    <div className="progress">
      <p className="counter">
        <span>Question {props.currentQuestion+1} of {props.questionLength}</span>
      </p>
      <div className="progress-bar" style={{'width': ((props.currentQuestion+1) / props.questionLength) * 100 + '%'}}></div>
    </div>
  );
}

const Results = (props) => {
  return (
    <div className="results fade-in">
      <h1>Your score: {((props.correct/props.questionLength) * 100).toFixed()}%</h1>
      <button type="button" onClick={props.startOver}>Try again <i className="fas fa-redo"></i></button>  <Link to='/'>
 <Button> Home </Button>
 </Link>
    </div>
  );
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.updateAnswer = this.updateAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getResults = this.getResults.bind(this);
    this.startOver = this.startOver.bind(this);

    this.state = {
      currentQuestion: 0,
      correct: 0,
      inProgress: true,
      questions: [{
        question: "Which of the following provides an optimal strategy for the indistuingishability game",
        options: [{
          option: "Choosing two of the same messages",
          correct: true
        }, {
          option: "Selectinmg two maximally unique messages",
          correct: false
        }, {
          option: "Providing two random messages",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "Selecting two maximally different messages is the optimal solution in this game. Try this strategy out when playing the game!",
        moreUrl: ''
      }, {
        question: "What logical operator is typically used when encrpyting a One Time Pad with the plaintext?",
        options: [{
          option: "AND",
          correct: false 
        }, {
          option: "XOR",
          correct: true
        }, {
          option: "NOR",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "The bitwise XOR operator is used in OTP ",
        moreUrl: ""
      
      },
	  {
        question: "What is a reason why OTP encryption is not very practical in security?",
        options: [{
          option: "The pad has to the be of the same length as the plaintext",
          correct: true
        }, {
          option: "It's very complicated to implement",
          correct: false
        }, {
          option: "It's very trivial to decrypt",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "One reason is the pad must be the same length as the plaintext. Basically the length of the pad scales as the length of the plaintext grows.",
        moreUrl: ''
      },
	  
	  
	  {
        question: "For perfect secrecy of OTP, whioh of the following must be true?",
        options: [{
          option: "The pad must be truly random",
          correct: true
        }, {
          option: "Nobody should know how to encrypt the pad",
          correct: false
        }, {
          option: "The pad can only be used at most 3 times",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "Perfect secrecy assumes the pad generated is truly random. Also, the pad must only be used once!",
        moreUrl: ''
      },
	  
	  
	  {
        question: "Who was first credited with coming up with the One Time Pad Encryption Scheme?",
        options: [{
          option: "Claude Shannon",
          correct: true
        }, {
          option: "Gilbert Vernam",
          correct: true
        }, {
          option: "John von Neumann",
          correct: false
        }, {
          option: "Alan Turing",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "Gilbert Vernam, an engineer at AT&T Bell labs, invtend the one time pad (OTP) in 1979",
        moreUrl: ''
      },
	  
	  {
        question: "If given a key in binary as 1101 and a 4 bit plaintext as 0011, whats the encrypted cipher text. (Hint Enc(pad, m) = pad XOR m",
        options: [{
          option: "1110",
          correct: true
        }, {
          option: "1101",
          correct: false
        }, {
          option: "0011",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "Recall that 1 XOR 1 is 0. Otherwise XOR is identical to adding numbers normally",
        moreUrl: ''
      }
	  
	  ,
	  
	  {																			
        question: "If given a key in binary as 11001100 and a 8 bit plaintext as 10101010, whats the encrypted cipher text. (Hint Enc(pad, m) = pad XOR m",
        options: [{
          option: "11100100",
          correct: false
        }, {
          option: "01100110",
          correct: true
        }, {
          option: "10110011",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "Recall that 1 XOR 1 is 0. Otherwise XOR is identical to adding numbers normally",
        moreUrl: ''
      }
	  ]
    }
  }

  updateAnswer(e) {
    //record whether the question was answered correctly
    let answerValue = e.target.value;

    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      //convert boolean string to boolean with JSON.parse()
      stateToUpdate[prevState.currentQuestion].answerCorrect = JSON.parse(answerValue);

      return {questions: stateToUpdate};
    });
  }

  checkAnswer(e) {
    //display to the user whether their answer is correct
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      stateToUpdate[prevState.currentQuestion].checked = true;

      return {questions: stateToUpdate};
    });
  }

  nextQuestion(e) {
    //advance to the next question
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.currentQuestion;

      return {currentQuestion: stateToUpdate+1};
    }, () => {
      this.radioRef.current.reset();
    });
  }

  getResults() {
    let correct = this.state.correct;

    this.state.questions.forEach((item, index) => {
      if (item.answerCorrect) {
        ++correct;
      }

      if (index === (this.state.questions.length-1)) {
        this.setState({
          correct: correct,
          inProgress: false
        });
      }
    });
  }

  startOver() {
    //reset form and state back to its original value
    this.setState((prevState, props) => {
      let questionsToUpdate = prevState.questions;

      questionsToUpdate.forEach(item => {
        //clear answers from previous state
        delete item.answerCorrect;
        delete item.checked;
      });

      return {
        inProgress: true,
        correct: 0,
        currentQuestion: 0,
        questions: questionsToUpdate
      }
    });
  }

  componentDidMount() {

    this.radioRef = React.createRef();
  }

  render() {
    if (!this.state.inProgress) {
      return (
        <section className="quiz">
          <Results correct={this.state.correct} questionLength={this.state.questions.length} startOver={this.startOver} />
        </section>
      );
    }

    return (
      <section className="quiz fade-in" aria-live="polite">
        <QuizProgress currentQuestion={this.state.currentQuestion} questionLength={this.state.questions.length} />
        <div className="question-container">
          {this.state.questions[this.state.currentQuestion].img.src &&
            <QuestionImage img={this.state.questions[this.state.currentQuestion].img} />
          }
          <p className="question"><RawHTML html={this.state.questions[this.state.currentQuestion].question} /></p>

          <form ref={this.radioRef}>
            {this.state.questions[this.state.currentQuestion].options.map((item, index) => {
              return <div key={index}
                      className={"option" + (this.state.questions[this.state.currentQuestion].checked && !item.correct ? ' dim' : '') + (this.state.questions[this.state.currentQuestion].checked && item.correct ? ' correct' : '')}>
                      <input id={"radio-"+index} onClick={this.updateAnswer} type="radio" name="option" value={item.correct}
                          disabled={this.state.questions[this.state.currentQuestion].checked} />
                        <label htmlFor={"radio-"+index}><RawHTML html={item.option}/></label>
                    </div>
              })}
          </form>

          <div className="bottom">
            {this.state.questions[this.state.currentQuestion].feedback && this.state.questions[this.state.currentQuestion].checked
              && <div className="fade-in">
                <p>
                  <RawHTML html={this.state.questions[this.state.currentQuestion].feedback} />
                  {this.state.questions[this.state.currentQuestion].moreUrl &&
                    <React.Fragment>
                       &nbsp;<a target="_blank" href={this.state.questions[this.state.currentQuestion].moreUrl}>Learn more</a>.
                    </React.Fragment>
                  }
                </p>
              </div>
            }

            {!this.state.questions[this.state.currentQuestion].checked &&
               <button type="button" onClick={this.checkAnswer}
               disabled={!('answerCorrect' in this.state.questions[this.state.currentQuestion])}>Check answer</button>
             }

            {(this.state.currentQuestion+1) < this.state.questions.length && this.state.questions[this.state.currentQuestion].checked &&
              <button className="fade-in next" type="button" onClick={this.nextQuestion}>Next <i className="fa fa-arrow-right"></i></button>
            }
          </div>

          {(this.state.currentQuestion+1) === this.state.questions.length && this.state.questions[this.state.currentQuestion].checked &&
            <button type="button" className="get-results pulse" onClick={this.getResults}>Get Results</button>
          }
        </div>
      </section>
    )
  }
}
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


