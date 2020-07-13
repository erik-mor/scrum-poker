import React from 'react'
import CreateSessionForm from './components/CreateSessionForm'
import SessionDetail from './components/SessionDetail'
import Nav from './components/Nav/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SessionProvider } from './components/SessionContext'
import { UserProvider } from './components/UserContext'
import { ShowProvider } from './components/ShowContext'
import { CardProvider } from './components/CardContext'

const App = () => {

  return (
    <Router>
      <UserProvider>
      <SessionProvider>
      <ShowProvider>
        <CardProvider>
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
        </CardProvider>
      </ShowProvider>
      </SessionProvider>
      </UserProvider>
    </Router>
  )
}

export default App;