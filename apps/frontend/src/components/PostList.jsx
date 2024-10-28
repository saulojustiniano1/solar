import { useEffect, useState } from 'react';
import api from '../api';

import { Link } from 'react-router-dom';

import '../styles/PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}/`);
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Erro ao deletar post:', error);
    }
  };

  useEffect(() => {
    api
      .get(`/posts/`)
      .then((response) => {
        setPosts(response.data.results);
      })
      .catch((error) => {
        console.error('Erro ao buscar posts:', error);
      });
  }, []);

  return (
    <div className="post-list-container">
      <div className="header">
        <h1>Lista de Posts</h1>
        <Link to="/posts/create" className="create-button">
          Criar Novo Post
        </Link>{' '}
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/posts/${post.id}/detail`} className="post-link-name">
              {post.title}
            </Link>
            <div className="actions">
              <Link to={`/posts/${post.id}/edit`} className="post-link">
                Editar
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="delete-button"
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
