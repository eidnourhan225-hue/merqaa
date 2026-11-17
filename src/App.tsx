/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BreakingNewsBar } from './components/BreakingNewsBar';
import { LeadHero } from './components/LeadHero';
import { MinyaGovernorateSection } from './components/MinyaGovernorateSection';
import { UniversityAndStreetSection } from './components/UniversityAndStreetSection';
import { CulturalDocumentarySection } from './components/CulturalDocumentarySection';
import { MultiCategorySection } from './components/MultiCategorySection';
import { SolutionsJournalismSection } from './components/SolutionsJournalismSection';
import { DataJournalismSection } from './components/DataJournalismSection';
import { VideosSection } from './components/VideosSection';
import { AddVideoModal, VideoPlayerModal } from './components/VideoStudioModals';
import { PrayerTimesTopBar } from './components/PrayerTimesTopBar';
import { MinyaWeatherCard } from './components/MinyaWeatherCard';
import { ReaderServicesBar } from './components/ReaderServicesBar';
import { ArticleModal } from './components/ArticleModal';
import { GraduationProjectModal } from './components/GraduationProjectModal';
import { EPaperModal } from './components/EPaperModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';
import { ARTICLES, CATEGORIES, MINYA_CENTERS, INITIAL_VIDEOS } from './data/newsData';
import { Article, CategoryId, VideoItem } from './types';
import { Search, MapPin, Filter, RotateCcw } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('merqab_bookmarks');
      return saved ? JSON.parse(saved) : ['art-lead-1'];
    } catch {
      return ['art-lead-1'];
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEPaperModalOpen, setIsEPaperModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const [customVideos, setCustomVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('merqab_custom_videos');
      if (!saved) return [];
      const parsed: VideoItem[] = JSON.parse(saved);
      // Filter out expired blob URLs from previous sessions
      return parsed.filter((v) => v.sourceType !== 'local' && !v.videoUrl.startsWith('blob:'));
    } catch {
      return [];
    }
  });

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('merqab_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  // Sync non-local custom videos to localStorage
  useEffect(() => {
    try {
      const persistable = customVideos.filter(
        (v) => v.sourceType !== 'local' && !v.videoUrl.startsWith('blob:')
      );
      localStorage.setItem('merqab_custom_videos', JSON.stringify(persistable));
    } catch (e) {
      console.error(e);
    }
  }, [customVideos]);

  const handleAddVideo = (newVideo: VideoItem) => {
    setCustomVideos((prev) => [newVideo, ...prev]);
    setSelectedVideo(newVideo);
  };

  const handleDeleteVideo = (id: string) => {
    setCustomVideos((prev) => {
      const target = prev.find((v) => v.id === id);
      if (target && target.sourceType === 'local' && target.videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(target.videoUrl);
      }
      return prev.filter((v) => v.id !== id);
    });
  };

  const allVideos = [...customVideos, ...INITIAL_VIDEOS];

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  // Filtered Articles based on Category, Center, or Search Query
  const filteredArticles = ARTICLES.filter((art) => {
    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSummary = art.summary.toLowerCase().includes(q);
      const matchTags = art.tags.some((t) => t.toLowerCase().includes(q));
      const matchContent = art.content.some((c) => c.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchTags && !matchContent) return false;
    }

    // 2. Minya Center Filter
    if (selectedCenter) {
      const centerObj = MINYA_CENTERS.find((c) => c.id === selectedCenter);
      if (centerObj) {
        const matchesCenter =
          art.title.includes(centerObj.name) ||
          art.summary.includes(centerObj.name) ||
          (art.location && art.location.includes(centerObj.name));
        if (!matchesCenter && art.category !== 'minya') return false;
      }
    }

    // 3. Category Filter
    if (activeCategory !== 'all') {
      if (art.category !== activeCategory) return false;
    }

    return true;
  });

  const filteredVideos = allVideos.filter((vid) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      vid.title.toLowerCase().includes(q) ||
      vid.description.toLowerCase().includes(q) ||
      vid.categoryLabel.toLowerCase().includes(q) ||
      vid.reporter.toLowerCase().includes(q)
    );
  });

  const leadArticle = ARTICLES.find((a) => a.isLead) || ARTICLES[0];
  const companionArticles = ARTICLES.filter((a) => a.id !== leadArticle.id);
  const savedArticlesList = ARTICLES.filter((a) => bookmarkedIds.includes(a.id));

  const handleBreakingNewsClick = (title: string) => {
    const found = ARTICLES.find((a) => a.title.includes(title.slice(0, 20)));
    if (found) {
      setSelectedArticle(found);
    } else {
      setSelectedArticle(leadArticle);
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedCenter(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* 1. Header with masthead, navigation, and tools */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        selectedCenter={selectedCenter}
        onSelectCenter={setSelectedCenter}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        onOpenEPaperModal={() => setIsEPaperModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        savedArticlesCount={bookmarkedIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Urgent Breaking News Ticker */}
      <BreakingNewsBar onSelectArticleTitle={handleBreakingNewsClick} />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Active Filter Indicator if Search or Center is applied */}
        {(searchQuery || selectedCenter || activeCategory !== 'all') && (
          <div className="mb-6 p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-4 h-4 text-red-700 dark:text-red-400" />
              <span className="font-bold text-stone-700 dark:text-stone-300">التصفية النشطة:</span>
              {activeCategory !== 'all' && (
                <span className="bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 px-2 py-0.5 rounded border border-red-200 dark:border-red-900">
                  قسم {CATEGORIES.find((c) => c.id === activeCategory)?.name}
                </span>
              )}
              {selectedCenter && (
                <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                  مركز: {MINYA_CENTERS.find((c) => c.id === selectedCenter)?.name}
                </span>
              )}
              {searchQuery && (
                <span className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
                  بحث: "{searchQuery}"
                </span>
              )}
              <span className="text-stone-400 font-mono">
                ({activeCategory === 'videos' ? `${filteredVideos.length} فيديو` : `${filteredArticles.length} خبر`})
              </span>
            </div>

            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-red-700 dark:text-red-400 hover:underline font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تعيين وعرض الصفحة الرئيسية</span>
            </button>
          </div>
        )}

        {/* Home Page Sections Structure */}
        {activeCategory === 'all' && !searchQuery && !selectedCenter ? (
          <>
            {/* 1. Prayer Times & Minya Weather Top Strip */}
            <section className="mb-7 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-9">
                <PrayerTimesTopBar />
              </div>
              <div className="lg:col-span-3">
                <MinyaWeatherCard />
              </div>
            </section>

            {/* 2. Lead Story & Editorial Companion Grid */}
            <LeadHero
              leadArticle={leadArticle}
              companionArticles={companionArticles}
              onOpenArticle={setSelectedArticle}
              onBookmarkArticle={toggleBookmark}
              isBookmarked={isBookmarked}
              onListenAudio={(art) => setSelectedArticle(art)}
            />

            {/* 2. Specialized Minya Governorate & 9 Centers Section */}
            <MinyaGovernorateSection
              selectedCenter={selectedCenter}
              onSelectCenter={setSelectedCenter}
              articles={ARTICLES}
              onOpenArticle={setSelectedArticle}
            />

            {/* 3. University News (جامعة المنيا وإعلام المنيا) & Street Pulse (نبض الشارع وصوت المواطن) */}
            <UniversityAndStreetSection
              articles={ARTICLES}
              onOpenArticle={setSelectedArticle}
              onSelectCategory={setActiveCategory}
            />

            {/* 4. Cultural & Documentary Section (تل العمارنة، طه حسين، البهنسا) */}
            <CulturalDocumentarySection
              articles={ARTICLES}
              onOpenArticle={setSelectedArticle}
            />

            {/* 5. Multi-Category Department Tabs (Politics, Economy, Sports, Accidents, Health) */}
            <MultiCategorySection
              articles={ARTICLES}
              onOpenArticle={setSelectedArticle}
              onSelectCategory={setActiveCategory}
            />

            {/* 6. Solutions Journalism Section (صحافة الحلول) */}
            <SolutionsJournalismSection
              articles={ARTICLES}
              onOpenArticle={setSelectedArticle}
              onSelectCategory={setActiveCategory}
            />

            {/* 7. Data Journalism Section (صحافة البيانات) */}
            <DataJournalismSection
              articles={ARTICLES}
              onOpenArticle={setSelectedArticle}
              onSelectCategory={setActiveCategory}
            />

            {/* 8. Videos Section (قسم الفيديوهات + إضافة فيديو) */}
            <VideosSection
              videos={allVideos}
              onPlayVideo={setSelectedVideo}
              onOpenAddVideo={() => setIsAddVideoOpen(true)}
              onDeleteVideo={handleDeleteVideo}
              onSelectCategory={setActiveCategory}
            />

            {/* 9. Reader Services (Prayer Times, Poll of the Week, Newsletter) */}
            <ReaderServicesBar />
          </>
        ) : activeCategory === 'videos' ? (
          /* Full Videos Category View */
          <div className="space-y-6">
            <VideosSection
              videos={filteredVideos}
              onPlayVideo={setSelectedVideo}
              onOpenAddVideo={() => setIsAddVideoOpen(true)}
              onDeleteVideo={handleDeleteVideo}
              isFullPageView
            />
          </div>
        ) : (
          /* Filtered Results View */
          <div className="space-y-6">
            <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-editorial text-2xl font-bold text-stone-900 dark:text-stone-100">
                {activeCategory !== 'all'
                  ? `أرشيف قسم: ${CATEGORIES.find((c) => c.id === activeCategory)?.name}`
                  : selectedCenter
                  ? `أخبار وتقارير مركز ${MINYA_CENTERS.find((c) => c.id === selectedCenter)?.name}`
                  : `نتائج البحث عن: ${searchQuery}`}
              </h2>
            </div>

            {activeCategory === 'data' && !searchQuery && (
              <DataJournalismSection
                articles={ARTICLES}
                onOpenArticle={setSelectedArticle}
                onSelectCategory={setActiveCategory}
              />
            )}

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8">
                <Search className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">
                  لا توجد نتائج تطابق بحثك حالياً
                </h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  جرب البحث بكلمات أخرى أو تصفح باقي أقسام صحيفة مرقاب.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-red-800 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  العودة للرئيسية
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:border-red-600/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {art.imageUrl && (
                        <div className="aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                            {art.subCategory || art.kicker}
                          </div>
                        </div>
                      )}

                      <div className="p-4">
                        <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1.5">
                          {art.location && (
                            <span className="flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-red-600" />
                              <span>{art.location}</span>
                            </span>
                          )}
                          <span aria-hidden="true">·</span>
                          <span>{art.publishedAt}</span>
                        </div>

                        <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                          {art.title}
                        </h3>

                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                          {art.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-850 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                      <span>بقلم: {art.author.name}</span>
                      <span className="text-red-700 dark:text-red-400 font-semibold">اقرأ الخبر ←</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 4. Full Article Modal Viewer */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onBookmark={toggleBookmark}
        isBookmarked={selectedArticle ? isBookmarked(selectedArticle.id) : false}
        onSelectArticle={setSelectedArticle}
        allArticles={ARTICLES}
      />

      {/* 5. Graduation Project Academic Modal */}
      <GraduationProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onOpenEPaper={() => setIsEPaperModalOpen(true)}
      />

      {/* 6. E-Paper Modal (النسخة الورقية) */}
      <EPaperModal
        isOpen={isEPaperModalOpen}
        onClose={() => setIsEPaperModalOpen(false)}
      />

      {/* 7. Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedArticles={savedArticlesList}
        onOpenArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={toggleBookmark}
        onClearAll={() => setBookmarkedIds([])}
      />

      {/* 8. Add Video Modal & Video Player Modal */}
      <AddVideoModal
        isOpen={isAddVideoOpen}
        onClose={() => setIsAddVideoOpen(false)}
        onAddVideo={handleAddVideo}
      />
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onDeleteVideo={handleDeleteVideo}
      />

      {/* 9. Journalistic Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        onOpenEPaperModal={() => setIsEPaperModalOpen(true)}
      />
    </div>
  );
}
