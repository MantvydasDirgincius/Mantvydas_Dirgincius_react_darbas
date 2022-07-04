import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Add from './pages/Add/Add';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Switch>
        <Route path='/add'>
          <Add />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
        <Route path='*'>
          <h2>404 Not found</h2>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
