import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Searchbar from './components/searchbar'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To Bike Or To Metro That Is The Question</h1>
        </header>

        
        <Searchbar />


       
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
