import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TVsStore } from "../context/TVsContext";
import { User, Phone, Monitor, Settings, IndianRupeeIcon, Edit, Trash2 } from "lucide-react"; // Assume these icons exist/imported
import ConfirmPayment from "./ConfirmPayment";

const Table = () => {
    const [searchItem, setSearchItem] = useState("");
    const [confirmDelivery, setConfirmDelivery] = useState(null);
    const [isPopOverOpen, setIsPopoverOpen] = useState(false);
    const { tvData, handleDelete, setUpdateId, handleWorkDone } = useContext(TVsStore);

    const filteredData = useMemo(() => {
        if (!searchItem) return tvData;
        return tvData.filter(tv =>
            tv.customerName.toLowerCase().includes(searchItem) ||
            tv.contact.toLowerCase().includes(searchItem) ||
            tv.brand.toLowerCase().includes(searchItem)
        );
    }, [searchItem, tvData]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        if (timestamp.toDate) return timestamp.toDate().toDateString();
        return new Date(timestamp.seconds * 1000).toDateString();
    };

    return (
        <>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex flex-wrap justify-between items-center">
                <div className="md:w-9/12">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Monitor className="w-6 h-6" />
                        TV Service Records
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">Manage customer service requests and payments</p>
                </div>
                <div className="md:w-3/12 md:mt-0 mt-3">
                    <input type="text" onChange={(e) => setSearchItem(e.target.value.toLowerCase())} placeholder="Search🔎" className="search w-full border-0 outline-0 py-1 px-2 focus:shadow rounded-3xl" />
                </div>
            </div>
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Info</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">T.V Details</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Problem Description</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Work Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">delivery Status</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredData.length > 0 ? (
                        filteredData.map((tv) => (
                            <tr key={tv.id} className={`hover:bg-gray-50 transition-colors border-l-4`}>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="font-medium text-gray-900 mb-1">{formatDate(tv.date)}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-1">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="font-semibold text-gray-900 capitalize">{tv.customerName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <span>{tv.contact}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="font-medium text-gray-900 mb-1 uppercase">{tv.brand}</div>
                                        <div className="text-sm text-gray-600 flex items-center gap-1">
                                            <Monitor className="w-4 h-4" />
                                            <span>{tv.size}"</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 max-w-xs">
                                        <div className="flex items-start gap-2">
                                            <Settings className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span className="line-clamp-2 capitalize">{tv.problem}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${tv.isWorkDone === "pending" || !tv.isWorkDone ? "bg-orange-400 text-white" : "bg-green-400 text-white"
                                            }`}
                                    >
                                        {tv.isWorkDone ? "Completed" : "pending"}
                                    </span>
                                </td>
                                <td className="confirm-btn cursor-help relative px-6 py-4 text-center">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${tv.isdelivered === "pending" || !tv.isdelivered
                                            ? "bg-orange-400 text-white"
                                            : "bg-green-400 text-white"
                                            }`}
                                    >
                                        {tv.isdelivered ? "delivered" : "pending"}
                                    </span>
                                    {tv.deliveredAmount && (
                                        <div className="text-center absolute rounded-lg pop-up bg-green-300 shadow-lg p-2">
                                            <div className="mt-1 text-sm font-semibold text-gray-800 flex justify-center items-center gap-1">
                                                <IndianRupeeIcon className="w-4 h-4 text-gray-600" />
                                                <span>{Number(tv.deliveredAmount).toLocaleString()}</span>
                                            </div>
                                            <div className="text-[12px]">{formatDate(tv.deliveredDate)}</div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                setConfirmDelivery(tv);
                                                setIsPopoverOpen(!isPopOverOpen);
                                            }}
                                            className="p-2 relative text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
                                            title="Confirm Delivery"
                                        >
                                            <IndianRupeeIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleWorkDone(tv.id)}
                                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                                            title="Mark as Repaired"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(tv.id)}
                                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                            title="Delete Record"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <Link
                                            to={`/add-tv`}
                                            onClick={() => setUpdateId(tv)}
                                            className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 rounded-lg transition-colors"
                                            title="Edit Record"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="p-4 text-center text-gray-500">
                                <div className="text-center py-12">
                                    <Monitor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No service records found</h3>
                                    <p className="text-gray-600">Add your first TV service record to get started.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isPopOverOpen && <ConfirmPayment setConfirmDelivery={setConfirmDelivery} confirmDelivery={confirmDelivery} setIsPopoverOpen={setIsPopoverOpen} />}
        </>
    );
};

export default Table;
