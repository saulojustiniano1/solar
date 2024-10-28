import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  default as CreatePost,
  default as EditPost,
} from './components/EditPost';
import Login from './components/Login';
import PostList from './components/PostList';
import PrivateRoute from './components/PrivateRoute';
import ReadPost from './components/ReadPost';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:postId/edit" element={<EditPost />} />
          <Route path="/posts/:postId/detail" element={<ReadPost />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Exporta o componente AppRouter
export default AppRouter;
