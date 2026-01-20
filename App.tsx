
import React, { useState, useEffect, useCallback, useContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { User } from './types';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { LanguageContext } from './context/LanguageContext';

const App: React.FC = () => {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  const [route, setRoute] = useState(window.location.hash);
  const { setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentUser?.language) {
      setLanguage(currentUser.language);
    }
  }, [currentUser, setLanguage]);


  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setLanguage(user.language);
    window.location.hash = '/dashboard';
  };

  const handleRegister = (user: User) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    setCurrentUser(user);
    setLanguage(user.language);
    window.location.hash = '/dashboard';
  };

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    window.location.hash = '/';
  }, [setCurrentUser]);

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.email === updatedUser.email ? updatedUser : u));
    if (updatedUser.language) {
        setLanguage(updatedUser.language);
    }
  }

  if (currentUser) {
     return <DashboardPage user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
  }

  let page;
  switch (route) {
    case '#/login':
      page = <LoginPage users={users} onLogin={handleLogin} />;
      break;
    case '#/register':
      page = <RegisterPage users={users} onRegister={handleRegister} />;
      break;
    default:
      page = <HomePage />;
  }

  return page;
};

export default App;
