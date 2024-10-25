import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import '../styles/PostList.css';

interface Post {
  id: number;
  title: string;
  content?: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleDelete = async (postId: number) => {
    try {
      await api.delete(`/post/${postId}/`);
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Erro ao deletar post:', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/post/`);
        if (response.data && Array.isArray(response.data.results)) {
          setPosts(response.data.results);
        } else {
          console.error('Formato de resposta inesperado:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list-container">
      <div className="header">
        <h1>Lista de Posts</h1>
        <Link to="/post/create" className="create-button">
          Criar Novo Post
        </Link>
      </div>
      {posts.length === 0 ? (
        <p>Nenhum post encontrado.</p> // Mensagem quando não há posts
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <Link to={`/post/${post.id}/detail`} className="post-link-name">
                {post.title}
              </Link>
              <div className="actions">
                <Link to={`/post/${post.id}/edit`} className="post-link">
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
      )}
    </div>
  );
};

export default PostList;
