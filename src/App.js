import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
function App() {
  return (
    <div className="App">
     <h2> Indistinguishability game </h2>
      <header className="App-header">
      
      <Button> Start Game </Button>
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

export default App;
