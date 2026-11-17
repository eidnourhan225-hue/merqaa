import React from 'react';
import { GraduationCap, Users, ArrowLeft, Clock, MessageSquare, Award } from 'lucide-react';
import { Article } from '../types';

interface UniversityAndStreetSectionProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onSelectCategory: (category: any) => void;
}

export const UniversityAndStreetSection: React.FC<UniversityAndStreetSectionProps> = ({
  articles,
  onOpenArticle,
  onSelectCategory,
}) => {
  const univArticles = articles.filter((a) => a.category === 'universities');
  const streetArticles = articles.filter((a) => a.category === 'street');

  const leadUniv = univArticles[0];
  const leadStreet = streetArticles[0];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Block 1: أخبار الجامعات والتعليم العالي */}
        <div className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  أخبار الجامعات والتعليم العالي
                </h3>
                <span className="text-[11px] text-stone-500">جامعة المنيا • كلية الآداب • البحث العلمي</span>
              </div>
            </div>
            <button
              onClick={() => onSelectCategory('universities')}
              className="text-xs text-blue-700 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>المزيد</span>
              <ArrowLeft className="w-3 h-3" />
            </button>
          </div>

          {/* Lead Univ Story */}
          {leadUniv && (
            <div className="flex-1 flex flex-col justify-between">
              <div
                className="group cursor-pointer"
                onClick={() => onOpenArticle(leadUniv)}
              >
                <div className="aspect-16/9 rounded-xl overflow-hidden mb-3 relative bg-stone-100 dark:bg-stone-800">
                  <img
                    src={leadUniv.imageUrl}
                    alt={leadUniv.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-blue-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                    شعبة الصحافة 2026
                  </div>
                </div>

                <div className="text-xs text-blue-700 dark:text-blue-400 font-medium mb-1">
                  {leadUniv.kicker}
                </div>
                <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {leadUniv.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                  {leadUniv.summary}
                </p>
              </div>

              {/* Secondary Univ Items */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
                {univArticles.slice(1, 3).map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => onOpenArticle(sub)}
                    className="group cursor-pointer flex items-center justify-between text-xs py-1 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="font-semibold text-stone-800 dark:text-stone-200 line-clamp-1 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                      • {sub.title}
                    </span>
                    <span className="text-[11px] text-stone-400 shrink-0 font-mono mr-2">{sub.publishedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Block 2: نبض الشارع وصوت المواطن */}
        <div className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  نبض الشارع وصوت المواطن
                </h3>
                <span className="text-[11px] text-stone-500">تحقيقات ميدانية • حكايات الأسواق • هموم القرى</span>
              </div>
            </div>
            <button
              onClick={() => onSelectCategory('street')}
              className="text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>المزيد</span>
              <ArrowLeft className="w-3 h-3" />
            </button>
          </div>

          {/* Lead Street Story */}
          {leadStreet && (
            <div className="flex-1 flex flex-col justify-between">
              <div
                className="group cursor-pointer"
                onClick={() => onOpenArticle(leadStreet)}
              >
                <div className="aspect-16/9 rounded-xl overflow-hidden mb-3 relative bg-stone-100 dark:bg-stone-800">
                  <img
                    src={leadStreet.imageUrl}
                    alt={leadStreet.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-amber-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                    تحقيق ميداني خاص
                  </div>
                </div>

                <div className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-1">
                  {leadStreet.kicker}
                </div>
                <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {leadStreet.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                  {leadStreet.summary}
                </p>
              </div>

              {/* Citizen Voice Box */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/60 flex items-center justify-between text-xs text-stone-700 dark:text-stone-300">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>نافذة «صوتك واصل»: شاركنا شكاوى ومقترحات حيك أو قريتك بالمنيا</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 shrink-0 cursor-pointer hover:underline">
                    أرسل شكواك
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
