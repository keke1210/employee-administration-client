import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavBar from './components/layouts/AppNavBar';
import { Provider } from 'react-redux';
import store from './store';
import Task from './components/tasks/Task';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />

          <Task />
        </div>
      </Provider>
    );
  }

}

export default App;
