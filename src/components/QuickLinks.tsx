import {useRef, useState} from "react";
import {TreePalm, GripVertical, Check} from "lucide-react";
import {
    RiHomeOfficeLine,
    RiFileListLine,
    RiQuestionAnswerLine,
    RiSurgicalMaskFill,
    RiSchoolLine,
    RiEditLine
} from "@remixicon/react";
import {useLanguage} from "../context/LanguageContext";
import type {TranslationKey} from "../i18n/translations";

type Action = {
    key: TranslationKey;
    icon: React.ElementType;
};

const initialActions: Action[] = [
    {key: "quick_annual_leave", icon: TreePalm},
    {key: "quick_telework", icon: RiHomeOfficeLine},
    {key: "quick_general_request", icon: RiFileListLine},
    {key: "quick_leave_balance", icon: RiQuestionAnswerLine},
    {key: "quick_sick_leave", icon: RiSurgicalMaskFill},
    {key: "quick_school_perf", icon: RiSchoolLine},
];

function QuickLinks() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [actions, setActions] = useState<Action[]>(initialActions);
    const dragIndex = useRef<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const {t} = useLanguage();

    const handleDragStart = (index: number) => {
        dragIndex.current = index;
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDrop = (index: number) => {
        if (dragIndex.current === null || dragIndex.current === index) {
            setDragOverIndex(null);
            return;
        }
        const newActions = [...actions];
        const [moved] = newActions.splice(dragIndex.current, 1);
        newActions.splice(index, 0, moved);
        setActions(newActions);
        dragIndex.current = null;
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        dragIndex.current = null;
        setDragOverIndex(null);
    };

    return (
        <div className="w-full min-w-0">
            <div className="min-w-0">
                <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        {t('quick_title')}
                    </h2>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`w-9 h-9 min-w-[36px] min-h-[36px] shrink-0 rounded-full shadow
                            flex items-center justify-center transition
                            ${isEditing
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                        {isEditing ? <Check size={18}/> : <RiEditLine size={18}/>}
                    </button>

                    <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700"></div>
                </div>

                {isEditing && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                        {t('quick_drag_hint')}
                    </p>
                )}

                <div className="w-full overflow-x-auto pb-2">
                    <div
                        ref={scrollRef}
                        className="flex gap-4 scroll-smooth w-max"
                    >
                        {actions.map((action, index) => {
                            const Icon = action.icon;
                            const isDragOver = dragOverIndex === index;

                            return (
                                <div
                                    key={action.key}
                                    draggable={isEditing}
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDrop={() => handleDrop(index)}
                                    onDragEnd={handleDragEnd}
                                    className={`min-w-[240px] flex items-center gap-3 p-4 rounded-2xl
                                        bg-white dark:bg-gray-800 shadow-sm border transition
                                        ${isEditing
                                        ? `cursor-grab active:cursor-grabbing active:opacity-50 ${
                                            isDragOver
                                                ? "border-green-400 dark:border-green-500 scale-[1.02] shadow-md"
                                                : "border-green-200 dark:border-green-800"
                                        }`
                                        : "border-gray-200 dark:border-gray-700 hover:shadow-md cursor-pointer"
                                    }`}
                                >
                                    {isEditing && (
                                        <GripVertical size={16} className="text-gray-300 dark:text-gray-600 shrink-0"/>
                                    )}

                                    <div
                                        className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white shrink-0">
                                        <Icon size={20}/>
                                    </div>

                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {t(action.key)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickLinks;