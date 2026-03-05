import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";

function FontSize() {
  const {t} = useLanguage();
  const [size, setSize] = useState(100);

  useEffect(() => {
    const saved = localStorage.getItem("fontScale");
    const parsed = saved ? Number(saved) : 100;
    const value = Number.isFinite(parsed) ? parsed : 100;
    setSize(value);
    document.documentElement.style.setProperty("--app-font-scale", String(value / 100));
  }, []);

  const handleChange = (value: number) => {
    setSize(value);
    localStorage.setItem("fontScale", String(value));
    document.documentElement.style.setProperty("--app-font-scale", String(value / 100));
  };

  return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t('fontsize_title')}</h1>
        <p className="text-gray-500 mb-6">{t('fontsize_desc')}</p>

        <div className="max-w-md rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>85</span>
            <span>150</span>
          </div>

          <input
              type="range"
              min={85}
              max={150}
              step={1}
              value={size}
              onChange={(event) => handleChange(Number(event.target.value))}
              className="w-full accent-blue-600"
          />

          <div className="mt-3 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-semibold px-3 py-1">
            {size}
          </div>
        </div>
      </div>
  );
}

export default FontSize;
