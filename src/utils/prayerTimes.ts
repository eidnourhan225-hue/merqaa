import { PrayerTime } from '../types';

export type CityKey = 'minya' | 'cairo';

export interface CityCoordinates {
  name: string;
  lat: number;
  lng: number;
}

export const CITIES: Record<CityKey, CityCoordinates> = {
  minya: { name: 'المنيا', lat: 28.1099, lng: 30.7503 },
  cairo: { name: 'القاهرة', lat: 30.0444, lng: 31.2357 },
};

export interface EgyptDateInfo {
  year: number;
  month: number; // 1-12
  day: number;   // 1-31
  hour: number;  // 0-23
  minute: number; // 0-59
  second: number; // 0-59
  utcOffsetHours: number;
  gregorianFull: string; // e.g., السبت، 14 نوفمبر 2026م
  gregorianShort: string; // e.g., 14 نوفمبر 2026م
  hijriFull: string;     // e.g., 4 جمادى الآخرة 1448هـ
  weekday: string;
}

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const ARABIC_WEEKDAYS = [
  'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت',
];

/**
 * Extracts exact current date/time components in Africa/Cairo timezone.
 */
export function getEgyptDateInfo(now: Date = new Date()): EgyptDateInfo {
  const partsFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = partsFormatter.formatToParts(now);
  const getPart = (type: string) => {
    const p = parts.find((item) => item.type === type);
    return p ? parseInt(p.value, 10) : 0;
  };

  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  let hour = getPart('hour');
  if (hour === 24) hour = 0;
  const minute = getPart('minute');
  const second = getPart('second');

  // Compute exact UTC offset for Africa/Cairo on this date (handles Egypt DST EET +2 / EEST +3)
  const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes()));
  const cairoAsUtc = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const utcOffsetHours = Math.round((cairoAsUtc.getTime() - utcDate.getTime()) / (1000 * 60 * 60));

  const cairoDateObj = new Date(Date.UTC(year, month - 1, day));
  const weekday = ARABIC_WEEKDAYS[cairoDateObj.getUTCDay()];
  const monthName = ARABIC_MONTHS[month - 1] || '';

  const gregorianShort = `${day} ${monthName} ${year}م`;
  const gregorianFull = `${weekday}، ${gregorianShort}`;

  // Format Hijri date using Umm al-Qura calendar in Arabic
  let hijriFull = '';
  try {
    const hijriFormatter = new Intl.DateTimeFormat('ar-EG-u-ca-islamic-umalqura-nu-latn', {
      timeZone: 'Africa/Cairo',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    hijriFull = hijriFormatter.format(now).replace('هـ', '').trim() + 'هـ';
  } catch {
    try {
      const fallbackHijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-nu-latn', {
        timeZone: 'Africa/Cairo',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      hijriFull = fallbackHijri.format(now).replace('هـ', '').trim() + 'هـ';
    } catch {
      hijriFull = '';
    }
  }

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    utcOffsetHours,
    gregorianFull,
    gregorianShort,
    hijriFull,
    weekday,
  };
}

// --- Astronomical Prayer Calculation (Egyptian General Authority of Survey) ---
// Fajr: 19.5 deg, Isha: 17.5 deg, Asr: Shafi'i (factor = 1)

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

function fixAngle(a: number): number {
  a = a - 360 * Math.floor(a / 360);
  return a < 0 ? a + 360 : a;
}

function fixHour(a: number): number {
  a = a - 24 * Math.floor(a / 24);
  return a < 0 ? a + 24 : a;
}

function julianDate(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function sunPosition(jd: number): { decl: number; eqTime: number } {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * Math.sin(g * D2R) + 0.020 * Math.sin(2 * g * D2R));
  const e = 23.439 - 0.00000036 * D;

  const RA = Math.atan2(Math.cos(e * D2R) * Math.sin(L * D2R), Math.cos(L * D2R)) * R2D / 15;
  const eqTime = q / 15 - fixHour(RA);
  const decl = Math.asin(Math.sin(e * D2R) * Math.sin(L * D2R)) * R2D;

  return { decl, eqTime };
}

function midDay(jd: number, t: number): number {
  const { eqTime } = sunPosition(jd + t);
  return fixHour(12 - eqTime);
}

function sunAngleTime(jd: number, lat: number, angle: number, t: number, direction: 'ccw' | 'cw'): number {
  const { decl } = sunPosition(jd + t);
  const noon = midDay(jd, t);
  const numerator = -Math.sin(angle * D2R) - Math.sin(decl * D2R) * Math.sin(lat * D2R);
  const denominator = Math.cos(decl * D2R) * Math.cos(lat * D2R);
  const ratio = Math.max(-1, Math.min(1, numerator / denominator));
  const T = Math.acos(ratio) * R2D / 15;
  return noon + (direction === 'ccw' ? -T : T);
}

function asrTime(jd: number, lat: number, factor: number, t: number): number {
  const { decl } = sunPosition(jd + t);
  const angle = -Math.atan(1 / (factor + Math.tan(Math.abs(lat - decl) * D2R))) * R2D;
  return sunAngleTime(jd, lat, angle, t, 'cw');
}

