import {useMemo, useState, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {NavLink, useLocation} from "react-router-dom";
import {
    Type,
    TreePalm
} from "lucide-react";
import {
    RiTranslate,
    RiHomeLine,
    RiUserLine,
    RiBuilding4Fill,
    RiMessage2Line,
    RiGroup3Line,
    RiMegaphoneLine,
    RiBookOpenLine,
    RiInformationLine,
    RiArrowRightSLine,
    RiArrowLeftSLine,
    RiArrowDownSLine,
    RiSunLine,
    RiMoonLine
} from "@remixicon/react";
import {useLanguage} from "../context/LanguageContext";
import type {TranslationKey} from "../i18n/translations";

type NavChild = { labelKey: TranslationKey; path: string };

type NavItem = {
    labelKey: TranslationKey;
    icon: React.ElementType;
    path?: string;
    children?: NavChild[];
};

const mainNav: NavItem[] = [
    {labelKey: "nav_home", icon: RiHomeLine, path: "/"},
    {labelKey: "nav_profile", icon: RiUserLine, path: "/profile"},
    {
        labelKey: "nav_company",
        icon: RiBuilding4Fill,
        children: [
            {labelKey: "nav_catalog", path: "/company/catalog"},
            {labelKey: "nav_hierarchy", path: "/company/hierarchy"},
        ],
    },
    {labelKey: "nav_leaves", icon: TreePalm, path: "/leaves"},
    {labelKey: "nav_applications", icon: RiMessage2Line, path: "/applications"},
    {labelKey: "nav_team", icon: RiGroup3Line, path: "/team"},
    {labelKey: "nav_announcements", icon: RiMegaphoneLine, path: "/announcements"},
];

const bottomNav: NavItem[] = [
    {labelKey: "nav_guide", icon: RiBookOpenLine, path: "/guide"},
    {labelKey: "nav_fontsize", icon: Type, path: "/font-size"},
    {labelKey: "nav_information", icon: RiInformationLine, path: "/information"},
];

const Sidebar = () => {
    const location = useLocation();
    const {t, lang, setLang} = useLanguage();

    const [collapsed, setCollapsed] = useState(false);
    const [etaireiaOpen, setEtaireiaOpen] = useState(
        location.pathname.startsWith("/etaireia")
    );

    const [flyoutOpen, setFlyoutOpen] = useState<string | null>(null);
    const [flyoutPos, setFlyoutPos] = useState<{top: number; left: number}>({top: 0, left: 0});
    const flyoutButtonRef = useRef<HTMLButtonElement>(null);
    const flyoutCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const langButtonRef = useRef<HTMLAnchorElement>(null);
    const [langFlyoutOpen, setLangFlyoutOpen] = useState(false);
    const [langFlyoutPos, setLangFlyoutPos] = useState<{top: number; left: number}>({top: 0, left: 0});
    const langCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openFlyout = (label: string) => {
        if (flyoutCloseTimer.current) clearTimeout(flyoutCloseTimer.current);
        setFlyoutOpen(label);
    };

    const closeFlyout = () => {
        flyoutCloseTimer.current = setTimeout(() => setFlyoutOpen(null), 120);
    };

    const openLangFlyout = () => {
        if (langCloseTimer.current) clearTimeout(langCloseTimer.current);
        if (langButtonRef.current) {
            const rect = langButtonRef.current.getBoundingClientRect();
            setLangFlyoutPos({top: rect.top, left: rect.right + 8});
        }
        setLangFlyoutOpen(true);
    };

    const closeLangFlyout = () => {
        langCloseTimer.current = setTimeout(() => setLangFlyoutOpen(false), 120);
    };

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved === "dark";
    });

    const applyTheme = (nextIsDark: boolean) => {
        const root = document.documentElement;
        const body = document.body;
        const appRoot = document.getElementById("root");
        root.classList.toggle("dark", nextIsDark);
        body.classList.toggle("dark", nextIsDark);
        appRoot?.classList.toggle("dark", nextIsDark);
        localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    };

    const setTheme = (nextIsDark: boolean) => {
        setIsDarkMode(nextIsDark);
        applyTheme(nextIsDark);
    };

    useEffect(() => {
        applyTheme(isDarkMode);
    }, [isDarkMode]);

    const isEtaireiaActive = useMemo(
        () => location.pathname.startsWith("/etaireia"),
        [location.pathname]
    );

    const itemBase =
        "flex items-center rounded-lg text-sm font-medium transition-all duration-200";

    const navItemClass = (isActive: boolean) =>
        `${itemBase} ${
            collapsed
                ? "justify-center w-12 mx-auto py-2.5"
                : "gap-3 px-4 py-2.5"
        } ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        }`;

    const parentButtonClass = (isActive: boolean) =>
        `${itemBase} w-full ${
            collapsed
                ? "justify-center w-12 mx-auto py-2.5"
                : "gap-3 px-4 py-2.5"
        } ${
            isActive
                ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30"
                : "text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        }`;

    return (
        <aside
            className={`relative z-30 h-full 
  bg-white dark:bg-gray-900 
  border-r border-gray-200 dark:border-gray-800 
  flex flex-col transition-all duration-300 
  ${collapsed ? "w-20" : "w-64"}`}
        >
            <button
                onClick={() => setCollapsed((v) => !v)}
                className="absolute top-6 -right-3 z-50
        w-7 h-7 rounded-full
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-md
        flex items-center justify-center
        hover:bg-blue-50 dark:hover:bg-gray-700"
            >
                {collapsed ? <RiArrowRightSLine size={16}/> : <RiArrowLeftSLine size={16}/>}
            </button>

            <div className="p-4 flex justify-center">
                <img
                    src="/Logo (2).svg"
                    alt="WorkLife Logo"
                    className={`transition-all duration-200 ${
                        collapsed ? "h-8" : "h-6"
                    }`}
                />
            </div>
            <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                {mainNav.map((item) => {
                    if (item.children) {
                        return (
                            <div
                                key={`${item.labelKey}-${item.path ?? "group"}`}
                                className="relative"
                                onMouseEnter={() => {
                                    if (collapsed) {
                                        if (flyoutButtonRef.current) {
                                            const rect = flyoutButtonRef.current.getBoundingClientRect();
                                            setFlyoutPos({top: rect.top, left: rect.right + 8});
                                        }
                                        openFlyout(item.labelKey);
                                    }
                                }}
                                onMouseLeave={() =>
                                    collapsed && closeFlyout()
                                }
                            >
                                <button
                                    ref={flyoutButtonRef}
                                    onClick={() =>
                                        !collapsed &&
                                        setEtaireiaOpen((v) => !v)
                                    }
                                    className={parentButtonClass(isEtaireiaActive)}
                                >
                                    <item.icon size={18}/>

                                    {!collapsed && (
                                        <>
                      <span className="flex-1 text-left">
                        {t(item.labelKey)}
                      </span>
                                            {etaireiaOpen ? (
                                                <RiArrowDownSLine size={16}/>
                                            ) : (
                                                <RiArrowRightSLine size={16}/>
                                            )}
                                        </>
                                    )}
                                </button>

                                {!collapsed && etaireiaOpen && (
                                    <div className="ml-7 mt-1 space-y-1">
                                        {item.children.map((child) => (
                                            <NavLink
                                                key={`${item.labelKey}-${child.path}`}
                                                to={child.path}
                                                className={({isActive}) =>
                                                    navItemClass(isActive)
                                                }
                                            >
                                                {t(child.labelKey)}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}

                                {collapsed && flyoutOpen === item.labelKey && createPortal(
                                    <div
                                        style={{top: flyoutPos.top, left: flyoutPos.left}}
                                        className="fixed w-56 rounded-2xl
                              bg-white dark:bg-gray-900
                              border border-gray-200 dark:border-gray-700
                              shadow-xl p-2 z-[9999]"
                                        onMouseEnter={() => openFlyout(item.labelKey)}
                                        onMouseLeave={() => closeFlyout()}
                                    >
                                        <div
                                            className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                            {t(item.labelKey)}
                                        </div>

                                        <div className="space-y-1 mt-1">
                                            {item.children.map((child) => (
                                                <NavLink
                                                    key={`${item.labelKey}-${child.path}`}
                                                    to={child.path}
                                                    onClick={() =>
                                                        setFlyoutOpen(null)
                                                    }
                                                    className={({isActive}) =>
                                                        `flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                                                            isActive
                                                                ? "bg-blue-600 text-white"
                                                                : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                                                        }`
                                                    }
                                                >
                                                    {t(child.labelKey)}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>,
                                    document.body
                                )}
                            </div>
                        );
                    }

                    return (
                        <NavLink
                            key={`${item.labelKey}-${item.path ?? "item"}`}
                            to={item.path!}
                            end={item.path === "/"}
                            className={({isActive}) =>
                                navItemClass(isActive)
                            }
                        >
                            <item.icon size={18}/>
                            {!collapsed && <span>{t(item.labelKey)}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-800 mx-3 my-2"/>

            <nav className="px-2 space-y-1">
                {collapsed ? (
                    <div
                        className="relative"
                        onMouseEnter={openLangFlyout}
                        onMouseLeave={closeLangFlyout}
                    >
                        <NavLink
                            ref={langButtonRef}
                            to="/translations"
                            className={({isActive}) => navItemClass(isActive)}
                        >
                            <RiTranslate size={18}/>
                        </NavLink>
                        {langFlyoutOpen && createPortal(
                            <div
                                style={{top: langFlyoutPos.top, left: langFlyoutPos.left}}
                                className="fixed w-44 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl p-2 z-[9999]"
                                onMouseEnter={() => {
                                    if (langCloseTimer.current) clearTimeout(langCloseTimer.current);
                                    setLangFlyoutOpen(true);
                                }}
                                onMouseLeave={closeLangFlyout}
                            >
                                <div className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                                    {t('nav_language')}
                                </div>
                                <div className="flex gap-1 px-1">
                                    <button
                                        onClick={() => {setLang('el'); setLangFlyoutOpen(false);}}
                                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${lang === 'el' ? 'bg-blue-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                    >ΕΛ</button>
                                    <button
                                        onClick={() => {setLang('en'); setLangFlyoutOpen(false);}}
                                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                    >EN</button>
                                </div>
                            </div>,
                            document.body
                        )}
                    </div>
                ) : (
                    <NavLink
                        to="/translations"
                        className={({isActive}) => navItemClass(isActive)}
                    >
                        <RiTranslate size={18} className="shrink-0"/>
                        <span className="text-sm">{t('nav_language')}</span>
                    </NavLink>
                )}

                {bottomNav.map((item) => (
                    <NavLink
                        key={`${item.labelKey}-${item.path ?? "item"}`}
                        to={item.path!}
                        className={({isActive}) =>
                            navItemClass(isActive)
                        }
                    >
                        <item.icon size={18}/>
                        {!collapsed && <span>{t(item.labelKey)}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="px-3 py-4">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl gap-1 ">
                    <button
                        onClick={() => setTheme(false)}
                        className={`flex-1 py-1.5 rounded-lg text-xs w-full justify-center flex cursor-pointer ${
                            !isDarkMode
                                ? "bg-white dark:bg-gray-700 shadow-sm"
                                : "text-gray-500 dark:text-gray-400"
                        }`}
                    >
                        <RiSunLine size={14}/>
                    </button>

                    <button
                        onClick={() => setTheme(true)}
                        className={`flex-1 py-1.5 rounded-lg text-xs w-full justify-center flex cursor-pointer ${
                            isDarkMode
                                ? "bg-white dark:bg-gray-700 shadow-sm"
                                : "text-gray-500 dark:text-gray-400"
                        }`}
                    >
                        <RiMoonLine size={14}/>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
