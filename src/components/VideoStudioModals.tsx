import React, { useState } from 'react';
import {
  X,
  Video,
  Link2,
  Upload,
  Play,
  Trash2,
  Clock,
  User,
  Eye,
  Film,
  CheckCircle2,
} from 'lucide-react';
import { VideoItem } from '../types';

export function extractYouTubeId(url: string): string | null {
  const trimmed = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const regex of patterns) {
    const match = trimmed.match(regex);
    if (match && match[1]) return match[1];
  }
  return null;
}

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: VideoItem) => void;
}

const VIDEO_CATEGORIES = [
  'أخبار المنيا',
  'صحافة الحلول',
  'صحافة البيانات',
  'نبض الشارع',
  'الجامعات',
  'الثقافي والوثائقي',
  'الرياضة',
  'السياسة',
  'الاقتصاد',
  'الصحة',
];

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onAddVideo,
}) => {
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('أخبار المنيا');
  const [reporter, setReporter] = useState('نورهان عيد');
  const [duration, setDuration] = useState('03:00');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [localFileUrl, setLocalFileUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setErrorMsg('يرجى اختيار ملف فيديو صالح (MP4 أو WebM أو MOV).');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalFileUrl(objectUrl);
    setSelectedFileName(file.name);
    if (!title.trim()) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('يرجى كتابة عنوان الفيديو.');
      return;
    }

    let finalSourceType: 'youtube' | 'mp4' | 'local' = 'mp4';
    let finalVideoUrl = '';
    let finalThumbnail = '/src/assets/images/merqab_hero_lead_1794431697836.jpg';

    if (uploadMode === 'url') {
      const trimmedUrl = videoUrlInput.trim();
      if (!trimmedUrl) {
        setErrorMsg('يرجى لصق رابط اليوتيوب أو رابط الفيديو المباشر.');
        return;
      }
      const ytId = extractYouTubeId(trimmedUrl);
      if (ytId) {
        finalSourceType = 'youtube';
        finalVideoUrl = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1`;
        finalThumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      } else {
        finalSourceType = 'mp4';
        finalVideoUrl = trimmedUrl;
      }
    } else {
      if (!localFileUrl) {
        setErrorMsg('يرجى اختيار ملف فيديو من جهازك أولاً.');
        return;
      }
      finalSourceType = 'local';
      finalVideoUrl = localFileUrl;
    }

    const newVideo: VideoItem = {
      id: `vid-user-${Date.now()}`,
      title: title.trim(),
      description:
        description.trim() ||
        'تقرير مصور مضاف إلى قسم مرقاب فيديو لتغطية الأحداث الميدانية في مصر ومحافظة المنيا.',
      categoryLabel,
      reporter: reporter.trim() || 'هيئة تحرير مِرقاب',
      duration: duration.trim() || '03:00',
      publishedAt: 'الآن',
      sourceType: finalSourceType,
      videoUrl: finalVideoUrl,
      thumbnailUrl: finalThumbnail,
      viewsCount: 1,
      isUserAdded: true,
    };

    onAddVideo(newVideo);

    // Reset form
    setTitle('');
    setDescription('');
    setVideoUrlInput('');
    setSelectedFileName('');
    setLocalFileUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-stone-900 text-white px-5 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-800 rounded-xl text-white">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold">
                إضافة فيديو جديد إلى «مِرقاب فيديو»
              </h3>
              <p className="text-[11px] text-stone-400">
                أضف رابط يوتيوب أو ارفع تقريرك المصور مباشرة من جهازك
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Source Mode Tabs */}
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-2">
              طريقة إضافة الفيديو:
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setUploadMode('url');
                  setErrorMsg('');
                }}
                className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  uploadMode === 'url'
                    ? 'bg-white dark:bg-stone-900 text-red-800 dark:text-red-400 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>رابط يوتيوب أو MP4</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadMode('file');
                  setErrorMsg('');
                }}
                className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  uploadMode === 'file'
                    ? 'bg-white dark:bg-stone-900 text-red-800 dark:text-red-400 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>رفع ملف فيديو من الجهاز</span>
              </button>
            </div>
          </div>

          {/* URL or File Input */}
          {uploadMode === 'url' ? (
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                رابط الفيديو (YouTube أو رابط مباشر MP4):
              </label>
              <input
                type="url"
                dir="ltr"
                placeholder="https://www.youtube.com/watch?v=... أو رابط mp4"
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-red-700 text-left"
              />
            </div>
          ) : (
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                اختر ملف الفيديو من الجهاز:
              </label>
              <label className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-850 hover:border-red-600 cursor-pointer transition-colors text-center">
                <Film className="w-7 h-7 text-red-700 dark:text-red-400" />
                {selectedFileName ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم اختيار الملف: {selectedFileName}</span>
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-stone-800 dark:text-stone-200 block">
                      اضغط هنا لاختيار فيديو (MP4 / WebM / MOV)
                    </span>
                    <span className="text-[11px] text-stone-400">
                      سيتم تشغيله فوراً داخل مشغل صحيفة مِرقاب
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Video Title */}
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              عنوان التقرير المصور *
            </label>
            <input
              type="text"
              placeholder="مثال: جولة ميدانية لطلاب إعلام المنيا في كورنيش النيل..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-red-700"
            />
          </div>

          {/* Category + Reporter + Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                القسم:
              </label>
              <select
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-red-700"
              >
                {VIDEO_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                المعد / المراسل:
              </label>
              <input
                type="text"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-red-700"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                المدة:
              </label>
              <input
                type="text"
                placeholder="03:00"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-red-700"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              وصف مختصر للفيديو:
            </label>
            <textarea
              rows={2}
              placeholder="اكتب نبذة قصيرة عن محتوى الفيديو..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-850 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-red-700"
            />
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-lg text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl font-semibold hover:bg-stone-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-800 hover:bg-red-700 text-white rounded-xl font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span>نشر الفيديو في القسم</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onDeleteVideo?: (id: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onDeleteVideo,
}) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 text-white rounded-2xl shadow-2xl border border-stone-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Bar */}
        <div className="px-4 sm:px-6 py-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-red-800 text-white px-2.5 py-0.5 rounded font-bold">
              {video.categoryLabel}
            </span>
            <span className="text-stone-400 font-mono">{video.publishedAt}</span>
          </div>

          <div className="flex items-center gap-2">
            {video.isUserAdded && onDeleteVideo && (
              <button
                onClick={() => {
                  onDeleteVideo(video.id);
                  onClose();
                }}
                className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-rose-900 text-rose-300 rounded-lg flex items-center gap-1 transition-colors"
                title="حذف هذا الفيديو"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Frame */}
        <div className="aspect-16/9 w-full bg-black">
          {video.sourceType === 'youtube' ? (
            <iframe
              src={video.videoUrl}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              key={video.videoUrl}
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          )}
        </div>

        {/* Info Footer */}
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-snug">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {video.description}
          </p>
          <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-red-400" />
                <span>{video.reporter}</span>
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{video.duration}</span>
              </span>
            </div>
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <Eye className="w-3.5 h-3.5" />
              <span>{video.viewsCount.toLocaleString('en-US')} مشاهدة</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
