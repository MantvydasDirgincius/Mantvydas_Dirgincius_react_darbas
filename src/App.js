import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Add from './pages/Add/Add';
import { AuthContext } from './store/authContext';
import { useContext } from 'react';

function App() {
  const { isUserLoggedIn } = useContext(AuthContext);
  return (
    <div className='App'>
      <Navigation />
      <Switch>
        {isUserLoggedIn && (
          <Route path='/home'>
            <Home />
          </Route>
        )}
        {isUserLoggedIn && (
          <Route path='/add'>
            <Add />
          </Route>
        )}
        <Route path='/register'>
          <Register />
        </Route>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='*'>
          {isUserLoggedIn ? (
            <h2> toks puslapis neegzsistuoja</h2>
          ) : (
            <h2>jus esate neprisiregistraves</h2>
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
