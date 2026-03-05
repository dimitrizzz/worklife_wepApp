import QuickLinks from "../components/QuickLinks";
import {useLanguage} from "../context/LanguageContext";

function Home() {
    const {t} = useLanguage();
    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {t('home_welcome')}
                </h1>
            </div>

            <QuickLinks />
        </div>
    );
}

export default Home;