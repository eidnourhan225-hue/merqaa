import React, { useState } from 'react';
import {
  TrendingUp,
  Landmark,
  Trophy,
  ShieldAlert,
  HeartPulse,
  ArrowLeft,
  Coins,
  ChevronLeft,
} from 'lucide-react';
import { Article, CategoryId } from '../types';
import { MARKET_RATES } from '../data/newsData';

interface MultiCategorySectionProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onSelectCategory: (category: CategoryId) => void;
}

export const MultiCategorySection: React.FC<MultiCategorySectionProps> = ({
  articles,
  onOpenArticle,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'politics' | 'economy' | 'sports' | 'accidents' | 'health'>('politics');

  const politicsArticles = articles.filter((a) => a.category === 'politics');
  const economyArticles = articles.filter((a) => a.category === 'economy');
  const sportsArticles = articles.filter((a) => a.category === 'sports');
  const accidentsArticles = articles.filter((a) => a.category === 'accidents');
  const healthArticles = articles.filter((a) => a.category === 'health');

  const tabs = [
    { id: 'politics' as const, label: 'السياسة', icon: Landmark, color: 'text-indigo-700 dark:text-indigo-400' },
    { id: 'economy' as const, label: 'الاقتصاد وأسعار الذهب', icon: Coins, color: 'text-teal-700 dark:text-teal-400' },
    { id: 'sports' as const, label: 'الرياضة ونادي المنيا', icon: Trophy, color: 'text-rose-700 dark:text-rose-400' },
    { id: 'accidents' as const, label: 'الحوادث والقضايا', icon: ShieldAlert, color: 'text-stone-700 dark:text-stone-400' },
    { id: 'health' as const, label: 'الصحة والمستشفيات', icon: HeartPulse, color: 'text-cyan-700 dark:text-cyan-400' },
  ];

  const getActiveList = () => {
    switch (activeTab) {
      case 'politics':
        return politicsArticles;
      case 'economy':
        return economyArticles;
      case 'sports':
        return sportsArticles;
      case 'accidents':
        return accidentsArticles;
      case 'health':
        return healthArticles;
      default:
        return politicsArticles;
    }
  };

  const currentList = getActiveList();

  return (
    <section className="mb-12">
      {/* Tab bar header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 mb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            أقسام مِرقاب التخصصية
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            تغطية حية لملفات السياسة والاقتصاد والرياضة والحوادث والصحة
          </p>
        </div>

        {/* Tab Buttons (Button elements per anti-slop guidelines) */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main articles listing (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {currentList.map((art) => (
            <article
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className="group bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 justify-between items-start"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    {art.subCategory || art.kicker}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{art.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.publishedAt}</span>
                </div>

                <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-stone-400">
                  <span>بقلم: {art.author.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readingTimeMinutes} دقائق قراءة</span>
                </div>
              </div>

              {art.imageUrl && (
                <div className="w-full sm:w-36 h-28 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </article>
          ))}

          {/* Section Direct Link */}
          <div className="text-center pt-2">
            <button
              onClick={() => onSelectCategory(activeTab)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400 hover:underline"
            >
              <span>تصفح كافة تقارير قسم {tabs.find((t) => t.id === activeTab)?.label}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sidebar Companion (4 cols): Live Market/Gold rates or League Table */}
        <div className="lg:col-span-4 space-y-5">
          {/* Live Market & Gold Card */}
          <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  أسعار الذهب والعملات (مصر والصعيد)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">مباشر</span>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-stone-800/80">
              {MARKET_RATES.map((rate, i) => (
                <div key={i} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{rate.item}</span>
                    <span className="text-[10px] text-stone-400 block font-mono">
                      شراء: {rate.buyPrice}
                    </span>
                  </div>
                  <div className="text-left font-mono">
                    <span className="font-bold text-stone-900 dark:text-stone-100 block">{rate.sellPrice}</span>
                    <span className={`text-[10px] ${rate.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {rate.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-[10px] text-stone-400 text-center">
              تحديث مستمر عبر قسم الاقتصاد بجريدة مرقاب
            </div>
          </div>

          {/* Sports Minya Club League Glance */}
          <div className="bg-stone-900 text-white rounded-xl border border-stone-800 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-stone-100">
                  جدول دوري المحترفين (مجموعة الصعيد)
                </h4>
              </div>
              <span className="text-[10px] bg-red-800 text-white px-2 py-0.5 rounded font-bold">
                نادي المنيا
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between bg-stone-800/80 p-2 rounded text-amber-300 font-bold border border-amber-500/20">
                <span>1. نادي المنيا الرياضي</span>
                <span>38 نقطة (صدارة)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 text-stone-300">
                <span>2. بترول أسيوط</span>
                <span>36 نقطة</span>
              </div>
              <div className="flex items-center justify-between p-1.5 text-stone-300">
                <span>3. ديروط الرياضي</span>
                <span>34 نقطة</span>
              </div>
              <div className="flex items-center justify-between p-1.5 text-stone-300">
                <span>4. تليفونات بني سويف</span>
                <span>31 نقطة</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>المباراة القادمة: المنيا × بترول أسيوط</span>
              <span className="text-amber-400 font-bold">السبت 4 م</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
