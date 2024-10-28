import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../api';

import '../styles/EditPost.css';

function EditPost() {
  const { postId } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (!postId) return;

    api
      .get(`/posts/${postId}/`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setImage(response.data.image);
        setCurrentImage(response.data.image);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do post:', error);
      });
  }, [postId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      if (image && image !== currentImage) {
        formData.append('image', image);
      }

      if (postId) {
        await api.put(`/posts/${postId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Post atualizado com sucesso!');
      } else {
        await api.post(`/posts/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/posts');
    } catch (error) {
      console.error('Erro ao salvar post:', error);
    }
  };

  return (
    <div className="edit-post-container">
      <h1>{postId ? 'Editar Post' : 'Criar Novo Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {currentImage && (
            <img
              src={currentImage}
              alt="Imagem do Post"
              className="post-image"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="save-button" type="submit">
          {postId ? 'Salvar' : 'Criar'}
        </button>
        <Link to="/posts">
          <button type="button" className="back-button">
            Voltar para Listagem
          </button>
        </Link>
      </form>
    </div>
  );
}

export default EditPost;
