import {useEffect, useRef, useState} from "react";
import {
    RiMessage2Line,
    RiUserLine,
    RiNotification2Line,
    RiLockPasswordLine,
    RiShieldLine,
    RiLogoutBoxRLine,
    RiDeleteBinLine,
} from "@remixicon/react";
import SearchBar from "../components/SearchBar.tsx"
import {useLanguage} from "../context/LanguageContext";
import {getTodayNamedays} from "../data/namedays";

const USER_NAME = "D.CHOREMIOTIS";

const TopBar = () => {
    const {t} = useLanguage();

    // User menu
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Notifications (name days)
    const todayNamedays = getTodayNamedays();
    const [notifDismissed, setNotifDismissed] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const notifCount = notifDismissed ? 0 : todayNamedays.length;

    useEffect(() => {
        if (!menuOpen) return;
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [menuOpen]);

    useEffect(() => {
        if (!notifOpen) return;
        const handler = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [notifOpen]);

    const now = new Date();
    const dateStr = now.toLocaleString("el-GR");

    return (
        <div className="w-full flex items-center justify-end mb-6">

            <SearchBar
                placeholder={t('search_placeholder')}
                className="mr-10"
            />

            <div className="flex items-center gap-4">

                <div className="relative">
                    <button
                        className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <RiMessage2Line size={18}/>
                    </button>
                </div>

                {/* Notification bell */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen((v) => !v)}
                        className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <RiNotification2Line size={18}/>
                    </button>
                    {notifCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center pointer-events-none">
                            {notifCount}
                        </span>
                    )}

                    {notifOpen && (
                        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-xl py-3 z-50">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    {t('notif_title')}: {notifCount}
                                </span>
                                {notifCount > 0 && (
                                    <button
                                        onClick={() => setNotifDismissed(true)}
                                        className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
                                    >
                                        <RiDeleteBinLine size={13}/>
                                        {t('notif_clear_all')}
                                    </button>
                                )}
                            </div>

                            {/* Body */}
                            <div className="px-4 pt-3">
                                {!notifDismissed && todayNamedays.length > 0 ? (
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl leading-none mt-0.5">🎉</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                                {t('notif_nameday')} {todayNamedays.join(", ")}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{dateStr}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-2">
                                        {t('notif_no_namedays')}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* User menu */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <RiUserLine size={18}/>
                    </button>

                    {menuOpen && (
                        <div
                            className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-xl py-2 z-50">
                            <div
                                className="px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                {USER_NAME}
                            </div>

                            <div className="mx-2 mb-1">
                                <button
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left">
                                    <RiLockPasswordLine size={16} className="shrink-0"/>
                                    {t('user_change_password')}
                                </button>
                            </div>

                            <div className="mx-2 mb-1">
                                <button
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left">
                                    <RiShieldLine size={16} className="shrink-0"/>
                                    {t('user_tfa')}
                                </button>
                            </div>

                            <div className="mx-2 border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                                <button
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left">
                                    <RiLogoutBoxRLine size={16} className="shrink-0"/>
                                    {t('user_logout')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TopBar;
