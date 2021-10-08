import { Loader, Navbar } from './index';
import { Home, Login, Setting, SignUp } from '../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from '../hooks';

const Page404 = () => {
  return <div>Page 404</div>;
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
          <Route exact path="/settings">
            <Setting />
          </Route>

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
