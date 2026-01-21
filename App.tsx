
import React, { useState, useEffect, useCallback, useContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { User } from './types';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import BlogPage from './pages/BlogPage';
import CreateArticlePage from './pages/CreateArticlePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import { LanguageContext } from './context/LanguageContext';
import PWAInstaller from './components/PWAInstaller';

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

  const renderPage = () => {
    if (currentUser) {
       if (route === '#/admin' && currentUser.email === 'hello@ouaglabs.com') {
         return <AdminDashboardPage user={currentUser} users={users} onLogout={handleLogout} onUpdateUser={handleUpdateUser} onInstall={handleInstall} showInstallButton={!!installPrompt} />;
       }

       if (route === '#/blog') {
         return <BlogPage user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} onInstall={handleInstall} showInstallButton={!!installPrompt} />;
       }

       if (route === '#/blog/create') {
         return <CreateArticlePage user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} onInstall={handleInstall} showInstallButton={!!installPrompt} />;
       }

       if (route.startsWith('#/blog/post/')) {
         const id = route.split('/').pop() || '';
         return <ArticleDetailPage id={id} user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} onInstall={handleInstall} showInstallButton={!!installPrompt} />;
       }

       return <DashboardPage user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} onInstall={handleInstall} showInstallButton={!!installPrompt} />;
    }

    switch (route) {
      case '#/login':
        return <LoginPage users={users} onLogin={handleLogin} />;
      case '#/register':
        return <RegisterPage users={users} onRegister={handleRegister} />;
      default:
        return <HomePage onInstall={handleInstall} showInstallButton={!!installPrompt} />;
    }
  };

  return (
    <>
      {renderPage()}
      <PWAInstaller onInstall={handleInstall} showInstallButton={!!installPrompt} />
    </>
  );
};

export default App;
