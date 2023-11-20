import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './UserContext';
import CreateLoan from './CreateLoan'; // Update the path accordingly

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          {/* Other routes */}
          <Route path="/createloan" component={CreateLoan} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
