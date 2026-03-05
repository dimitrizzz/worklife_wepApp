import {useLanguage} from "../context/LanguageContext";

function Leaves() {
  const {t} = useLanguage();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t('leaves_title')}</h1>
      <p className="text-gray-500">{t('leaves_desc')}</p>
    </div>
  );
}

export default Leaves;
