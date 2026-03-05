import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Lang, type TranslationKey, translations } from '../i18n/translations';

type LanguageContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
    lang: 'el',
    setLang: () => {},
    t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        return (localStorage.getItem('lang') as Lang) ?? 'el';
    });

    const setLang = (l: Lang) => {
        setLangState(l);
        localStorage.setItem('lang', l);
    };

    const t = (key: TranslationKey): string => translations[lang][key];

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
