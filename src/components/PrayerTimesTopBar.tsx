import React, { useState, useEffect } from 'react';
import { Clock, BellRing, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';
import { calculateEgyptPrayerTimes, CityKey } from '../utils/prayerTimes';

export const PrayerTimesTopBar: React.FC = () => {
  const [activeCity, setActiveCity] = useState<CityKey>('minya');
  const [now, setNow] = useState<Date>(() => new Date());
  const [dayOffset, setDayOffset] = useState<number>(0);

  // Update clock every 15 seconds so date rollover at midnight and next prayer highlight happen automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const targetDate = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
  const { prayers, nextPrayer, countdownText, dateInfo } = calculateEgyptPrayerTimes(activeCity, targetDate);

  const cityTitle =
    activeCity === 'minya'
      ? 'مواقيت الصلاة في عروس الصعيد (محافظة المنيا)'
      : 'مواقيت الصلاة في محافظة القاهرة';

  return (
    <div className="h-full bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-stone-100 dark:border-stone-800">
        {/* Title and Dynamic Date Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                {cityTitle}
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                <BellRing className="w-3 h-3" />
                <span>تحديث تلقائي يومي</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-stone-700 dark:text-stone-300">{dateInfo.gregorianFull}</span>
              {dateInfo.hijriFull && (
                <>
                  <span>•</span>
                  <span>{dateInfo.hijriFull}</span>
                </>
              )}
              <span>•</span>
              <span>بحسب الهيئة المصرية العامة للمساحة</span>
            </p>
          </div>
        </div>

        {/* City Switch, Date Stepper & Upcoming Prayer Highlight */}
        <div className="flex flex-wrap items-center gap-2 self-stretch xl:self-auto justify-between xl:justify-end">
          {/* Next Prayer Badge (shown for Today) */}
          {dayOffset === 0 && (
            <div className="flex items-center gap-2 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 px-3 py-1.5 rounded-xl text-xs text-emerald-900 dark:text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span className="font-medium">القادمة:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {nextPrayer.name} ({nextPrayer.time})
              </span>
              <span className="hidden 2xl:inline text-[11px] text-emerald-700/80 dark:text-emerald-300/80">
                · {countdownText}
              </span>
            </div>
          )}

          {/* Day Stepper (Yesterday / Today / Tomorrow) */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setDayOffset((d) => d - 1)}
              className="p-1 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-900 rounded-lg transition-colors"
              title="مواقيت اليوم السابق"
              aria-label="اليوم السابق"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDayOffset(0)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                dayOffset === 0
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
              title="العودة لتوقيت اليوم التلقائي"
            >
              <Calendar className="w-3 h-3" />
              <span>{dayOffset === 0 ? 'اليوم' : dateInfo.gregorianShort}</span>
            </button>
            <button
              onClick={() => setDayOffset((d) => d + 1)}
              className="p-1 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-900 rounded-lg transition-colors"
              title="مواقيت اليوم التالي"
              aria-label="اليوم التالي"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* City Selector Buttons */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveCity('minya')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeCity === 'minya'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              المنيا
            </button>
            <button
              onClick={() => setActiveCity('cairo')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeCity === 'cairo'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              القاهرة
            </button>
          </div>
        </div>
      </div>

      {/* The 6 Prayer Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
        {prayers.map((prayer) => {
          const isNext = dayOffset === 0 && prayer.isNext;
          return (
            <div
              key={prayer.englishKey}
              className={`relative p-3 rounded-xl border text-center transition-all flex flex-col justify-between ${
                isNext
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/30'
                  : 'bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              {isNext && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 font-bold text-[9px] px-2 py-0.2 rounded-full uppercase tracking-wider shadow-xs">
                  القادمة
                </span>
              )}
              <div className="text-xs font-bold mb-1 flex items-center justify-center gap-1">
                <span>{prayer.name}</span>
              </div>
              <div
                className={`font-mono text-base font-bold tracking-tight tabular-nums ${
                  isNext ? 'text-amber-100' : 'text-stone-900 dark:text-stone-50'
                }`}
              >
                {prayer.time}
              </div>
              <div
                className={`text-[10px] mt-1 ${
                  isNext ? 'text-emerald-100' : 'text-stone-400'
                }`}
              >
                {activeCity === 'minya' ? 'توقيت المنيا' : 'توقيت القاهرة'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
