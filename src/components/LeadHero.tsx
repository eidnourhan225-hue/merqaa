import React from 'react';
import { Volume2, Bookmark, Share2, Clock, MapPin, Eye, ArrowLeft, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface LeadHeroProps {
  leadArticle: Article;
  companionArticles: Article[];
  onOpenArticle: (article: Article) => void;
  onBookmarkArticle: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onListenAudio: (article: Article) => void;
}

export const LeadHero: React.FC<LeadHeroProps> = ({
  leadArticle,
  companionArticles,
  onOpenArticle,
  onBookmarkArticle,
  isBookmarked,
  onListenAudio,
}) => {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Dominant Main Lead Story (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col bg-white dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow group">
          {/* Main Hero Image with Scrim */}
          <div
            className="relative w-full aspect-16/9 overflow-hidden cursor-pointer"
            onClick={() => onOpenArticle(leadArticle)}
          >
            <img
              src={leadArticle.imageUrl}
              alt={leadArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

            {/* Overlaid Badges & Location */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="bg-red-800 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                مانشيت مِرقاب الرئيسي
              </span>
              {leadArticle.location && (
                <span className="bg-black/60 backdrop-blur-md text-stone-200 text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1 border border-white/10">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>{leadArticle.location}</span>
                </span>
              )}
            </div>

            {/* Overlaid Bottom Title on Mobile / Semi-overlaid on Desktop */}
            <div className="absolute bottom-4 right-4 left-4 text-white">
              <div className="text-amber-300 text-xs font-semibold mb-1 flex items-center gap-2">
                <span>{leadArticle.kicker}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.subCategory}</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white drop-shadow-md group-hover:text-amber-100 transition-colors">
                {leadArticle.title}
              </h2>
            </div>
          </div>

          {/* Lead Story Body & Editorial Controls */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3 mb-4">
                {leadArticle.summary}
              </p>

              {/* Quote Highlight Box */}
              {leadArticle.quote && (
                <blockquote className="my-3 p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-lg border-r-2 border-red-700 text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic">
                  «{leadArticle.quote.text}»
                  <footer className="text-[11px] text-stone-500 dark:text-stone-400 not-italic font-medium mt-1">
                    — {leadArticle.quote.author}
                  </footer>
                </blockquote>
              )}
            </div>

            {/* Clean Unboxed Metadata & Action Buttons */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
              {/* Byline & Read time */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  بقلم: {leadArticle.author.name}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{leadArticle.publishedAt}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.readingTimeMinutes} دقائق قراءة</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onListenAudio(leadArticle)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg transition-colors font-medium text-xs"
                  title="استمع إلى التقرير صوتياً"
                >
                  <Volume2 className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
                  <span>استمع</span>
                </button>

                <button
                  onClick={() => onBookmarkArticle(leadArticle.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isBookmarked(leadArticle.id)
                      ? 'bg-red-50 dark:bg-red-950/60 text-red-700 border-red-200'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700'
                  }`}
                  title={isBookmarked(leadArticle.id) ? 'إزالة من المحفوظات' : 'حفظ التقرير'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenArticle(leadArticle)}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold text-xs shadow-xs"
                >
                  <span>اقرأ التقرير كاملاً</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Salience Column: Companion Feature Stories (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-700" />
              <span>مختارات هيئة التحرير</span>
            </h3>
            <span className="text-[11px] font-mono text-stone-400">تحديث مستمر</span>
          </div>

          {/* Companion list */}
          <div className="flex-1 flex flex-col gap-3">
            {companionArticles.slice(0, 3).map((article, idx) => (
              <article
                key={article.id}
                onClick={() => onOpenArticle(article)}
                className="group p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-red-600/40 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5">
                    <span className="font-medium text-red-700 dark:text-red-400">
                      {article.kicker || article.subCategory}
                    </span>
                    <span className="text-[11px] font-mono">{article.publishedAt}</span>
                  </div>

                  <div className="flex gap-3 items-start">
                    {article.imageUrl && (
                      <div className="w-20 h-20 sm:w-24 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-editorial text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                  <span>بقلم: {article.author.name}</span>
                  <span className="flex items-center gap-1 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors font-medium">
                    <span>قراءة الخبر</span>
                    <ArrowLeft className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Academic Project Notice Card */}
          <div className="p-3.5 bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-xl border border-stone-800 shadow-sm flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] text-amber-300 font-semibold">جامعة المنيا • قسم الإعلام</div>
              <div className="text-xs font-bold text-stone-100">صحيفة مِرقاب - مشروع تخرج متميز 2026</div>
            </div>
            <div className="shrink-0 text-[11px] bg-red-800 text-white px-2.5 py-1 rounded font-medium">
              شعبة الصحافة
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
