
import React, { useState, useContext } from 'react';
import { User, Article } from '../types';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';
import useLocalStorage from '../hooks/useLocalStorage';

interface CreateArticlePageProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onInstall: () => void;
  showInstallButton: boolean;
}

const CreateArticlePage: React.FC<CreateArticlePageProps> = ({ user, onLogout, onUpdateUser, onInstall, showInstallButton }) => {
  const { t } = useContext(LanguageContext);
  const [articles, setArticles] = useLocalStorage<Article[]>('global_articles', []);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal Finance');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newArticle: Article = {
        id: crypto.randomUUID(),
        title,
        content,
        authorEmail: user.email,
        authorName: user.name,
        category,
        date: new Date().toISOString(),
        comments: [],
        likes: []
    };

    setArticles([newArticle, ...articles]);
    window.location.hash = '/blog';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800">
      <Header user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} onInstall={onInstall} showInstallButton={showInstallButton} />
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <button 
            onClick={() => window.location.hash = '/blog'}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-bold"
        >
            <BackIcon /> {t('backToBlog')}
        </button>

        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">{t('createPost')}</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">{t('postTitle')}</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g. 5 Tips for saving more each month"
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-lg font-semibold"
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">{t('postCategory')}</label>
                        <select 
                            value={category} 
                            onChange={e => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                        >
                            <option>Personal Finance</option>
                            <option>Investing</option>
                            <option>Budgeting</option>
                            <option>Saving</option>
                            <option>Lifestyle</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">{t('postContent')}</label>
                    <textarea 
                        value={content} 
                        onChange={e => setContent(e.target.value)}
                        placeholder="Share your financial wisdom..."
                        rows={12}
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white resize-none leading-relaxed"
                    ></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button 
                        type="button"
                        onClick={() => window.location.hash = '/blog'}
                        className="px-8 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                    >
                        {t('cancel')}
                    </button>
                    <button 
                        type="submit"
                        className="px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-primary/20 active:scale-95 transition-all"
                    >
                        {t('publish')}
                    </button>
                </div>
            </form>
        </div>
      </main>
    </div>
  );
};

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

export default CreateArticlePage;
