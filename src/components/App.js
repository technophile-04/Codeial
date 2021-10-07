import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Loader, Navbar } from './index';
import { Home, Login } from '../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Page404 = () => {
  return <div>Page 404</div>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPost();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home posts={posts} />
          </Route>

          <Route exact path="/login">
            <Login />
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
