import {useLanguage} from "../context/LanguageContext";

function Translations() {
  const {t, lang, setLang} = useLanguage();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t('translations_title')}</h1>
      <p className="text-gray-500 mb-6">{t('translations_desc')}</p>
      <div className="flex gap-3">
        <button
          onClick={() => setLang('el')}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            lang === 'el'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-blue-50'
          }`}
        >
          🇬🇷 Ελληνικά
        </button>
        <button
          onClick={() => setLang('en')}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            lang === 'en'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-blue-50'
          }`}
        >
          🇬🇧 English
        </button>
      </div>
    </div>
  );
}

export default Translations;
