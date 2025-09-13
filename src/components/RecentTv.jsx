import { useCallback, useContext, useEffect, useState } from "react";
import { TVsStore } from "../context/TVsContext";
import { Hourglass, User, Tv, Calendar, Clock, Phone, AlertTriangle } from "lucide-react";
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
                    <Hourglass size={20} className="text-yellow-700" />
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
                <Hourglass size={20} className="text-yellow-700" />
                Most awaited pending TV
            </h3>
            <div className="text-sm text-gray-700 flex flex-wrap justify-between">
                <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    <span className="capitalize font-medium">{recentTv.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Tv size={16} className="text-gray-500" />
                    <span className="uppercase">{recentTv.brand}</span>
                </div>
                <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-gray-500" />
                    <span className="capitalize">{recentTv.problem}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span>{formatDateDDMMYYYY(dateObj)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={14} className="text-orange-400" />
                    <span className="text-xs px-3 py-1 rounded-full capitalize text-white bg-orange-400">
                        pending
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    <span>{recentTv.contact || "+1 234 567 8900"}</span>
                </div>
            </div>
        </div>
    );
};

export default RecentTv;
