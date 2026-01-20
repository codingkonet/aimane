
import React, { useState, useEffect, useCallback, useContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { User } from './types';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { LanguageContext } from './context/LanguageContext';

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string,
  }>;
  prompt(): Promise<void>;
}


const App: React.FC = () => {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  const [route, setRoute] = useState(window.location.hash);
  const { setLanguage } = useContext(LanguageContext);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  const handleInstall = async () => {
    if (!installPrompt) return;
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    setInstallPrompt(null);
  }

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
    // Theme management
    const root = window.document.documentElement;
    if (currentUser?.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
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
     return <DashboardPage user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} onInstall={handleInstall} showInstallButton={!!installPrompt} />;
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
      page = <HomePage onInstall={handleInstall} showInstallButton={!!installPrompt} />;
  }

  return page;
};

export default App;
