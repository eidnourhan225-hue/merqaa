import React from 'react';
import { Lightbulb, ArrowLeft, CheckCircle2, AlertCircle, Target, TrendingUp } from 'lucide-react';
import { Article, CategoryId } from '../types';

interface SolutionsJournalismSectionProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onSelectCategory: (id: CategoryId) => void;
}

export const SolutionsJournalismSection: React.FC<SolutionsJournalismSectionProps> = ({
  articles,
  onOpenArticle,
  onSelectCategory,
}) => {
  const solutionArticles = articles.filter((a) => a.category === 'solutions');
  if (solutionArticles.length === 0) return null;

  return (
    <section className="mb-12 bg-emerald-50/40 dark:bg-emerald-950/15 p-5 sm:p-7 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-emerald-200 dark:border-emerald-900/60">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-bold mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>من رصد الأزمات إلى توثيق النجاحات</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            قسم صحافة الحلول (Solutions Journalism)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
            تحقيقات استقصائية توثق التجارب الميدانية والحلول المجتمعية المجرّبة في مصر ومحافظة المنيا بالأدلة والأرقام
          </p>
        </div>

        <button
          onClick={() => onSelectCategory('solutions')}
          className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
        >
          <span>كل تقارير صحافة الحلول</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {solutionArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => onOpenArticle(art)}
            className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:border-emerald-600/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="sm:col-span-5 aspect-16/10 sm:aspect-auto sm:h-full overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-emerald-800/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    صحافة الحلول
                  </div>
                </div>

                <div className="sm:col-span-7 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1.5">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {art.subCategory}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{art.publishedAt}</span>
                  </div>

                  <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-3">
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              {/* Solutions Framework Breakdown */}
              {art.solutionMeta && (
                <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800">
                    <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200 mb-1">
                      <Target className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>المشكلة والحل الميداني:</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-2">
                      {art.solutionMeta.response}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/60">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                      <span>الأثر والنتائج الموثقة:</span>
                    </div>
                    <p className="text-[11px] text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed line-clamp-2">
                      {art.solutionMeta.impact}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 sm:px-5 py-2.5 bg-stone-50 dark:bg-stone-850 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>بقلم: {art.author.name}</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <span>قراءة ملف الحل كاملاً</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
