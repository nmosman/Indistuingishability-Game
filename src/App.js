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

const RawHTML = (props) => <span dangerouslySetInnerHTML={{__html: props.html}}></span>;
var key = generate_key(2,1)
var msgs = [generate_key(2,1), generate_key(2,1)] 
var coinRes = flipCoin()
var selectedGame = 1;

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
			carry: 1,
			digits: 3,
			op: "+"
			
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
	 <p> {this.state.num_of_rounds} </p>
      <header className="App-header">


		<Router>
		  <Switch>
		  <Route exact path="/" component = {Home} />
          <Route path="/gamepage"  render={props =>  (<GamePage {...props} state ={this.state} handleToUpdate = {handleToUpdate.bind(this)} />) }/>
          <Route path="/settings" component = {Settings} /> 
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
function getGameType(gameType){
	var rulesText = "Default rules";
	switch(gameType){
		case 0:
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			break;
		
	}
	
	return rulesText;
}
class GamePage extends React.Component{
constructor(props){
	super(props);
	
}
 componentWillMount() {
    document.body.classList.add('page-not-found')
	 this.props.state.num_of_rounds = 2
	 this.setState(this.props.state)
	 var handleToUpdate = this.props.handleToUpdate;
	 handleToUpdate(this.props.state)
  }

  
  componentWillUnmount() {
    document.body.classList.remove('page-not-found');
  }
		render(){
 
		
		return(
			
		 <div >
		<p> No of rounds: {this.state.num_of_rounds} </p>
		<br></br>
		<p> Game rules: {getGameType(this.state.game_type)}</p><br></br>
		 <body>
	
		<Container>
  <Row className="justify-content-md-center">
    <Col><b>Defender</b>
 <p>=============================================== </p>
<<<<<<< HEAD
 <br></br><b> Coin Flip </b>
 <br></br><b> k = <span className="spoiler" id="k"> {formatKey(key)} </span> </b>
 <br></br><b> b = <span className="spoiler" id="b"> {coinRes} </span></b>
 <br></br><b> c = {formatKey(perform_op(key, msgs[coinRes], "*", 1))} </b>
=======
 <br></br><b> </b>
 <br></br><b> k = {formatKey(key)}  </b>
 <br></br><b> b = {coinRes} </b>
 <br></br><b> c = {formatKey(perform_op(key, msgs[coinRes], this.state.op, this.state.digits))} </b>
>>>>>>> a363feba630f5a658f5383fb171ee75bf53976df
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
		<div>
		<h2> Settings </h2>
		<div class="container">
  <div class="row">


  </div>
  <div class="row">
     <select class="custom-select">
      <option selected>Options</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
  <div class="row">
    <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="customSwitch1" />		
        <label class="custom-control-label" for="customSwitch1">Carry On?</label>

    </div>
    
  </div>
    <div class="row">
    <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="customSwitch2" />	
        <label class="custom-control-label " for="customSwitch2">Another option</label>
	
    </div>
    
  </div>
    <div class="row">
    <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="customSwitch3" />	
        <label class="custom-control-label" for="customSwitch3">Blah</label>

    </div>
    
  </div>
  <div class="row">
    
  <button type="button" class="btn btn-secondary">Done</button>
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
		 <div className="App">
		<p> Info Page! </p>
		</div>
		);
	}
}



class Home extends React.Component{
	constructor(props){
	super(props);
	this.state ={selection: 1}
}
	onSelect = (eventKey) => {
		selectedGame = eventKey 
		alert(selectedGame)
		this.setState({selection: eventKey})
	}
	render(){
		const selection  = this.state;
return (
    <div className="App">
     <h2> Indistinguishability game </h2>
      <header className="App-header">
      

     
     	 <Link to='/gamepage'>
      	<Button> Start Game </Button>

		</Link>
	


  <p> Select your encrpytion scheme</p>
      <Dropdown title='Encrpytion Scheme' onSelect={this.onSelect}>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Encrpytion Scheme
  </Dropdown.Toggle>


  <Dropdown.Menu >
    <Dropdown.Item eventKey = "1">Scheme 1</Dropdown.Item>
    <Dropdown.Item eventKey = "2">Scheme 2</Dropdown.Item>
	<Dropdown.Item eventKey = "3">Scheme 3</Dropdown.Item>
	<Dropdown.Item eventKey = "4">Scheme 4</Dropdown.Item>
    <Dropdown.Item eventKey = "5">Custom Scheme</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

 <Link to='/settings'>
      	<Button> Game Settings </Button>

		</Link>
		 <Link to='/info'>
      	<Button> Info </Button>

		</Link>
		<Link to='/quiz'>
		<Button> Test your knowledge </Button>
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
      <button type="button" onClick={props.startOver}>Try again <i className="fas fa-redo"></i></button>
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
        question: "Who invented OTP?",
        options: [{
          option: "Me",
          correct: true
        }, {
          option: "Someone",
          correct: false
        }, {
          option: "idk lol",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "bbbbbbbbb",
        options: [{
          option: "4",
          correct: true
        }, {
          option: "1",
          correct: false
        }, {
          option: "3",
          correct: false
        }],
        img: {
          src: '',
          alt: 'b'
        },
        feedback: "",
        moreUrl: ""
      
      }]
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


