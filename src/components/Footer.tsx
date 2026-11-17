import React from 'react';
import { GraduationCap, MapPin, Mail, Phone, Globe, Shield, Heart } from 'lucide-react';
import { CATEGORIES, MINYA_CENTERS } from '../data/newsData';
import { CategoryId } from '../types';
import { MerqabLogo } from './MerqabLogo';

interface FooterProps {
  onSelectCategory: (id: CategoryId) => void;
  onOpenProjectModal: () => void;
  onOpenEPaperModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenProjectModal,
  onOpenEPaperModal,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t-4 border-red-800 transition-colors">
      {/* Top Banner inside Footer */}
      <div className="bg-stone-950 py-6 border-b border-stone-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <MerqabLogo className="w-11 h-11 shrink-0 drop-shadow-md" />
            <div>
              <div className="font-editorial text-xl font-bold text-white">
                صحيفة مِـرْقَـاب الإخبارية الشاملة
              </div>
              <div className="text-xs text-stone-400">
                مشروع تخرج الفرقة الرابعة • كلية الآداب قسم الإعلام شعبة الصحافة • جامعة المنيا
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenProjectModal}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>بطاقة مشروع التخرج</span>
            </button>
            <button
              onClick={onOpenEPaperModal}
              className="px-3.5 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              النسخة الورقية (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About the Newspaper */}
          <div>
            <h4 className="font-editorial text-base font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-700 rounded-xs" />
              <span>عن صحيفة مِرقاب</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              بوابة صحفية إلكترونية مستقلة ترصد نبض جمهورية مصر العربية ومحافظة المنيا «عروس الصعيد»، وتسلط الضوء على إنجازات التنمية في الصعيد، وأخبار الجامعات، وتحقيقات نبض الشارع والموروث الثقافي الخالد.
            </p>
            <div className="text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>حرم جامعة المنيا • كلية الآداب - مبنى قسم الإعلام</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>merqab.minya.press@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Journalistic Sections */}
          <div>
            <h4 className="font-editorial text-base font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-700 rounded-xs" />
              <span>أقسام الصحيفة</span>
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="text-stone-400 hover:text-white transition-colors text-right"
                  >
                    • {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Minya 9 Centers */}
          <div>
            <h4 className="font-editorial text-base font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-700 rounded-xs" />
              <span>مراكز محافظة المنيا (9)</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {MINYA_CENTERS.map((c) => (
                <span
                  key={c.id}
                  className="px-2 py-1 bg-stone-800 text-stone-300 rounded text-[11px] border border-stone-700/60"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Ethics & Academic Notice */}
          <div>
            <h4 className="font-editorial text-base font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-700 rounded-xs" />
              <span>ميثاق الشرف والأمانة</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              تلتزم جريدة «مرقاب» بميثاق الشرف الصحفي وأخلاقيات المهنة المعتمدة من نقابة الصحفيين المصرية، والتحقق المستمر من المصادر، وإعلاء صوت الحقيقة والموضوعية.
            </p>
            <div className="p-3 bg-stone-850 rounded-lg border border-stone-800 text-[11px] text-stone-300 space-y-1">
              <div><span className="text-stone-400">رئيس مجلس الإدارة:</span> <span className="text-white font-bold">أ.د. إبراهيم حسن أبو الخير</span></div>
              <div><span className="text-stone-400">رئيس التحرير:</span> <span className="text-red-400 font-bold">أ.د. رحاب أنور</span></div>
              <div><span className="text-stone-400">إشراف وتنسيق:</span> <span className="text-amber-300 font-medium">نورهان عيد (شعبة الصحافة)</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © 2026 صحيفة مِرقاب الإلكترونية. جميع الحقوق محفوظة • مشروع تخرج إعلام المنيا (نورهان عيد).
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-stone-300 cursor-pointer">سياسة الخصوصية</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">شروط النشر</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">هيئة التحرير</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
