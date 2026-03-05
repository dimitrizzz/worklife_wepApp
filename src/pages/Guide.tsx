import { useLanguage } from "../context/LanguageContext";

function Guide() {
    const { t } = useLanguage();

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {t('guide_title')}
            </h1>

            <p className="text-gray-500">
                {t('guide_desc')}
            </p>

            <a
                href="https://docs.entersoft.eu/worklife/docs/payroll-homepage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 hover:text-blue-700 underline font-medium"
            >
                {t('open_user_guide')}
            </a>
        </div>
    );
}

export default Guide;