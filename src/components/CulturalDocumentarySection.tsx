import React from 'react';
import { BookOpen, Sparkles, Feather, ArrowLeft, Eye, Clock } from 'lucide-react';
import { Article } from '../types';

interface CulturalDocumentarySectionProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
}

export const CulturalDocumentarySection: React.FC<CulturalDocumentarySectionProps> = ({
  articles,
  onOpenArticle,
}) => {
  const cultureArticles = articles.filter((a) => a.category === 'culture');
  const mainFeature = cultureArticles[0];

  if (!mainFeature) return null;

  return (
    <section className="mb-12">
      {/* Editorial Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-300 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Feather className="w-4 h-4" />
            <span>ذاكرة التاريخ وملفات التراث</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            القسم الثقافي والوثائقي: ملتقى الحضارات
          </h2>
        </div>
        <div className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block font-mono">
          أرشيف مرقاب الوثائقي
        </div>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-stone-900 text-stone-100 rounded-2xl overflow-hidden border border-stone-800 shadow-lg">
        {/* Visual column with archival image */}
        <div
          className="lg:col-span-5 relative overflow-hidden cursor-pointer group min-h-[300px] lg:min-h-[420px]"
          onClick={() => onOpenArticle(mainFeature)}
        >
          <img
            src={mainFeature.imageUrl}
            alt={mainFeature.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
          <div className="absolute bottom-4 right-4 left-4">
            <span className="text-[11px] font-mono text-amber-300/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
              {mainFeature.imageCaption || 'آثار تل العمارنة وتونا الجبل بالمنيا'}
            </span>
          </div>
        </div>

        {/* Story Prose & Context (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 mb-2 font-medium">
              <span>{mainFeature.kicker}</span>
              <span aria-hidden="true">·</span>
              <span>{mainFeature.subCategory}</span>
            </div>

            <h3
              onClick={() => onOpenArticle(mainFeature)}
              className="font-editorial text-2xl sm:text-3xl font-bold leading-tight text-white hover:text-amber-200 transition-colors cursor-pointer mb-3"
            >
              {mainFeature.title}
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4">
              {mainFeature.summary}
            </p>

            {/* Cultural Footnote / Quote */}
            <div className="p-3.5 bg-stone-800/80 rounded-xl border border-stone-700/60 mb-4 text-xs text-stone-300 leading-relaxed italic">
              «المنيا ليست مجرد أرض زراعية، بل هي مهد التوحيد الأخناتوني ومسقط رأس عميد الأدب العربي طه حسين الذي قهر الظلام بنور البصيرة والمعرفة».
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
            <div className="flex items-center gap-3">
              <span>بقلم: {mainFeature.author.name}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{mainFeature.readingTimeMinutes} دقائق قراءة</span>
              </span>
            </div>

            <button
              onClick={() => onOpenArticle(mainFeature)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors text-xs shadow-md"
            >
              <span>تصفح الملف الوثائقي</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
