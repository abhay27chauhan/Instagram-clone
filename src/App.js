import { Redirect, Route, Switch } from 'react-router-dom';

import Profile from './Pages/Profile/Profile'
import Feed from './Pages/Feed/Feed'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'

import './App.css';
import { useStateValue } from './context/StateProvider';

function App() {
  const { state: { user } } = useStateValue();

  return (
    <div className="app">
      <Switch>
        {console.log("inside switch", user)}
        <Route path="/profile/:id" render={(props) => user ? (<Profile {...props} />) : (<Redirect to="/login"/>)} />
        <Route path="/login" render={(props) => !user ? (<Login {...props} />) : (<Redirect to="/"/>)} />
        <Route path="/signup" render={(props) => !user ? (<Signup {...props} />) : (<Redirect to="/"/>)} />
        <Route path="/" render={(props) => user ? (<Feed {...props} />) : (<Redirect to="/login"/>)} />
      </Switch>
    </div>
  );
}

export default App;
