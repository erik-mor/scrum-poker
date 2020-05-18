import React from 'react';
import './App.css';
import CreateSessionForm from './components/CreateSessionForm';
import SessionDetail from './components/SessionDetail';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SessionProvider } from './components/SessionContext'

const App = () => {

  return (
    <Router>
      <SessionProvider>
        <div className="App">
          <Nav />
          <div className="container">
            <Route path="/" exact render={props => (
              <React.Fragment>
                <CreateSessionForm />
              </React.Fragment>
            )} />
            <Route path="/:id" component={SessionDetail} />
          </div>
        </div>
      </SessionProvider>
    </Router>
  )
}

export default App;
