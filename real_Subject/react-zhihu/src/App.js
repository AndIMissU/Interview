import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="login-container">
          <div className="login-header">
            <img src={require('./static/header-icon.png')} />
            <p>登录知乎，发现更大的世界</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
