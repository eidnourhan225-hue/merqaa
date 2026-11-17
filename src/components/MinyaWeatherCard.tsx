import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudFog,
  Wind,
  Droplets,
  Moon,
  RefreshCw,
  MapPin,
} from 'lucide-react';

interface MinyaWeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  isDay: boolean;
  isLive: boolean;
}

function getArabicWeatherInfo(code: number, isDay: boolean) {
  if (code === 0) {
    return {
      label: isDay ? 'سماء صافية ومشمسة' : 'ليلة صافية وهادئة',
      Icon: isDay ? Sun : Moon,
      iconColor: isDay ? 'text-amber-500' : 'text-indigo-400',
    };
  }
  if (code === 1 || code === 2) {
    return {
      label: isDay ? 'صافي إلى قليل السحب' : 'قليل السحب ليلاً',
      Icon: isDay ? CloudSun : Moon,
      iconColor: isDay ? 'text-amber-500' : 'text-indigo-300',
    };
  }
  if (code === 3) {
    return {
      label: 'غائم جزئياً',
      Icon: Cloud,
      iconColor: 'text-stone-500 dark:text-stone-400',
    };
  }
  if (code === 45 || code === 48) {
    return {
      label: 'شبورة مائية خفيفة',
      Icon: CloudFog,
      iconColor: 'text-stone-400',
    };
  }
  if (code >= 51 && code <= 67) {
    return {
      label: 'زخات مطر خفيفة',
      Icon: CloudRain,
      iconColor: 'text-sky-600 dark:text-sky-400',
    };
  }
  if (code >= 80) {
    return {
      label: 'أمطار متفرقة',
      Icon: CloudRain,
      iconColor: 'text-sky-600 dark:text-sky-400',
    };
  }
  return {
    label: 'طقس معتدل ومستقر',
    Icon: isDay ? CloudSun : Moon,
    iconColor: isDay ? 'text-amber-500' : 'text-indigo-300',
  };
}

export const MinyaWeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<MinyaWeatherData>({
    temp: 24,
    feelsLike: 23,
    humidity: 44,
    windSpeed: 12,
    tempMax: 26,
    tempMin: 13,
    weatherCode: 1,
    isDay: true,
    isLive: false,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMinyaWeather = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=28.1099&longitude=30.7503&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Africa%2FCairo&forecast_days=1'
      );
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();
      if (data?.current) {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: Math.round(data.current.relative_humidity_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          tempMax: Math.round(data.daily?.temperature_2m_max?.[0] ?? data.current.temperature_2m + 2),
          tempMin: Math.round(data.daily?.temperature_2m_min?.[0] ?? data.current.temperature_2m - 9),
          weatherCode: data.current.weather_code ?? 1,
          isDay: data.current.is_day === 1,
          isLive: true,
        });
      }
    } catch {
      // Keep graceful seasonal fallback if network is restricted
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMinyaWeather();
    const interval = setInterval(fetchMinyaWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const { label, Icon, iconColor } = getArabicWeatherInfo(weather.weatherCode, weather.isDay);

  return (
    <div className="h-full bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
            طقس المنيا الآن
          </h3>
        </div>

        <button
          onClick={fetchMinyaWeather}
          disabled={isRefreshing}
          className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title="تحديث حالة الطقس"
          aria-label="تحديث الطقس"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Center Temperature & Condition */}
      <div className="py-3 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1 font-mono tabular-nums">
            <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50">
              {weather.temp}°
            </span>
            <span className="text-xs font-bold text-stone-400">مئوية</span>
          </div>
          <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-1">
            {label}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5 font-mono tabular-nums">
            العظمى {weather.tempMax}° • الصغرى {weather.tempMin}°
          </p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-amber-50/80 dark:bg-stone-800 border border-amber-200/70 dark:border-stone-700 flex items-center justify-center shrink-0">
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
      </div>

      {/* Bottom Metrics Strip */}
      <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-stone-50 dark:bg-stone-850 rounded-lg px-2.5 py-1.5 border border-stone-200/70 dark:border-stone-800 flex items-center justify-between">
          <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
            <Droplets className="w-3 h-3 text-sky-600 dark:text-sky-400" />
            <span>الرطوبة</span>
          </span>
          <span className="font-mono font-bold text-stone-800 dark:text-stone-200 tabular-nums">
            {weather.humidity}%
          </span>
        </div>

        <div className="bg-stone-50 dark:bg-stone-850 rounded-lg px-2.5 py-1.5 border border-stone-200/70 dark:border-stone-800 flex items-center justify-between">
          <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
            <Wind className="w-3 h-3 text-teal-600 dark:text-teal-400" />
            <span>الرياح</span>
          </span>
          <span className="font-mono font-bold text-stone-800 dark:text-stone-200 tabular-nums">
            {weather.windSpeed} كم/س
          </span>
        </div>
      </div>
    </div>
  );
};
