import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import './App.css';
import TrickListPage from './components/TrickListPage';
import TrickDetailsPage from './components/TrickDetailsPage';
import ErrorBoundary from './components/common/ErrorBoundary';

const theme = createMuiTheme();
const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Windsurfing Tricks Database</h1>
              </header>
              <div className="root">
                <Route exact={true} path="/" component={TrickListPage} />
                <Route exact={true} path="/tricks/view/:name" component={TrickDetailsPage} />
              </div>
            </div>
          </Router >
        </MuiThemeProvider >
      </ErrorBoundary>
    );
  }
}

export default App;
