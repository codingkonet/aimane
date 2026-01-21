
import React, { useState, useContext, useMemo } from 'react';
import { User, Article, Comment } from '../types';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';
import useLocalStorage from '../hooks/useLocalStorage';

interface ArticleDetailPageProps {
  id: string;
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onInstall: () => void;
  showInstallButton: boolean;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ id, user, onLogout, onUpdateUser, onInstall, showInstallButton }) => {
  const { t, language } = useContext(LanguageContext);
  const [articles, setArticles] = useLocalStorage<Article[]>('global_articles', []);
  const [commentText, setCommentText] = useState('');

  const article = useMemo(() => articles.find(a => a.id === id), [articles, id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText || !article) return;

    const newComment: Comment = {
        id: crypto.randomUUID(),
        authorEmail: user.email,
        authorName: user.name,
        content: commentText,
        date: new Date().toISOString()
    };

    const updatedArticles = articles.map(a => {
        if (a.id === id) {
            return { ...a, comments: [newComment, ...a.comments] };
        }
        return a;
    });

    setArticles(updatedArticles);
    setCommentText('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800">
      <Header user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} onInstall={onInstall} showInstallButton={showInstallButton} />
      <main className="container mx-auto p-4 md:p-8 max-w-3xl">
        <button 
            onClick={() => window.location.hash = '/blog'}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-bold"
        >
            <BackIcon /> {t('backToBlog')}
        </button>

        <article className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 mb-12">
            <div className="flex items-center gap-3 mb-8">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                    {article.category}
                </span>
                <span className="text-slate-400 text-sm">{formatDate(article.date)}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
                {article.title}
            </h1>

            <div className="flex items-center gap-4 mb-10 border-b border-slate-50 dark:border-slate-700/50 pb-8">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-primary text-xl">
                    {article.authorName[0]}
                </div>
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">{article.authorName}</p>
                    <p className="text-sm text-slate-500">Author</p>
                </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {article.content}
                </p>
            </div>
        </article>

        {/* Comments Section */}
        <section className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <CommentIcon /> {t('comments')} ({article.comments.length})
            </h3>

            <form onSubmit={handleAddComment} className="mb-10">
                <textarea 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Join the conversation..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white mb-4"
                    rows={3}
                ></textarea>
                <div className="flex justify-end">
                    <button 
                        type="submit"
                        className="bg-primary text-white font-bold py-2 px-6 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                        {t('addComment')}
                    </button>
                </div>
            </form>

            <div className="space-y-8">
                {article.comments.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-primary">
                            {comment.authorName[0]}
                        </div>
                        <div className="flex-grow bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-slate-900 dark:text-white">{comment.authorName}</span>
                                <span className="text-xs text-slate-400">{formatDate(comment.date)}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
};

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const CommentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>;

export default ArticleDetailPage;
