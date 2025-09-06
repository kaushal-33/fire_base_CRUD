import { useCallback, useContext, useMemo, useState } from "react"
import Header from "../components/Header"
import { TVsStore } from "../context/TVsContext"
import { useNavigate } from "react-router-dom"
import RecentTv from "../components/RecentTv"

const Dashboard = () => {
    const [isPopOverOpen, setIsPopoverOpen] = useState(false);
    const [confirmDelivery, setConfirmDelivery] = useState({})
    const [confirmAmount, setConfirmAmount] = useState("")
    const [searchItem, setSearchItem] = useState("");
    const { tvData, handleDelete, setUpdateId, handleWorkDone, handleDelivered } = useContext(TVsStore)
    const navigate = useNavigate();

    const filteredData = useMemo(() => {
        if (!searchItem) return tvData;
        return tvData.filter(tv =>
            tv.customerName.toLowerCase().includes(searchItem) ||
            tv.contact.includes(searchItem) ||
            tv.brand.toLowerCase().includes(searchItem)
        );
    }, [searchItem, tvData]);

    const formatDateDDMMYYYY = useCallback((date) => {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}-${m}-${y}`;
    }, []);

    const pendingTask = tvData.filter((tv) => tv.isWorkDone === false);

    return (
        <div className="min-h-screen bg-[#F9E3B9]">
            <Header />

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Recent TVs */}
                <div className="bg-white/80 backdrop-blur-md border border-[#A77C48]/40 rounded-2xl shadow-lg p-6">
                    <h2 className="font-bold text-lg mb-4 text-[#37474F]">Recent TVs</h2>
                    <RecentTv />
                </div>

                {/* Stats + Search */}
                <div className="bg-white/80 backdrop-blur-md border border-[#A77C48]/40 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
                    <div className="space-y-2 text-sm font-semibold">
                        <div className="flex justify-between">
                            <span className="text-[#A77C48]">Total TVs</span>
                            <span className="text-[#1976D2]">{tvData.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#A77C48]">Pending</span>
                            <span className="text-[#FFC107]">{pendingTask.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#A77C48]">Completed</span>
                            <span className="text-[#43A047]">{tvData.length - pendingTask.length}</span>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value.toLowerCase())}
                        placeholder="🔍 Search TV..."
                        className="mt-4 w-full px-4 py-3 rounded-lg border border-[#A77C48]/40 focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/40 bg-[#FFF8E1] text-[#37474F] transition"
                    />
                </div>

                {/* Add TV */}
                <div className="bg-white/80 backdrop-blur-md border border-[#A77C48]/40 rounded-2xl shadow-lg flex items-center justify-center">
                    <button
                        onClick={() => navigate("/add-tv")}
                        className="bg-gradient-to-r from-[#1976D2] to-[#43A047] hover:from-[#C62828] hover:to-[#A77C48] text-white px-10 py-4 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        ➕ Add TV
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto mt-8 mx-6 bg-white/90 backdrop-blur-md rounded-2xl border border-[#A77C48]/40 shadow">
                <table className="min-w-full divide-y divide-[#A77C48]/30">
                    <thead className="bg-[#FFF8E1]">
                        <tr>
                            {["Date", "Customer Info", "TV Details", "Problem", "Work Status", "Delivery", "Actions"].map((head, i) => (
                                <th key={i} className="px-6 py-4 text-left text-xs font-bold text-[#A77C48] uppercase tracking-wider">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#A77C48]/20">
                        {filteredData.length > 0 ? (
                            filteredData.map(tv => (
                                <tr key={tv.id} className="hover:bg-[#F9E3B9]/30 transition">
                                    <td className="px-6 py-3 text-sm text-[#37474F]">{formatDateDDMMYYYY(tv.date.toDate())}</td>
                                    <td className="px-6 py-3 text-sm text-[#37474F]">
                                        <div className="font-semibold">{tv.customerName}</div>
                                        <div>{tv.contact}</div>
                                    </td>
                                    <td className="px-6 py-3 text-sm text-center">{tv.brand} {tv.size}"</td>
                                    <td className="px-6 py-3 text-sm text-center">{tv.problem}</td>
                                    <td className={`px-6 py-3 text-sm text-center font-medium ${tv.isWorkDone ? "text-[#43A047]" : "text-[#FFC107]"}`}>
                                        {tv.isWorkDone ? "Completed" : "Pending"}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-center">
                                        <span className={`${tv.isdelivered ? "text-[#43A047]" : "text-[#37474F]"}`}>
                                            {tv.isdelivered ? "Delivered" : "Pending"}
                                        </span>
                                        {tv.isdelivered && <span className="block font-semibold">₹{tv.deliveredAmount}</span>}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-center space-x-2">
                                        <button
                                            className="px-3 py-1 border border-[#43A047] rounded-lg text-xs hover:bg-[#43A047] hover:text-white transition"
                                            onClick={() => { setConfirmDelivery(tv); setIsPopoverOpen(true); }}
                                        >✅ Delivery</button>
                                        <button
                                            className="px-3 py-1 bg-[#FFC107] text-[#37474F] rounded-lg text-xs hover:bg-[#A77C48] transition"
                                            onClick={() => handleWorkDone(tv.id)}
                                        >Repaired</button>
                                        <button
                                            className="px-3 py-1 text-white bg-[#C62828] rounded-lg text-xs hover:opacity-90 transition"
                                            onClick={() => handleDelete(tv.id)}
                                        >❌ Delete</button>
                                        <button
                                            className="px-3 py-1 bg-[#1976D2] text-white rounded-lg text-xs hover:bg-[#A77C48] transition"
                                            onClick={() => { setUpdateId(tv.id); navigate("/add-tv"); }}
                                        >✏️ Edit</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={7} className="text-center py-6 text-[#37474F]">No Data Available</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Popover */}
            {isPopOverOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 mx-4 border border-[#A77C48]/40 animate-fade-in">
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h3 className="text-lg font-bold text-[#37474F]">Confirm Payment</h3>
                            <button onClick={() => setIsPopoverOpen(false)} className="text-[#C62828]">❌</button>
                        </div>

                        <div className="space-y-3 text-sm text-[#37474F]">
                            <div className="flex justify-between"><span>Customer</span><span className="font-semibold capitalize">{confirmDelivery.customerName}</span></div>
                            <div className="flex justify-between"><span>Brand</span><span className="font-semibold uppercase">{confirmDelivery.brand}</span></div>
                            <div className="flex justify-between"><span>Size</span><span>{confirmDelivery.size}"</span></div>
                            <div className="flex justify-between"><span>Problem</span><span className="max-w-[150px] text-right">{confirmDelivery.problem}</span></div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="amount" className="capitalize">Amount</label>
                                <input
                                    id="amount"
                                    type="number"
                                    value={confirmAmount}
                                    onChange={(e) => setConfirmAmount(Number(e.target.value))}
                                    placeholder="₹ 00,000"
                                    className="ml-2 w-32 text-right border-b border-[#43A047] bg-[#FFF8E1] px-2 py-1 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    handleDelivered(confirmDelivery.id, confirmAmount);
                                    setConfirmDelivery({});
                                    setConfirmAmount("");
                                    setIsPopoverOpen(false);
                                }}
                                className="px-5 py-2 bg-[#43A047] text-white rounded-lg hover:bg-[#A77C48] transition shadow"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Dashboard
