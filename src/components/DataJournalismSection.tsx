import React, { useState } from 'react';
import { BarChart3, ArrowLeft, Database, TrendingUp } from 'lucide-react';
import { Article, CategoryId } from '../types';
import { DATA_JOURNALISM_DATASETS } from '../data/newsData';

interface DataJournalismSectionProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onSelectCategory: (id: CategoryId) => void;
}

export const DataJournalismSection: React.FC<DataJournalismSectionProps> = ({
  articles,
  onOpenArticle,
  onSelectCategory,
}) => {
  const [activeDatasetId, setActiveDatasetId] = useState<string>(DATA_JOURNALISM_DATASETS[0].id);

  const dataArticles = articles.filter((a) => a.category === 'data');
  const activeDataset =
    DATA_JOURNALISM_DATASETS.find((d) => d.id === activeDatasetId) || DATA_JOURNALISM_DATASETS[0];

  const maxValue = Math.max(...activeDataset.points.map((p) => p.value), 1);

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-6 border-b border-stone-300 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 text-xs font-bold mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>وحدة تحليل البيانات والإنفوجرافيك الصحفي</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            قسم صحافة البيانات (Data Journalism)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
            قراءة قصصية في الأرقام والإحصائيات الرسمية لمحافظة المنيا ومؤشرات التنمية في الصعيد
          </p>
        </div>

        <button
          onClick={() => onSelectCategory('data')}
          className="text-xs font-bold text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1 shrink-0"
        >
          <span>كل تحقيقات صحافة البيانات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Chart + Companion Articles Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Chart Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            {/* Dataset Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
              {DATA_JOURNALISM_DATASETS.map((ds, idx) => {
                const isSelected = ds.id === activeDataset.id;
                const shortLabels = ['مشروعات المراكز', 'صادرات النباتات العطرية', 'التحول الرقمي الجامعي'];
                return (
                  <button
                    key={ds.id}
                    onClick={() => setActiveDatasetId(ds.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-sky-800 text-white shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {shortLabels[idx] || ds.title}
                  </button>
                );
              })}
            </div>

            {/* Active Dataset Title + Key Stat */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {activeDataset.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {activeDataset.subtitle}
                </p>
              </div>

              <div className="bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 rounded-xl px-4 py-2.5 text-center shrink-0">
                <div className="font-mono text-2xl font-extrabold text-sky-800 dark:text-sky-300 tabular-nums">
                  {activeDataset.keyStatValue}
                </div>
                <div className="text-[10px] font-semibold text-sky-700 dark:text-sky-400">
                  {activeDataset.keyStatLabel}
                </div>
              </div>
            </div>

            {/* Interactive Bar Chart Rows */}
            <div className="space-y-3">
              {activeDataset.points.map((pt, i) => {
                const widthPercent = Math.max(8, Math.round((pt.value / maxValue) * 100));
                return (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-800 dark:text-stone-200">
                          {pt.label}
                        </span>
                        {pt.note && (
                          <span className="hidden sm:inline text-[11px] text-stone-400">
                            · {pt.note}
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-bold text-sky-800 dark:text-sky-300 tabular-nums">
                        {pt.value.toLocaleString('en-US')} {pt.unit}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-sky-700 to-sky-500 dark:from-sky-500 dark:to-sky-400 rounded-full transition-all duration-500 group-hover:from-red-700 group-hover:to-amber-500"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-sky-600" />
              <span>المصدر: {activeDataset.source}</span>
            </span>
            <span className="font-mono">آخر تحديث: {activeDataset.updatedAt}</span>
          </div>
        </div>

        {/* Companion Data Journalism Reports (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {dataArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className="flex-1 group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 hover:border-sky-600/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span className="font-bold text-sky-700 dark:text-sky-400">
                    {art.subCategory || 'صحافة البيانات'}
                  </span>
                  <span className="font-mono text-[11px]">{art.publishedAt}</span>
                </div>

                <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-sky-800 dark:group-hover:text-sky-400 transition-colors mb-2">
                  {art.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-3">
                  {art.summary}
                </p>

                {art.dataHighlight && (
                  <div className="p-3 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                        {art.dataHighlight.metricLabel}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {art.dataHighlight.source}
                      </div>
                    </div>
                    <div className="font-mono text-2xl font-extrabold text-sky-700 dark:text-sky-400 tabular-nums shrink-0">
                      {art.dataHighlight.metricValue}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>بقلم: {art.author.name}</span>
                <span className="font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1">
                  <span>تفاصيل التحليل الرقمي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
