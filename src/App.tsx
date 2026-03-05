import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Catalog from "./pages/Catalog.tsx";
import Hierarchy from "./pages/Hierarchy.tsx";
import Leaves from "./pages/Leaves";
import Applications from "./pages/Applications.tsx";
import Team from "./pages/Team";
import Announcements from "./pages/Announcements";
import Translations from "./pages/Translations.tsx";
import Guide from "./pages/Guide";
import FontSize from "./pages/FontSize";
import Information from "./pages/Information";
import TopBar from "./pages/TopBar.tsx";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import type { TranslationKey } from "./i18n/translations";

const PAGE_TITLE_KEYS: Record<string, TranslationKey> = {
    "/": "nav_home",
    "/profile": "nav_profile",
    "/company/catalog": "nav_catalog",
    "/company/hierarchy": "nav_hierarchy",
    "/leaves": "nav_leaves",
    "/applications": "nav_applications",
    "/team": "nav_team",
    "/announcements": "nav_announcements",
    "/translations": "nav_language",
    "/guide": "nav_guide",
    "/font-size": "nav_fontsize",
    "/information": "nav_information",
};

function TitleUpdater() {
    const location = useLocation();
    const { t } = useLanguage();
    useEffect(() => {
        const key = PAGE_TITLE_KEYS[location.pathname];
        const name = key ? t(key) : "WorkLife";
        document.title = `${name} · WorkLife`;
    }, [location.pathname, t]);
    return null;
}

function AppInner() {
    useEffect(() => {
        const saved = localStorage.getItem("fontScale");
        const parsed = saved ? Number(saved) : 100;
        const scale = Number.isFinite(parsed) ? parsed / 100 : 1;
        document.documentElement.style.setProperty("--app-font-scale", String(scale));
    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/Rectangle 1.png')" }}
        >
            <div className="w-full h-[100vh] rounded-3xl shadow-2xl flex overflow-hidden">

                <TitleUpdater />
                <Sidebar />

                <main className="flex-1 bg-white/60 dark:bg-gray-900/80 overflow-auto p-8">
                    <TopBar/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/company/catalog" element={<Catalog />} />
                        <Route path="/company/hierarchy" element={<Hierarchy />} />
                        <Route path="/leaves" element={<Leaves />} />
                        <Route path="/applications" element={<Applications />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/announcements" element={<Announcements />} />
                        <Route path="/translations" element={<Translations />} />
                        <Route path="/guide" element={<Guide />} />
                        <Route path="/font-size" element={<FontSize />} />
                        <Route path="/information" element={<Information />} />
                    </Routes>
                </main>

            </div>
        </div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AppInner />
        </LanguageProvider>
    );
}

export default App;