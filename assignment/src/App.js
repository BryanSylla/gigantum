import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Searchbar from './components/searchbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To Bike Or To Metro That Is The Question</h1>
        </header>

        
        <Searchbar />


       
      </div>
    );
  }
}

export default App;
