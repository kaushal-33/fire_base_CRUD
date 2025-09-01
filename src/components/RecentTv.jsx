import { useCallback, useContext, useEffect, useState } from "react";
import { TVsStore } from "../context/TVsContext";

const RecentTv = () => {
    const { tvData } = useContext(TVsStore);
    const [recentTv, setRecentTv] = useState(null);

    useEffect(() => {
        if (!tvData || !tvData.length) {
            setRecentTv(null);
            return;
        }
        const sorted = [...tvData].sort((a, b) => {
            const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
            const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
            return dateA - dateB;
        });
        const pendingTv = sorted.find((tv) => tv.isWorkDone === false);
        setRecentTv(pendingTv);
    }, [tvData]);

    const formatDateDDMMYYYY = useCallback((date) => {
        if (!date) return "";
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = date.getFullYear();
        return `${d}-${m}-${y}`;
    }, []);

    if (!recentTv) {
        return (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-xl shadow-sm text-yellow-700 font-semibold">
                <h3 className="text-lg mb-3 flex items-center gap-2">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Most awaited pending TV
                </h3>
                <div className="uppercase text-center font-bold text-yellow-700">
                    none
                </div>
            </div>
        );
    }

    const dateObj = recentTv.date?.toDate
        ? recentTv.date.toDate()
        : new Date(recentTv.date);

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-yellow-700 mb-3 flex items-center gap-2">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                Most awaited pending TV
            </h3>
            <div className="text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.121 17.804A6 6 0 1118.878 6.196a6 6 0 01-13.757 11.608z"
                        />
                    </svg>
                    <span className="capitalize font-medium">{recentTv.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <rect
                            width="18"
                            height="12"
                            x="3"
                            y="6"
                            rx="2"
                            ry="2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="uppercase">{recentTv.brand}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M19.428 15.341A8 8 0 115.472 5.172m13.956 10.169z"
                        />
                    </svg>
                    <span className="capitalize">{recentTv.problem}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z"
                        />
                    </svg>
                    <span>{formatDateDDMMYYYY(dateObj)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 rounded-full capitalize text-white bg-orange-400">
                        pending
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10a1 1 0 012 0v4a1 1 0 01-2 0v-4zm16 0a1 1 0 012 0v4a1 1 0 01-2 0v-4zM8 19h8M8 5h8"
                        />
                    </svg>
                    <span>{recentTv.contact || "+1 234 567 8900"}</span>
                </div>
            </div>
        </div>
    );
};

export default RecentTv;
