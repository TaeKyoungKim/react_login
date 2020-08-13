import React , {useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Profile from './components/Profile';

import {signIn} from './components/auth';

import AuthRoute from './components/AuthRoute';
import LogoutButton from './components/LogoutButton';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);

  return (
    <Router>
       <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>

        {authenticated ? (
          <LogoutButton logout={logout} />
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </header>
      <hr />
      <main>
        <Switch>
         <AuthRoute
            authenticated={authenticated}
            path="/profile"
            render={props => <Profile user={user} {...props} />}
          />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" 
            render={props => (
              <LoginForm authenticated={authenticated} login={login} {...props} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
