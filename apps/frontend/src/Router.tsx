import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Login from './components/Login';
import PostList from './components/PostList';
import PrivateRoute from './components/PrivateRoute';
import ReadPost from './components/ReadPost';

function AppRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/post" element={<PostList />} />
          {/* <Route path="/posts/create" element={<CreatePost />} /> */}
          <Route path="/post/:postId/edit" element={<EditPost />} />
          <Route path="/post/:postId/detail" element={<ReadPost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
