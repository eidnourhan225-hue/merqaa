import React, { useState } from 'react';
import { Clock, Vote, CheckCircle2, Send, Check } from 'lucide-react';
import { PRAYER_TIMES, CURRENT_POLL } from '../data/newsData';

export const ReaderServicesBar: React.FC = () => {
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [poll, setPoll] = useState(CURRENT_POLL);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleVote = () => {
    if (!selectedPollOption || hasVoted) return;

    setPoll((prev) => {
      const updatedOptions = prev.options.map((opt) =>
        opt.id === selectedPollOption ? { ...opt, votes: opt.votes + 1 } : opt
      );
      return {
        ...prev,
        totalVotes: prev.totalVotes + 1,
        options: updatedOptions,
      };
    });
    setHasVoted(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Widget 1: خدمات وطوارئ عروس الصعيد (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                  دليل طوارئ وخدمات المنيا
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">24 ساعة</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-800 dark:text-stone-200">طوارئ المحافظة</div>
                  <div className="text-[10px] text-stone-400">غرفة عمليات المنيا</div>
                </div>
                <span className="font-mono text-xs font-bold text-red-700 dark:text-red-400">114</span>
              </div>

              <div className="p-2.5 rounded-lg border bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-800 dark:text-stone-200">هيئة الإسعاف</div>
                  <div className="text-[10px] text-stone-400">إسعاف الصعيد</div>
                </div>
                <span className="font-mono text-xs font-bold text-red-700 dark:text-red-400">123</span>
              </div>

              <div className="p-2.5 rounded-lg border bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-800 dark:text-stone-200">شرطة النجدة</div>
                  <div className="text-[10px] text-stone-400">مديرية أمن المنيا</div>
                </div>
                <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">122</span>
              </div>

              <div className="p-2.5 rounded-lg border bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-800 dark:text-stone-200">مياه المنيا</div>
                  <div className="text-[10px] text-stone-400">طوارئ المياه والكسر</div>
                </div>
                <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">125</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 text-center">
            خدمة مجتمعية مستمرة لقرّاء جريدة مِرقاب
          </div>
        </div>

        {/* Widget 2: استطلاع رأي الأسبوع (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Vote className="w-4 h-4 text-red-700 dark:text-red-400" />
                <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                  استطلاع رأي الشارع المنياوي
                </h3>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                {poll.totalVotes.toLocaleString('ar-EG')} مشارك
              </span>
            </div>

            <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mb-3 leading-snug">
              {poll.question}
            </p>

            {/* Options */}
            <div className="space-y-2">
              {poll.options.map((opt) => {
                const percentage = Math.round((opt.votes / poll.totalVotes) * 100) || 0;
                const isSelected = selectedPollOption === opt.id;

                if (hasVoted) {
                  return (
                    <div key={opt.id} className="relative overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-800 p-2 text-xs">
                      {/* Bar fill */}
                      <div
                        className="absolute inset-y-0 right-0 bg-red-100 dark:bg-red-950/60 transition-all duration-700 rounded-lg"
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="relative flex items-center justify-between z-10 font-medium text-stone-800 dark:text-stone-200">
                        <span className="flex items-center gap-1.5 truncate">
                          {isSelected && <Check className="w-3.5 h-3.5 text-red-700" />}
                          <span className="truncate">{opt.text}</span>
                        </span>
                        <span className="font-mono text-stone-900 dark:text-stone-100 font-bold shrink-0 mr-2">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedPollOption(opt.id)}
                    className={`w-full text-right p-2 text-xs rounded-lg border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-red-700 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 font-bold'
                        : 'border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span>{opt.text}</span>
                    <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${isSelected ? 'border-red-700 bg-red-700' : 'border-stone-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            {hasVoted ? (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>تم تسجيل صوتك بنجاح، شكراً لمشاركتك!</span>
              </span>
            ) : (
              <>
                <span className="text-[11px] text-stone-400">تصويت إلكتروني حر لجريدة مرقاب</span>
                <button
                  onClick={handleVote}
                  disabled={!selectedPollOption}
                  className="px-4 py-1.5 bg-red-800 disabled:opacity-50 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  صوّت الآن
                </button>
              </>
            )}
          </div>
        </div>

        {/* Widget 3: النشرة البريدية ومطبوعات مرقاب (3 cols) */}
        <div className="lg:col-span-3 bg-stone-900 text-white p-5 rounded-2xl border border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-editorial text-base font-bold text-white mb-1">
              نشرة مِرقاب الإخبارية
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              احصل على ملخص يومي بأهم أحداث مصر ومحافظة المنيا وصعيدنا الحبيب مباشرة عبر بريدك.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-600 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                {newsletterSubscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم الاشتراك بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>اشترك في النشرة</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-800 text-[10px] text-stone-400 text-center font-mono">
            إشراف: كلية الآداب قسم الإعلام
          </div>
        </div>
      </div>
    </section>
  );
};
