import { useCallback, useContext, useState } from "react"
import Header from "../components/Header"
import { TVsStore } from "../context/TVsContext"
import { useNavigate } from "react-router-dom"
import RecentTv from "../components/RecentTv"

const Dashboard = () => {
    const [isPopOverOpen, setIsPopoverOpen] = useState(false);
    const [confirmDelivery, setConfirmDelivery] = useState({})
    const [confirmAmount, setConfirmAmount] = useState("")
    const { tvData, handleDelete, setUpdateId, handleWorkDone, handleDelivered } = useContext(TVsStore)
    const navigate = useNavigate();
    const formatDateDDMMYYYY = useCallback((date) => {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}-${m}-${y}`;
    }, []);

    const pendingTask = tvData.filter((tv) => tv.isWorkDone === false);

    return (
        <div className="">
            <Header />
            <div className="flex flex-col md:flex-row gap-8 p-4 bg-gray-50 rounded-lg shadow-md">
                {/* Recent TV Section */}
                <div className="w-full md:w-2/4 bg-white p-5 rounded-lg shadow-sm">
                    <RecentTv />
                </div>
                {/* TV Stats and Search Section */}
                <div className="w-full md:w-1/4 flex items-end bg-white p-5 rounded-lg shadow-sm">
                    <div className="w-full">
                        <div className="mb-4 text-gray-700 font-semibold text-base">
                            <div>Total TV: <span className="text-blue-600">{tvData.length}</span></div>
                            <div>Pending TV: <span className="text-orange-500">{pendingTask.length}</span></div>
                            <div>Completed TV: <span className="text-green-600">{tvData.length - pendingTask.length}</span></div>
                        </div>
                        <input
                            type="text"
                            placeholder="Search TV..."
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
                        />
                    </div>
                </div>

                {/* AddTV Button Section */}
                <div className="w-full md:w-1/4 flex items-center justify-center bg-white p-5 rounded-lg shadow-sm">
                    <button
                        onClick={() => navigate("/add-tv")}
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold shadow-md transition-colors"
                    >
                        AddTV
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto mt-5">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Info</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">T.V Details</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Problem Description</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Work done</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Delivery Status</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tvData.length > 0 ? (tvData.map(tv => {
                            return <tr key={tv?.id} className="bg-white font-mono">
                                <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                                    {formatDateDDMMYYYY(tv.date.toDate())}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                                    <span className="block font-semibold">
                                        {tv?.customerName}
                                    </span>
                                    <span className="block">
                                        {tv?.contact}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-700 text-center capitalize">{tv?.brand} {tv?.size}"</td>
                                <td className="px-4 py-4 text-sm text-gray-700 text-center">{tv?.problem}</td>
                                <td className="px-4 py-4 text-sm text-center capitalize text-yellow-600 font-medium">{tv.isWorkDone ? "Completed" : "Pending"}</td>
                                <td className="px-4 py-4 text-sm text-center text-gray-500">
                                    {tv.isdelivered ? "Delivered" : "Pending"}
                                    <span className="block">{tv.isdelivered === true && `₹${tv?.deliveredAmount}`}</span>
                                </td>
                                <td className="px-4 py-4 text-sm text-center space-x-2">
                                    <button className="px-3 py-1 border border-green-500 rounded text-xs" title="Confirm delivery"
                                        onClick={() => {
                                            setConfirmDelivery(tv)
                                            setIsPopoverOpen(!isPopOverOpen)
                                        }}>✅Delivery</button>
                                    <button className="px-3 py-1 bg-yellow-500 text-white rounded text-xs" onClick={() => handleWorkDone(tv.id)}>Repaired</button>
                                    <button className="px-3 py-1 text-white rounded text-xs border border-red-500" onClick={() => handleDelete(tv.id)} title="Delete">❌</button>
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs" onClick={() => {
                                        setUpdateId(tv.id);
                                        navigate("/add-tv");
                                    }}>Edit</button>
                                </td>
                            </tr>
                        })) : <tr><td className="text-center" colSpan={7}>NO data</td></tr>
                        }
                    </tbody>
                </table>
            </div>
            {isPopOverOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 mx-4 animate-fade-in">
                        <div className="text-end pb-2 border-b border-green-500">
                            <button
                                onClick={() => setIsPopoverOpen(false)}
                                className="cursor-pointer"
                            >
                                ❌
                            </button>
                        </div>
                        <div className="text-xl font-semibold text-white py-2 text-center uppercase rounded-md mb-4 mt-1 bg-green-500">
                            <span>Confirm Payment</span>
                        </div>

                        <div className="flex flex-col gap-3 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <span>Customer Name</span>
                                <span className="font-medium capitalize">{confirmDelivery?.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Brand</span>
                                <span className="font-medium uppercase">{confirmDelivery?.brand}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Size</span>
                                <span className="font-medium">{confirmDelivery?.size}"</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Problem</span>
                                <span className="capitalize max-w-[150px] text-right">{confirmDelivery?.problem}</span>
                            </div>
                            <div className="flex justify-between">
                                <label htmlFor="amount" className="capitalize">amount</label>
                                <input type="number" id="amount" value={confirmAmount} onChange={(e) => setConfirmAmount(Number(e.target.value))} placeholder="₹ 00,000" className="focus:outline-0 pb-1 border-b border-green-500 font-bold" />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    handleDelivered(confirmDelivery.id, confirmAmount)
                                    setConfirmDelivery({})
                                    setConfirmAmount("")
                                    setIsPopoverOpen(false)
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
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