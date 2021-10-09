import { Loader, Navbar } from './index';
import { Home, Login, Setting, SignUp } from '../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Redirect } from 'react-router-dom';

const Page404 = () => {
  return <div>Page 404</div>;
};

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();

  return (
    <Route {...rest}>{auth.user ? children : <Redirect to="/login" />}</Route>
  );
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <SignUp />
          </Route>
          <PrivateRoute exact path="/settings">
            <Setting />
          </PrivateRoute>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
