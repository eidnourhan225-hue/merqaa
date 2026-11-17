import React from 'react';
import { Video, Play, Plus, Clock, Eye, ArrowLeft, Trash2, Film } from 'lucide-react';
import { VideoItem, CategoryId } from '../types';

interface VideosSectionProps {
  videos: VideoItem[];
  onPlayVideo: (video: VideoItem) => void;
  onOpenAddVideo: () => void;
  onDeleteVideo?: (id: string) => void;
  onSelectCategory?: (id: CategoryId) => void;
  isFullPageView?: boolean;
}

export const VideosSection: React.FC<VideosSectionProps> = ({
  videos,
  onPlayVideo,
  onOpenAddVideo,
  onDeleteVideo,
  onSelectCategory,
  isFullPageView = false,
}) => {
  const leadVideo = videos[0];
  const otherVideos = isFullPageView ? videos : videos.slice(1, 4);

  return (
    <section className="mb-12 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 p-5 sm:p-7 shadow-lg">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-1">
            <Video className="w-4 h-4" />
            <span>البث الرقمي والتقارير المصورة</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
            قسم الفيديوهات (مِـرْقَـاب فيديو)
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
            تغطيات ميدانية مصورة، لقاءات مع المواطنين والمسؤولين، ووثائقيات من قلب محافظة المنيا
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          <button
            onClick={onOpenAddVideo}
            className="flex-1 sm:flex-initial px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة فيديو جديد</span>
          </button>

          {!isFullPageView && onSelectCategory && (
            <button
              onClick={() => onSelectCategory('videos')}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 shrink-0"
            >
              <span>كل الفيديوهات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {videos.length === 0 ? (
        <div className="py-12 text-center bg-stone-950/60 rounded-xl border border-stone-800 p-6">
          <Film className="w-10 h-10 text-stone-600 mx-auto mb-2" />
          <p className="text-sm font-bold text-stone-300">لا توجد فيديوهات مضافة حالياً</p>
          <button
            onClick={onOpenAddVideo}
            className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded-lg inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>أضف أول فيديو الآن</span>
          </button>
        </div>
      ) : isFullPageView ? (
        /* Full Grid View when user selects 'فيديوهات' tab */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => onPlayVideo(vid)}
              className="group bg-stone-950/80 rounded-xl border border-stone-800 overflow-hidden hover:border-red-600/60 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/9 relative overflow-hidden bg-stone-800">
                  {vid.thumbnailUrl ? (
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950">
                      <Film className="w-10 h-10 text-stone-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-700/95 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current mr-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {vid.categoryLabel}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-black/80 text-amber-300 font-mono text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{vid.duration}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-editorial text-base font-bold text-white leading-snug group-hover:text-amber-200 transition-colors line-clamp-2">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                <span>{vid.reporter}</span>
                <div className="flex items-center gap-2">
                  {vid.isUserAdded && onDeleteVideo && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteVideo(vid.id);
                      }}
                      className="text-rose-400 hover:text-rose-300 p-1"
                      title="حذف الفيديو"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="font-mono flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {vid.viewsCount.toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Homepage Featured Video + Companion List */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Lead Video (7 cols) */}
          {leadVideo && (
            <div
              onClick={() => onPlayVideo(leadVideo)}
              className="lg:col-span-7 group bg-stone-950 rounded-xl border border-stone-800 overflow-hidden hover:border-red-600/60 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-stone-800">
                {leadVideo.thumbnailUrl ? (
                  <img
                    src={leadVideo.thumbnailUrl}
                    alt={leadVideo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950">
                    <Film className="w-12 h-12 text-stone-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-700/95 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform ring-4 ring-white/15">
                    <Play className="w-7 h-7 fill-current mr-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="bg-red-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                    {leadVideo.categoryLabel}
                  </span>
                  {leadVideo.isUserAdded && (
                    <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded">
                      مضاف حديثاً
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 bg-black/80 text-amber-300 font-mono text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{leadVideo.duration}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-amber-200 transition-colors mb-2">
                  {leadVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-2">
                  {leadVideo.description}
                </p>
                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                  <span>{leadVideo.reporter} • {leadVideo.publishedAt}</span>
                  <span className="text-amber-300 font-bold flex items-center gap-1">
                    <span>تشغيل الفيديو</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Playlist Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {otherVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => onPlayVideo(vid)}
                className="group p-3 bg-stone-950/80 rounded-xl border border-stone-800 hover:border-red-600/50 transition-all cursor-pointer flex gap-3 items-center"
              >
                <div className="relative w-32 h-22 shrink-0 rounded-lg overflow-hidden bg-stone-800">
                  {vid.thumbnailUrl ? (
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-800">
                      <Film className="w-6 h-6 text-stone-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-700/90 text-white flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 fill-current mr-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1 left-1 bg-black/80 text-amber-300 font-mono text-[10px] px-1.5 rounded">
                    {vid.duration}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 text-[10px] text-red-400 font-bold mb-1">
                    <span>{vid.categoryLabel}</span>
                    {vid.isUserAdded && onDeleteVideo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteVideo(vid.id);
                        }}
                        className="text-stone-400 hover:text-rose-400"
                        title="حذف الفيديو"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <h4 className="font-editorial text-sm font-bold text-white leading-snug group-hover:text-amber-200 transition-colors line-clamp-2">
                    {vid.title}
                  </h4>
                  <div className="text-[11px] text-stone-400 mt-1.5 flex items-center justify-between">
                    <span className="truncate">{vid.reporter}</span>
                    <span className="font-mono text-[10px] shrink-0 mr-2">{vid.publishedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