function formatTime12hArabic(decimalHours: number): { formatted: string; totalMinutes: number } {
  const totalMinutes = Math.round(fixHour(decimalHours) * 60) % (24 * 60);
  const h24 = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const suffix = h24 >= 12 ? 'م' : 'ص';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const formatted = `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
  return { formatted, totalMinutes };
}

export interface ComputedPrayerTimes {
  prayers: PrayerTime[];
  nextPrayer: PrayerTime;
  countdownText: string;
  dateInfo: EgyptDateInfo;
}

/**
 * Calculates daily prayer times for Minya or Cairo using the Egyptian General
 * Authority of Survey standard (Fajr 19.5°, Isha 17.5°, Shafi'i Asr) and
 * marks the active upcoming prayer with a live countdown.
 */
export function calculateEgyptPrayerTimes(city: CityKey, now: Date = new Date()): ComputedPrayerTimes {
  const dateInfo = getEgyptDateInfo(now);
  const { lat, lng } = CITIES[city];
  const jd = julianDate(dateInfo.year, dateInfo.month, dateInfo.day) - lng / (15 * 24);

  // Two-pass iterative refinement for high precision
  let fajrH = sunAngleTime(jd, lat, 19.5, 5 / 24, 'ccw');
  let sunriseH = sunAngleTime(jd, lat, 0.833, 6 / 24, 'ccw');
  let dhuhrH = midDay(jd, 12 / 24);
  let asrH = asrTime(jd, lat, 1, 13 / 24);
  let maghribH = sunAngleTime(jd, lat, 0.833, 18 / 24, 'cw');
  let ishaH = sunAngleTime(jd, lat, 17.5, 18 / 24, 'cw');

  // Second pass
  fajrH = sunAngleTime(jd, lat, 19.5, fajrH / 24, 'ccw');
  sunriseH = sunAngleTime(jd, lat, 0.833, sunriseH / 24, 'ccw');
  dhuhrH = midDay(jd, dhuhrH / 24);
  asrH = asrTime(jd, lat, 1, asrH / 24);
  maghribH = sunAngleTime(jd, lat, 0.833, maghribH / 24, 'cw');
  ishaH = sunAngleTime(jd, lat, 17.5, ishaH / 24, 'cw');

  const offset = dateInfo.utcOffsetHours - lng / 15;
  // Standard 1-minute safety margin for Dhuhr/Maghrib per Egyptian Survey tables
  const rawList = [
    { name: 'الفجر', englishKey: 'fajr', hours: fajrH + offset },
    { name: 'الشروق', englishKey: 'sunrise', hours: sunriseH + offset },
    { name: 'الظهر', englishKey: 'dhuhr', hours: dhuhrH + offset + 1 / 60 },
    { name: 'العصر', englishKey: 'asr', hours: asrH + offset },
    { name: 'المغرب', englishKey: 'maghrib', hours: maghribH + offset + 1 / 60 },
    { name: 'العشاء', englishKey: 'isha', hours: ishaH + offset },
  ];

  const nowMinutes = dateInfo.hour * 60 + dateInfo.minute;
  const formattedItems = rawList.map((item) => {
    const { formatted, totalMinutes } = formatTime12hArabic(item.hours);
    return {
      name: item.name,
      englishKey: item.englishKey,
      time: formatted,
      totalMinutes,
    };
  });

  // Find the next upcoming prayer for today
  let nextIndex = formattedItems.findIndex((item) => item.totalMinutes > nowMinutes);
  let diffMinutes = 0;

  if (nextIndex === -1) {
    // Past Isha: next prayer is tomorrow's Fajr
    nextIndex = 0;
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowInfo = getEgyptDateInfo(tomorrow);
    const jdTomorrow = julianDate(tomorrowInfo.year, tomorrowInfo.month, tomorrowInfo.day) - lng / (15 * 24);
    const tomorrowFajrH = sunAngleTime(jdTomorrow, lat, 19.5, 5 / 24, 'ccw') + offset;
    const tomorrowFajrMin = Math.round(fixHour(tomorrowFajrH) * 60) % (24 * 60);
    diffMinutes = (24 * 60 - nowMinutes) + tomorrowFajrMin;
  } else {
    diffMinutes = formattedItems[nextIndex].totalMinutes - nowMinutes;
  }

  const prayers: PrayerTime[] = formattedItems.map((item, idx) => ({
    name: item.name,
    time: item.time,
    englishKey: item.englishKey,
    isNext: idx === nextIndex,
  }));

  const remHours = Math.floor(diffMinutes / 60);
  const remMins = diffMinutes % 60;
  const countdownText =
    remHours > 0
      ? `متبقي ${remHours} ساعة و${remMins} دقيقة`
      : `متبقي ${remMins} دقيقة`;

  return {
    prayers,
    nextPrayer: prayers[nextIndex],
    countdownText,
    dateInfo,
  };
}
