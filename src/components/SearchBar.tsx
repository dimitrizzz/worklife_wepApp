import { RiSearchLine } from "@remixicon/react";

type SearchBarProps = {
    placeholder?: string;
    className?: string;
    onChange?: (value: string) => void;
};

const SearchBar = ({
                       placeholder = "Search...",
                       className = "",
                       onChange,
                   }: SearchBarProps) => {
    return (
        <div className={`relative w-96 ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-xl
        bg-white/70 dark:bg-gray-700
        backdrop-blur-md
        dark:border-gray-600
        text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <RiSearchLine
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
        </div>
    );
};

export default SearchBar;