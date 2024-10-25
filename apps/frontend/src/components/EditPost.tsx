import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../api';

import '../styles/EditPost.css';

interface Params extends Record<string, string | undefined> {
  postId?: string;
}

function EditPost(): JSX.Element {
  const { postId } = useParams<Params>();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | string>('');
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    if (!postId) return;
    api
      .get(`/post/${postId}/`)
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      if (image && image !== currentImage) {
        formData.append('image', image as File);
      }

      if (postId) {
        await api.put(`/post/${postId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Post atualizado com sucesso!');
      } else {
        await api.post(`/post/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/post');
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
        <Link to="/post">
          <button type="button" className="back-button">
            Voltar para Listagem
          </button>
        </Link>
      </form>
    </div>
  );
}

export default EditPost;
