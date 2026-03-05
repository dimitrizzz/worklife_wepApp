import {useLanguage} from "../context/LanguageContext";

function Information() {
    const {t} = useLanguage();

    const infoData = [
        {label: "Έκδοση εφαρμογής", value: "1.0.0"},
        {label: "Ημ/νία εισόδου", value: "5/3/2026"},
        {label: "Εταιρεία", value: "010 ENTERSOFTONE ΑΝΩΝΥΜΗ ΕΤΑΙΡΙΑ"},
        {label: "Υποκ.", value: "010-1 ΚΑΛΛΙΘΕΑ-ΑΧΙΛΛΕΩΣ 8"},
        {label: "Web server", value: "26.2"},
        {label: "Core Version", value: "5.13.0 - 5"},
    ];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {t("information_title")}
            </h1>

            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 max-w-xl">
                {infoData.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center px-6 py-4 border-b last:border-none border-gray-200 dark:border-gray-700"
                    >
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {item.label}:
            </span>

                        <span className="font-medium text-gray-800 dark:text-gray-100 text-sm text-right">
              {item.value}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Information;