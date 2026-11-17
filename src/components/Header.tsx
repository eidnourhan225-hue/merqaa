import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  Sun,
  Moon,
  Newspaper,
  GraduationCap,
  Menu,
  X,
  MapPin,
  CloudSun,
  ChevronDown,
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES, MINYA_CENTERS } from '../data/newsData';
import { getEgyptDateInfo } from '../utils/prayerTimes';
import { MerqabLogo } from './MerqabLogo';

interface HeaderProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  selectedCenter: string | null;
  onSelectCenter: (centerId: string | null) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenProjectModal: () => void;
  onOpenEPaperModal: () => void;
  onOpenBookmarks: () => void;
  savedArticlesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  selectedCenter,
  onSelectCenter,
  isDarkMode,
  onToggleDarkMode,
  onOpenProjectModal,
  onOpenEPaperModal,
  onOpenBookmarks,
  savedArticlesCount,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCentersDropdown, setShowCentersDropdown] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dateInfo = getEgyptDateInfo(now);
  const todayArabic = dateInfo.hijriFull
    ? `${dateInfo.gregorianFull} • ${dateInfo.hijriFull}`
    : dateInfo.gregorianFull;

  return (
    <header className="w-full bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors z-30">
      {/* 1. Top Operational Utility Ribbon */}
      <div className="bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Date & Weather */}
          <div className="flex items-center gap-4 text-[12px] font-medium">
            <span className="hidden sm:inline font-mono">{todayArabic}</span>
            <span className="sm:hidden font-mono">{dateInfo.gregorianShort}</span>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>المنيا: 24°C</span>
              <span className="text-stone-400 dark:text-stone-600">/</span>
              <span>القاهرة: 26°C</span>
            </div>
          </div>

          {/* Utility Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Graduation Project Tag / Modal */}
            <button
              onClick={onOpenProjectModal}
              className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors"
              title="تفاصيل مشروع التخرج - كلية الآداب قسم الإعلام شعبة الصحافة"
            >
              <GraduationCap className="w-4 h-4 text-red-700 dark:text-red-400" />
              <span className="hidden md:inline">مشروع تخرج إعلام المنيا</span>
              <span className="md:hidden">مشروع التخرج</span>
            </button>

            <span className="text-stone-300 dark:text-stone-700">|</span>

            {/* E-Paper Modal */}
            <button
              onClick={onOpenEPaperModal}
              className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors"
              title="تصفح النسخة الورقية التجريبية لمشروع التخرج"
            >
              <Newspaper className="w-4 h-4 text-stone-700 dark:text-stone-300" />
              <span className="hidden sm:inline">النسخة الورقية (PDF)</span>
              <span className="sm:hidden">الورقي</span>
            </button>

            <span className="text-stone-300 dark:text-stone-700">|</span>

            {/* Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors relative"
              title="المقالات المحفوظة للقراءة لاحقاً"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">المحفوظات</span>
              {savedArticlesCount > 0 && (
                <span className="bg-red-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {savedArticlesCount}
                </span>
              )}
            </button>

            <span className="text-stone-300 dark:text-stone-700">|</span>

            {/* Dark Mode Switch */}
            <button
              onClick={onToggleDarkMode}
              className="p-1 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 rounded transition-colors"
              title={isDarkMode ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
              aria-label="تبديل الوضع"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Middle Brand Masthead (الترويسة الصحفية العريقة) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-4 sm:pt-4 sm:pb-6">
        {/* Editorial Leadership Ribbon (رئاسة مجلس الإدارة ورئاسة التحرير) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 py-1.5 px-3.5 bg-stone-100 dark:bg-stone-850 rounded-lg border border-stone-200 dark:border-stone-800/80 text-[11px] sm:text-xs text-stone-700 dark:text-stone-300 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 dark:text-stone-400 font-medium">رئيس مجلس الإدارة:</span>
            <span className="font-bold text-stone-900 dark:text-stone-100">أ.د. إبراهيم حسن أبو الخير</span>
          </div>
          <span className="text-stone-300 dark:text-stone-700 hidden md:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-stone-500 dark:text-stone-400 font-medium">رئيس التحرير:</span>
            <span className="font-bold text-red-800 dark:text-red-400">أ.د. رحاب أنور</span>
          </div>
          <span className="text-stone-300 dark:text-stone-700 hidden lg:inline">|</span>
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
            <span>كلية الآداب - قسم الإعلام - شعبة الصحافة</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          {/* Right Pillar: Academic & Regional Badge */}
          <div className="text-center md:text-right order-2 md:order-1">
            <div className="text-[12px] text-stone-500 dark:text-stone-400 font-medium leading-tight">
              جامعة المنيا • كلية الآداب
            </div>
            <div className="text-xs text-stone-700 dark:text-stone-300 font-semibold">
              قسم الإعلام • شعبة الصحافة
            </div>
            <div className="text-[11px] text-red-700 dark:text-red-400 font-mono mt-0.5">
              مشروع تخرج الفرقة الرابعة (2026)
            </div>
          </div>

          {/* Center: The Iconic Masthead (شعار واسم الجريدة) */}
          <div className="text-center order-1 md:order-2 flex flex-col items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                onSelectCenter(null);
              }}
              className="group flex items-center justify-center gap-3 sm:gap-4"
            >
              <MerqabLogo className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0 drop-shadow-md transition-transform duration-300 group-hover:scale-105" />
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-50 group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors drop-shadow-sm">
                مِـرْقَـاب
              </h1>
            </a>
            <p className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400 mt-1.5 max-w-md">
              صحيفة إخبارية شاملة • ترصد نبض مصر وعروس الصعيد المنيا
            </p>
          </div>

          {/* Left Pillar: Quick Search & Quote */}
          <div className="w-full md:w-auto order-3 flex items-center justify-center md:justify-end gap-2">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="ابحث في أرشيف مرقاب والأخبار..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-stone-100 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-1.5 pl-8 text-xs text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-red-700"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Primary Horizontal Category Navigation Bar */}
      <div className="border-b border-stone-300 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-950/90 sticky top-0 backdrop-blur-md z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-between gap-1 overflow-x-auto py-1">
            {/* Category tabs */}
            <div className="flex items-center gap-1 shrink-0">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id && !selectedCenter;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onSelectCenter(null);
                    }}
                    className={`whitespace-nowrap shrink-0 px-2.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                      isActive
                        ? 'bg-red-800 text-white shadow-xs'
                        : 'text-stone-700 dark:text-stone-300 hover:text-red-700 dark:hover:text-red-400 hover:bg-stone-200/60 dark:hover:bg-stone-800/60'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Minya Centers Dropdown Filter */}
            <div className="relative shrink-0 mr-2 border-r border-stone-300 dark:border-stone-700 pr-2">
              <button
                onClick={() => setShowCentersDropdown(!showCentersDropdown)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                  selectedCenter
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-emerald-600'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {selectedCenter
                    ? `مركز: ${MINYA_CENTERS.find((c) => c.id === selectedCenter)?.name}`
                    : 'مراكز المنيا (9)'}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Dropdown Menu */}
              {showCentersDropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-xl py-2 z-40 text-right animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase border-b border-stone-100 dark:border-stone-800 mb-1">
                    اختر مركزاً بمحافظة المنيا
                  </div>
                  <button
                    onClick={() => {
                      onSelectCenter(null);
                      setShowCentersDropdown(false);
                    }}
                    className={`w-full text-right px-3 py-1.5 text-xs hover:bg-stone-100 dark:hover:bg-stone-800 ${
                      !selectedCenter ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    جميع مراكز المنيا (شامل)
                  </button>
                  {MINYA_CENTERS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCenter(c.id);
                        onSelectCategory('minya');
                        setShowCentersDropdown(false);
                      }}
                      className={`w-full text-right px-3 py-1.5 text-xs hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-between ${
                        selectedCenter === c.id ? 'font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' : 'text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{c.famousFor.slice(0, 16)}...</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 px-4 py-3">
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id && !selectedCenter;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onSelectCenter(null);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-right px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                      isActive
                        ? 'bg-red-800 text-white'
                        : 'text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/60'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-stone-200 dark:border-stone-800 pt-2">
              <div className="text-[11px] font-bold text-stone-500 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>أخبار مراكز المنيا:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {MINYA_CENTERS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCenter(c.id);
                      onSelectCategory('minya');
                      setMobileMenuOpen(false);
                    }}
                    className={`text-xs px-2.5 py-1 rounded border ${
                      selectedCenter === c.id
                        ? 'bg-emerald-800 text-white border-emerald-900'
                        : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
