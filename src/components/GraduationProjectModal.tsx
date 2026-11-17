import React from 'react';
import { X, GraduationCap, Award, BookOpen, Users, Compass, CheckCircle2 } from 'lucide-react';
import { GRADUATION_PROJECT_INFO } from '../data/newsData';

interface GraduationProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEPaper: () => void;
}

export const GraduationProjectModal: React.FC<GraduationProjectModalProps> = ({
  isOpen,
  onClose,
  onOpenEPaper,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 my-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-red-900 via-stone-900 to-red-950 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-1.5 text-stone-300 hover:text-white bg-black/40 hover:bg-black/60 rounded-lg transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-red-800/80 rounded-xl text-amber-300 border border-red-700/60 shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </span>
            <div>
              <span className="text-xs font-mono text-amber-300 font-semibold tracking-wider uppercase">
                مشروع تخرج شعبة الصحافة • الفرقة الرابعة (2026)
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-0.5">
                بطاقة مشروع صحيفة «مِـرْقَـاب» الإلكترونية
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl mt-3">
            مشروع تخرج صحفي تطبيقي شامل مقدم لنيل درجة الليسانس في الآداب - قسم الإعلام (شعبة الصحافة) بكلية الآداب - جامعة المنيا.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-sm">
          {/* Student & Department Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-400 font-bold mb-2">
                <Award className="w-4 h-4" />
                <span>القيادة ورئاسة التحرير:</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">رئيس مجلس الإدارة:</span>
                  <span className="text-stone-900 dark:text-stone-100 font-bold text-sm">أ.د. إبراهيم حسن أبو الخير</span>
                </div>
                <div>
                  <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">رئيس التحرير:</span>
                  <span className="text-red-800 dark:text-red-400 font-bold text-sm">أ.د. رحاب أنور</span>
                </div>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-2.5 pt-2 border-t border-stone-200 dark:border-stone-700">
                جامعة المنيا • كلية الآداب • قسم الإعلام
              </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-400 font-bold mb-2">
                <Users className="w-4 h-4" />
                <span>إعداد الطالبة وفريق العمل:</span>
              </div>
              <div className="text-stone-900 dark:text-stone-100 font-bold text-base">
                نورهان عيد
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                طالبة بالفرقة الرابعة • قسم الإعلام • شعبة الصحافة
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-300 mt-2 space-y-0.5">
                <div>• التحرير والتنسيق العام: نورهان عيد</div>
                <div>• التغطية الميدانية: فريق تحقيقات مرقاب</div>
                <div>• الإخراج الصحفي والتصميم الرقمي: شعبة الصحافة 2026</div>
              </div>
            </div>
          </div>

          {/* Meaning of the Name */}
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60">
            <h4 className="font-editorial text-base font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>فلسفة الاسم وشعار الصحيفة (لماذا مِـرْقَـاب؟):</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              «المِرْقَاب» في المعاجم العربية هو الموضع العالي أو البرج المرتفع الذي يُشرف منه الرقيب ليرى ما حوله بوضوح ودقة. وجاء اختيار الاسم ليعبر عن الدور الأصيل للصحافة الرشيدة كمرصد وطني مستقل، يراقب الأحداث، ويستجلي الحقائق، ويضع هموم المواطن والوطن في بؤرة الاهتمام، مع التركيز الخاص على محافظة المنيا «عروس الصعيد».
            </p>
          </div>

          {/* Project Goals */}
          <div>
            <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-red-700" />
              <span>أهداف ومحاور المشروع الصحفي:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
              <div className="p-2.5 bg-stone-50 dark:bg-stone-800/50 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>تغطية متكاملة للمراكز التسعة لمحافظة المنيا بأسلوب التحقيق الميداني.</span>
              </div>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-800/50 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>إبراز التراث الثقافي والوثائقي (تل العمارنة، تونا الجبل، طه حسين).</span>
              </div>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-800/50 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>نافذة متخصصة لأخبار الجامعات المصرية وجامعة المنيا وابتكارات الشباب.</span>
              </div>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-800/50 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>تطبيق أحدث اتجاهات الصحافة الرقمية: الأخبار العاجلة، الاستماع الصوتي، والنسخة الورقية.</span>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-stone-400 font-mono">
              مشروع تخرج معتمد • إعلام المنيا 2026
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/standalone/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
              >
                فتح نسخة HTML / CSS / JS المستقلة
              </a>
              <button
                onClick={() => {
                  onClose();
                  onOpenEPaper();
                }}
                className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold text-xs rounded-lg hover:bg-stone-800 transition-colors shadow-sm"
              >
                تصفح النسخة الورقية للمشروع
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-lg hover:bg-stone-300 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
