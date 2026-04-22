import React from 'react';
import { useNavigate } from 'react-router-dom';

// Mock type for user (adjust based on your actual AuthContext)
interface User {
  email?: string;
}

// Mock hook (replace with your real import)
const useAuth = (): { user: User | null } => {
  return {
    user: { email: 'user@example.com' }, // replace with real context
  };
};

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="sidebar" style={{ padding: 20 }}>
      {/* Profile Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#007bff',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          {userInitial}
        </div>

        {/* User Info */}
        <div>
          <div style={{ fontWeight: 600 }}>
            {user?.email ?? 'User'}
          </div>
          <div style={{ fontSize: 12, color: '#777' }}>
            Logged in
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        style={{
          width: '100%',
          padding: '8px 10px',
          background: 'red',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;