import React from 'react';
import { X, Bookmark, Trash2, ArrowLeft, Clock } from 'lucide-react';
import { Article } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onOpenArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onOpenArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 dark:border-stone-800 animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-red-700 dark:text-red-400" />
            <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
              المقالات المحفوظة ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of articles */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-stone-400 p-6">
              <Bookmark className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm font-medium">لم تقم بحفظ أي مقالات بعد</p>
              <p className="text-xs text-stone-400 mt-1">
                انقر على أيقونة الإشارة المرجعية بجانب أي خبر لحفظه وقراءته لاحقاً دون اتصال.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="group p-3 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-red-600/40 transition-colors flex gap-3 items-start"
              >
                {art.imageUrl && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-200 dark:bg-stone-800">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-red-700 dark:text-red-400 font-semibold mb-0.5">
                    {art.subCategory || art.kicker}
                  </div>
                  <h4
                    onClick={() => {
                      onOpenArticle(art);
                      onClose();
                    }}
                    className="font-editorial text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2 cursor-pointer hover:text-red-800 dark:hover:text-red-400"
                  >
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mt-2">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{art.publishedAt}</span>
                    </span>
                    <button
                      onClick={() => onRemoveBookmark(art.id)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="حذف من المحفوظات"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-rose-600 transition-colors font-medium"
            >
              مسح الكل
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
            >
              تم
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
