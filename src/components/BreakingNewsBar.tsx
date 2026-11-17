import React, { useState, useEffect } from 'react';
import { Bell, ChevronLeft, ChevronRight, Pause, Play, Flame } from 'lucide-react';
import { BREAKING_NEWS } from '../data/newsData';

interface BreakingNewsBarProps {
  onSelectArticleTitle?: (title: string) => void;
}

export const BreakingNewsBar: React.FC<BreakingNewsBarProps> = ({ onSelectArticleTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentItem = BREAKING_NEWS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BREAKING_NEWS.length) % BREAKING_NEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS.length);
  };

  return (
    <div className="bg-red-800 text-white border-b border-red-900 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-3 text-sm">
          {/* Label Tag */}
          <div className="flex items-center gap-2 shrink-0 bg-red-950/80 px-3 py-1 rounded text-xs font-bold tracking-wider uppercase border border-red-700/60 shadow-inner">
            <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-amber-200">عاجل مِرقاب</span>
            <span className="text-red-300 hidden sm:inline">|</span>
            <span className="text-red-200 text-[11px] hidden sm:inline">
              {currentIndex + 1} من {BREAKING_NEWS.length}
            </span>
          </div>

          {/* Active News Item */}
          <div
            className="flex-1 overflow-hidden cursor-pointer group py-0.5"
            onClick={() => onSelectArticleTitle && onSelectArticleTitle(currentItem.title)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center gap-2 truncate transition-all duration-300">
              <span className="text-xs bg-red-700/80 text-amber-100 px-1.5 py-0.5 rounded text-[11px] font-medium shrink-0">
                {currentItem.category}
              </span>
              <p className="truncate text-sm font-medium text-stone-100 group-hover:text-amber-200 group-hover:underline transition-colors">
                {currentItem.title}
              </p>
              <span className="text-xs text-red-200/80 shrink-0 hidden md:inline">
                ({currentItem.time})
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0 text-red-200">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 hover:bg-red-700 rounded transition-colors text-red-100"
              title={isPaused ? 'تشغيل التمرير التلقائي' : 'إيقاف مؤقت'}
              aria-label={isPaused ? 'تشغيل' : 'إيقاف'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-red-700 rounded transition-colors text-red-100"
              title="الخبر السابق"
              aria-label="السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-red-700 rounded transition-colors text-red-100"
              title="الخبر التالي"
              aria-label="التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
