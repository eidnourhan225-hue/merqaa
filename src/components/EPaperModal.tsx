import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Download, Printer, ZoomIn, ZoomOut, Newspaper } from 'lucide-react';
import { getEgyptDateInfo } from '../utils/prayerTimes';
import { MerqabLogo } from './MerqabLogo';

interface EPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EPaperModal: React.FC<EPaperModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 4;
  const dateInfo = getEgyptDateInfo();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-100 dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-300 dark:border-stone-800 my-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="bg-stone-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between gap-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-editorial text-base sm:text-lg font-bold">
                النسخة المطبوعة (PDF) • صحيفة مِرقاب
              </h3>
              <span className="text-[10px] text-stone-400 font-mono">
                العدد التذكاري الأول • مشروع تخرج 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Page Navigation */}
            <div className="flex items-center bg-stone-800 px-2 py-1 rounded-lg text-xs gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="disabled:opacity-30 hover:text-red-400 p-0.5"
                title="الصفحة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs">
                صفحة {currentPage} من {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="disabled:opacity-30 hover:text-red-400 p-0.5"
                title="الصفحة التالية"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="p-1.5 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors"
              title="طباعة النسخة"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Newspaper Broadsheet Canvas */}
        <div className="p-4 sm:p-8 max-h-[80vh] overflow-y-auto flex justify-center bg-stone-200 dark:bg-stone-950">
          {/* Simulated Printed Paper Container */}
          <div className="w-full max-w-2xl bg-[#FCFAF6] text-stone-900 shadow-2xl p-6 sm:p-10 border border-stone-300 font-serif min-h-[700px] flex flex-col justify-between">
            {/* Page Top Masthead */}
            <div className="border-b-4 border-stone-900 pb-3 mb-4">
              <div className="flex items-center justify-between text-[11px] text-stone-600 border-b border-stone-400 pb-1 mb-2 font-sans font-bold">
                <span>كلية الآداب - جامعة المنيا - قسم الإعلام</span>
                <span className="font-mono">{dateInfo.gregorianFull} • العدد 01</span>
                <span>السعر: إهداء تذكاري</span>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <MerqabLogo className="w-11 h-11 sm:w-14 sm:h-14 shrink-0" variant="monochrome" />
                  <h1 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-stone-950">
                    مِـرْقَـاب
                  </h1>
                </div>
                <p className="text-xs sm:text-sm italic font-sans text-stone-700 mt-1">
                  صحيفة إلكترونية ورقية شاملة • صوت المنيا وعروس الصعيد • مشروع تخرج شعبة الصحافة
                </p>
                <div className="flex items-center justify-center gap-4 text-[11px] font-sans font-bold text-stone-800 border-t border-stone-300 mt-2 pt-1">
                  <span>رئيس مجلس الإدارة: أ.د. إبراهيم حسن أبو الخير</span>
                  <span>•</span>
                  <span>رئيس التحرير: أ.د. رحاب أنور</span>
                </div>
              </div>
            </div>

            {/* Page Specific Content */}
            {currentPage === 1 && (
              <div className="flex-1 space-y-4">
                <div className="bg-stone-900 text-white p-2 text-center text-xs font-sans font-bold uppercase tracking-wider">
                  الصفحة الأولى: مانشيت اليوم وقضايا الوطن
                </div>

                <div className="border-b-2 border-stone-900 pb-3">
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight text-stone-950">
                    عروس الصعيد تدشن أضخم محور تنموي ذكي على النيل.. محافظ المنيا لـ «مرقاب»: طفرة استثمارية تربط الظهير الصحراوي بكورنيش النيل
                  </h2>
                  <div className="text-xs text-stone-600 font-sans mt-1">
                    بقلم: نورهان عيد (رئيس التحرير) • المنيا
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed text-justify">
                  <p>
                    أكد محافظ المنيا في حوار خاص لجريدة «مرقاب» أن عروس الصعيد تشهد نقلة نوعية في مشروعات «حياة كريمة» بمراكز المحافظة الـ 9، مشيراً إلى أن نسبة الإنجاز بلغت 94%، مع إطلاق ممشى أهل مصر الجديد ليكون متنفساً سياحياً وحضارياً لأبناء المحافظة.
                  </p>
                  <p>
                    وأوضح المحافظ أن الخطط المستقبلية تركز على جذب الاستثمارات في مجمعات تكرير السكر ومحاجر الرخام والحجر الجيري عالي النقاء، مشيداً بدور شباب قسم الإعلام بجامعة المنيا في تقديم إعلام تنموي واعٍ.
                  </p>
                </div>

                <div className="p-3 bg-stone-100 border border-stone-300 text-xs italic font-sans">
                  «الصحافة هي ضمير الأمة والمرآة الحية لهموم المواطن وطموحات التنمية في صعيد مصر»
                </div>
              </div>
            )}

            {currentPage === 2 && (
              <div className="flex-1 space-y-4">
                <div className="bg-stone-900 text-white p-2 text-center text-xs font-sans font-bold uppercase tracking-wider">
                  الصفحة الثانية: أخبار الجامعات والتعليم العالي
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold leading-tight text-stone-950 border-b border-stone-400 pb-2">
                  جامعة المنيا تطلق أول حاضنة للذكاء الاصطناعي والصحافة الذكية بكلية الآداب
                </h3>

                <div className="text-xs text-stone-700 leading-relaxed text-justify space-y-3 font-sans">
                  <p>
                    في احتفالية كبرى شهدها مدرج كلية الآداب، أعلنت إدارة الجامعة عن تدشين معمل الصحافة الرقمية المتقدم، بهدف تأهيل طلاب قسم الإعلام شعبة الصحافة على مهارات التحقق من الأخبار وصناعة القصة الصحفية التفاعلية.
                  </p>
                  <p>
                    وأكدت لجنة تحكيم مشروعات التخرج أن مشروع صحيفة «مرقاب» يعكس نضجاً فكرياً ومهنياً متميزاً، ويقدم إضافة حقيقية للصحافة الإقليمية المعنية بمحافظات الصعيد.
                  </p>
                </div>
              </div>
            )}

            {currentPage === 3 && (
              <div className="flex-1 space-y-4">
                <div className="bg-stone-900 text-white p-2 text-center text-xs font-sans font-bold uppercase tracking-wider">
                  الصفحة الثالثة: نبض الشارع وتحقيقات المنيا
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold leading-tight text-stone-950 border-b border-stone-400 pb-2">
                  تحقيق ميداني: شيوخ الفخار وحرفيو الخوص بأسواق المنيا القديمة.. حكايات الصبر والمطالبة بقرية تراثية
                </h3>

                <div className="text-xs text-stone-700 leading-relaxed text-justify space-y-3 font-sans">
                  <p>
                    جولة حية لـ «مرقاب» بين أزقة حي جنوب وأسواق ملوي وبني مزار القديمة لرصد أصوات الحرفيين المتمسكين بتراث الأجداد في صناعة الفخار وأطباق الخوص ومطالبهم بمنافذ تسويقية دائمة.
                  </p>
                </div>
              </div>
            )}

            {currentPage === 4 && (
              <div className="flex-1 space-y-4">
                <div className="bg-stone-900 text-white p-2 text-center text-xs font-sans font-bold uppercase tracking-wider">
                  الصفحة الرابعة: الملف الوثائقي والرياضة
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold leading-tight text-stone-950 border-b border-stone-400 pb-2">
                  في محراب تل العمارنة ومسقط رأس طه حسين بمغاغة: وثائقي يستنطق أحجار الخلود
                </h3>

                <div className="text-xs text-stone-700 leading-relaxed text-justify space-y-3 font-sans">
                  <p>
                    ملف وثائقي خاص يروي تاريخ أول مدينة للتوحيد في التاريخ الإنساني بتل العمارنة، وإرث عميد الأدب العربي الدكتور طه حسين ابن المنيا البار.
                  </p>
                </div>

                <div className="mt-4 p-3 border-t-2 border-stone-900 pt-3">
                  <div className="text-xs font-bold text-stone-900 mb-1">الرياضة الصعيدية:</div>
                  <p className="text-xs text-stone-700 font-sans">
                    نادي المنيا الرياضي يعتلي صدارة مجموعته بدوري المحترفين بعد الفوز على ديروط بثنائية نظيفة وسط فرحة جماهيرية غامرة.
                  </p>
                </div>
              </div>
            )}

            {/* Newspaper Bottom Box */}
            <div className="border-t-2 border-stone-900 pt-2 mt-4 text-[11px] flex items-center justify-between text-stone-600 font-sans">
              <span>هيئة التحرير: طالبات الفرقة الرابعة - شعبة الصحافة</span>
              <span>صفحة رقم {currentPage}</span>
              <span>إشراف: كلية الآداب - جامعة المنيا</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-stone-100 dark:bg-stone-900 px-4 py-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
          <span className="text-stone-500 dark:text-stone-400">
            نسخة إلكترونية محاكية للجريدة المطبوعة
          </span>
          <button
            onClick={() => window.print()}
            className="px-4 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل / طباعة العدد</span>
          </button>
        </div>
      </div>
    </div>
  );
};
