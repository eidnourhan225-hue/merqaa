import React from 'react';
import { MapPin, Building, Landmark, Compass, ChevronLeft } from 'lucide-react';
import { MinyaCenter, Article } from '../types';
import { MINYA_CENTERS } from '../data/newsData';

interface MinyaGovernorateSectionProps {
  selectedCenter: string | null;
  onSelectCenter: (centerId: string | null) => void;
  articles: Article[];
  onOpenArticle: (article: Article) => void;
}

export const MinyaGovernorateSection: React.FC<MinyaGovernorateSectionProps> = ({
  selectedCenter,
  onSelectCenter,
  articles,
  onOpenArticle,
}) => {
  const currentCenterObj = MINYA_CENTERS.find((c) => c.id === selectedCenter);

  // Filter articles related to Minya or active center
  const minyaArticles = articles.filter((a) => {
    if (selectedCenter && currentCenterObj) {
      return (
        a.title.includes(currentCenterObj.name) ||
        a.summary.includes(currentCenterObj.name) ||
        (a.location && a.location.includes(currentCenterObj.name)) ||
        a.category === 'minya'
      );
    }
    return a.category === 'minya';
  });

  return (
    <section className="mb-12 bg-stone-100/70 dark:bg-stone-900/40 p-5 sm:p-7 rounded-2xl border border-stone-200 dark:border-stone-800">
      {/* Header of Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-300 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>نافذة عروس الصعيد الميدانية</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            أخبار محافظة المنيا ومراكزها التسعة
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
            تغطية يومية معمقة للمشروعات التنموية، المبادرات الرئاسية، وهموم المواطنين في كل مركز وقرية
          </p>
        </div>

        {/* Center reset or indicator */}
        <div className="flex items-center gap-2">
          {selectedCenter && (
            <button
              onClick={() => onSelectCenter(null)}
              className="text-xs bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-3 py-1.5 rounded-lg hover:bg-stone-300 transition-colors"
            >
              عرض كافة المراكز
            </button>
          )}
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-800 px-2.5 py-1 rounded-md border border-stone-200 dark:border-stone-700">
            9 مراكز • 3229 قرية وتابع
          </span>
        </div>
      </div>

      {/* Centers Selector Carousel / Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 mb-6">
        {MINYA_CENTERS.map((center) => {
          const isSelected = selectedCenter === center.id;
          return (
            <button
              key={center.id}
              onClick={() => onSelectCenter(isSelected ? null : center.id)}
              className={`p-2.5 rounded-xl text-center transition-all flex flex-col items-center justify-center border ${
                isSelected
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-md scale-105'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:shadow-xs'
              }`}
            >
              <MapPin
                className={`w-3.5 h-3.5 mb-1 ${
                  isSelected ? 'text-amber-300' : 'text-emerald-600 dark:text-emerald-400'
                }`}
              />
              <span className="text-xs font-bold leading-tight">{center.name}</span>
              <span
                className={`text-[10px] mt-0.5 ${
                  isSelected ? 'text-emerald-100' : 'text-stone-400'
                }`}
              >
                {center.tagline.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Center Spotlight Banner if selected */}
      {currentCenterObj && (
        <div className="mb-6 p-4 bg-emerald-950 text-emerald-50 rounded-xl border border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-900 rounded-lg text-emerald-300">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>مركز {currentCenterObj.name}</span>
                <span className="text-emerald-300 text-xs font-normal">({currentCenterObj.tagline})</span>
              </h3>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                أبرز المعالم والخصوصية: {currentCenterObj.famousFor}
              </p>
            </div>
          </div>
          <div className="text-xs bg-emerald-900/60 text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-700/60">
            تغطية صحفية ميدانية مباشرة لـ «مرقاب»
          </div>
        </div>
      )}

      {/* Grid of Minya News Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {minyaArticles.slice(0, 3).map((article) => (
          <article
            key={article.id}
            onClick={() => onOpenArticle(article)}
            className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:border-emerald-600/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 bg-emerald-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                  {article.subCategory || 'أخبار المنيا'}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1.5">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{article.location || 'محافظة المنيا'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                </div>

                <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>{article.readingTimeMinutes} دقائق قراءة</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-[-3px] transition-transform">
                <span>تفاصيل الخبر</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
