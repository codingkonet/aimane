
import React, { useContext, useMemo } from 'react';
import { User, Article } from '../types';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';
import useLocalStorage from '../hooks/useLocalStorage';

interface BlogPageProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onInstall: () => void;
  showInstallButton: boolean;
}

const BlogPage: React.FC<BlogPageProps> = ({ user, onLogout, onUpdateUser, onInstall, showInstallButton }) => {
  const { t, language } = useContext(LanguageContext);
  const [articles] = useLocalStorage<Article[]>('global_articles', []);

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [articles]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800">
      <Header user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} onInstall={onInstall} showInstallButton={showInstallButton} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t('community')}</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Insights and tips shared by our community members.</p>
            </div>
            <button 
                onClick={() => window.location.hash = '/blog/create'}
                className="bg-primary text-white font-bold py-3 px-8 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center gap-2"
            >
                <PlusIcon /> {t('createPost')}
            </button>
        </div>

        {sortedArticles.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl">
                <BlogIconLarge />
                <p className="text-xl text-slate-500 dark:text-slate-400 mt-6">{t('noArticles')}</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedArticles.map(article => (
                    <article key={article.id} className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all group flex flex-col">
                        <div className="p-8 flex-grow">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                    {article.category}
                                </span>
                                <span className="text-xs text-slate-400">{formatDate(article.date)}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6">
                                {article.content}
                            </p>
                        </div>
                        <div className="p-8 pt-0 mt-auto border-t border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-primary">
                                    {article.authorName[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{article.authorName}</p>
                                    <p className="text-xs text-slate-500">{article.comments.length} {t('comments')}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => window.location.hash = `/blog/post/${article.id}`}
                                className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                            >
                                {t('readMore')} <ArrowRightIcon />
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        )}
      </main>
    </div>
  );
};

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const BlogIconLarge = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-slate-200 dark:text-slate-700 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>;

export default BlogPage;
