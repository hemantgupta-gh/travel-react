import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple mock login (replace with API later)
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: 10,
            background: '#007bff',
            color: '#fff',
            border: 'none',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
