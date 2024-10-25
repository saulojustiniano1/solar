import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

import '../styles/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/token/', { username, password });
      localStorage.setItem('token', response.data.access);
      navigate('/post/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-container">
      {' '}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Entrar
        </button>{' '}
      </form>
    </div>
  );
};

export default Login;
