import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  Printer,
  Clock,
  MapPin,
  MessageSquare,
  ThumbsUp,
  Send,
  Check,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Lightbulb,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Article, ArticleComment } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onBookmark: (articleId: string) => void;
  isBookmarked: boolean;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onBookmark,
  isBookmarked,
  onSelectArticle,
  allArticles,
}) => {
  const [fontSize, setFontSize] = useState<number>(16); // 14, 16, 18, 20
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    if (article) {
      setComments(article.comments || []);
      setIsPlayingAudio(false);
      setAudioProgress(0);
    }
  }, [article]);

  // Audio simulation timer
  useEffect(() => {
    let timer: any;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  if (!article) return null;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const shareTitle = `جريدة مِرقاب الإخبارية: ${article.title}`;
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedUrl = encodeURIComponent(url);

    if (platform === 'copy') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareTitle}\n${url}`);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodedTitle}%0A%0A${encodedUrl}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=مرقاب,أخبار_المنيا,مصر`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ArticleComment = {
      id: `comment-${Date.now()}`,
      userName: newCommentName.trim() || 'قارئ مرقاب',
      date: 'الآن',
      content: newCommentText.trim(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setNewCommentName('');
  };

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.subCategory === article.subCategory))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
          {/* Category & Location */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-red-700 dark:text-red-400">
              {article.kicker || article.subCategory}
            </span>
            {article.location && (
              <>
                <span className="text-stone-300 dark:text-stone-700">|</span>
                <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                  <MapPin className="w-3 h-3 text-red-600" />
                  <span>{article.location}</span>
                </span>
              </>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Font Zoom */}
            <div className="hidden sm:flex items-center bg-stone-200/70 dark:bg-stone-800 rounded-lg p-0.5 text-xs text-stone-700 dark:text-stone-300">
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                className="p-1 hover:bg-stone-300 dark:hover:bg-stone-700 rounded"
                title="تصغير حجم الخط"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 font-mono text-[11px]">{fontSize}px</span>
              <button
                onClick={() => setFontSize((s) => Math.min(22, s + 2))}
                className="p-1 hover:bg-stone-300 dark:hover:bg-stone-700 rounded"
                title="تكبير حجم الخط"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-red-50 dark:bg-red-950/60 text-red-700 border-red-300'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-700'
              }`}
              title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ المقال'}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Print */}
            <button
              onClick={() => window.print()}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors"
              title="طباعة المقال"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg transition-colors mr-1"
              title="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Article Header */}
          <div className="mb-6">
            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Byline Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-800 text-white flex items-center justify-center font-bold text-sm">
                  {article.author.name.slice(0, 1)}
                </div>
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100">
                    {article.author.name}
                  </div>
                  <div className="text-[11px] text-stone-400">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.publishedAt}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{article.readingTimeMinutes} دقائق قراءة</span>
              </div>
            </div>

            {/* Quick Share Buttons Strip (Top) */}
            <div className="mt-3.5 pt-1 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300">
                <Share2 className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
                <span>مشاركة سريعة:</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {/* WhatsApp */}
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow"
                  title="مشاركة عبر واتساب"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.123-.521-1.625-.678-2.67-2.336-2.751-2.445-.078-.108-.66-.879-.66-1.674 0-.796.417-1.189.566-1.349.144-.158.314-.2.42-.2.106 0 .211.002.304.006.098.005.231-.036.36.275.132.321.45 1.099.49 1.18.04.08.067.174.013.281-.054.108-.08.174-.16.268-.081.094-.17.209-.243.281-.081.08-.166.167-.071.33.094.162.421.696.903 1.127.621.554 1.144.726 1.306.808.163.08.258.071.354-.04.095-.11.408-.475.517-.638.11-.162.22-.136.369-.081.149.054.945.446 1.108.528.163.081.272.121.312.19.04.068.04.394-.104.799z"/>
                  </svg>
                  <span>واتساب</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => handleShare('facebook')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow"
                  title="مشاركة على فيسبوك"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>فيسبوك</span>
                </button>

                {/* Twitter / X */}
                <button
                  onClick={() => handleShare('twitter')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow"
                  title="نشر على منصة X (تويتر سابقاً)"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>منصة X</span>
                </button>

                {/* Telegram */}
                <button
                  onClick={() => handleShare('telegram')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#229ED9] hover:bg-[#1f8ec4] text-white rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow"
                  title="مشاركة عبر تيليجرام"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  <span>تيليجرام</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={() => handleShare('copy')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    copySuccess
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700'
                  }`}
                  title="نسخ رابط الخبر"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copySuccess ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Audio Player Assistant Bar */}
          <div className="mb-6 p-3.5 bg-stone-100 dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-red-800 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm shrink-0"
                title={isPlayingAudio ? 'إيقاف مؤقت' : 'استماع صوتي للمقال'}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {isPlayingAudio ? 'جارٍ قراءة التقرير الإخباري...' : 'خدمة الاستماع الصوتي للخبر'}
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                  صوت مرقاب الرقمي • تقنية الذكاء الصحفي
                </div>
              </div>
            </div>

            {/* Audio Progress Bar */}
            <div className="w-full sm:w-64 flex items-center gap-2">
              <div className="flex-1 h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-700 transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-stone-500 w-8 text-left">
                {audioProgress}%
              </span>
            </div>
          </div>

          {/* Article Featured Image */}
          {article.imageUrl && (
            <figure className="mb-6 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[440px] object-cover"
              />
              {article.imageCaption && (
                <figcaption className="p-3 bg-stone-50 dark:bg-stone-850 text-xs text-stone-500 dark:text-stone-400 italic text-center border-t border-stone-200 dark:border-stone-800">
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Article Summary Lead Paragraph */}
          <div className="p-4 bg-red-50/60 dark:bg-red-950/20 border-r-3 border-red-800 rounded-lg mb-6">
            <p className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-200 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Full Article Content */}
          <div
            className="text-stone-800 dark:text-stone-200 leading-loose space-y-4 mb-8"
            style={{ fontSize: `${fontSize}px` }}
          >
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-justify font-sans">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Solutions Journalism Breakdown if available */}
          {article.solutionMeta && (
            <div className="my-6 p-4 sm:p-5 bg-emerald-50/70 dark:bg-emerald-950/25 rounded-xl border border-emerald-200 dark:border-emerald-900/70 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-bold border-b border-emerald-200/80 dark:border-emerald-900/50 pb-2">
                <Lightbulb className="w-4 h-4" />
                <span>بطاقة تحليل صحافة الحلول (Solutions Journalism)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-200/70 dark:border-stone-800">
                  <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>المشكلة المرصودة</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {article.solutionMeta.problem}
                  </p>
                </div>
                <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-200/70 dark:border-stone-800">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>الحل والاستجابة الميدانية</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {article.solutionMeta.response}
                  </p>
                </div>
                <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-200/70 dark:border-stone-800">
                  <div className="flex items-center gap-1.5 font-bold text-sky-700 dark:text-sky-400 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>الأثر الموثق بالأرقام</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {article.solutionMeta.impact}
                  </p>
                </div>
                {article.solutionMeta.limitations && (
                  <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-200/70 dark:border-stone-800">
                    <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 mb-1">
                      <Target className="w-3.5 h-3.5" />
                      <span>التحديات والقيود</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      {article.solutionMeta.limitations}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Data Journalism Key Stat Highlight if available */}
          {article.dataHighlight && (
            <div className="my-6 p-4 sm:p-5 bg-sky-50/70 dark:bg-sky-950/25 rounded-xl border border-sky-200 dark:border-sky-900/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-sky-700 text-white flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-sky-800 dark:text-sky-400">
                    مؤشر صحافة البيانات الرئيسي
                  </div>
                  <div className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                    {article.dataHighlight.metricLabel}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    المصدر: {article.dataHighlight.source}
                  </div>
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-sky-800 dark:text-sky-300 bg-white dark:bg-stone-900 px-4 py-2 rounded-xl border border-sky-200 dark:border-sky-800 shrink-0">
                {article.dataHighlight.metricValue}
              </div>
            </div>
          )}

          {/* Quote Block if available */}
          {article.quote && (
            <div className="my-6 p-4 bg-stone-100 dark:bg-stone-800/60 rounded-xl border-stone-300 dark:border-stone-700 text-sm text-stone-800 dark:text-stone-200 italic font-editorial">
              «{article.quote.text}»
              <div className="text-xs font-sans not-italic text-stone-500 dark:text-stone-400 font-bold mt-2">
                — {article.quote.author}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 py-4 border-t border-b border-stone-200 dark:border-stone-800 my-6">
            <span className="text-xs font-bold text-stone-500 ml-2">الوسوم:</span>
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Article Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800 mb-8">
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
              شارك الخبر مع زملائك ومتابعيك:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare('whatsapp')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
              >
                واتساب
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
              >
                فيسبوك
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors"
              >
                منصة X
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-3 py-1.5 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copySuccess ? 'تم النسخ!' : 'نسخ الرابط'}</span>
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mb-8">
              <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 mb-3 pb-2 border-b border-stone-200 dark:border-stone-800">
                أخبار وتقارير ذات صلة
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-800 hover:border-red-600/40 cursor-pointer transition-colors"
                  >
                    <div className="text-[10px] text-red-700 dark:text-red-400 font-semibold mb-1">
                      {rel.subCategory || rel.kicker}
                    </div>
                    <h4 className="font-editorial text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Comments Section */}
          <div className="border-t border-stone-200 dark:border-stone-800 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-red-700 dark:text-red-400" />
              <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                تعليقات القراء ({comments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="اسمك الكريم (اختياري)..."
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-red-700"
                />
              </div>
              <textarea
                rows={3}
                placeholder="أضف تعليقك أو رأيك حول هذا التقرير الصحفي..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                required
                className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-red-700"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال التعليق</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((comm) => (
                <div
                  key={comm.id}
                  className="p-3.5 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800 text-xs"
                >
                  <div className="flex items-center justify-between text-stone-500 mb-1.5">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {comm.userName}
                    </span>
                    <span className="font-mono text-[10px]">{comm.date}</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {comm.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
