import { useCallback, useContext, useMemo, useState } from "react"
import Header from "../components/Header"
import { TVsStore } from "../context/TVsContext"
import { useNavigate } from "react-router-dom"
import RecentTv from "../components/RecentTv"
import Table from "../components/Table"

const Dashboard = () => {
    const { tvData, handleDelete, setUpdateId, handleWorkDone, handleDelivered } = useContext(TVsStore)
    const navigate = useNavigate();

    const pendingTask = tvData.filter((tv) => tv.isWorkDone === false);

    return (
        <div className="min-h-screen">
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="bg-white/80 backdrop-blur-md border border-[#A77C48]/40 rounded-2xl shadow-lg p-6">
                    <h2 className="font-bold text-lg mb-4 text-[#37474F]">Recent TV</h2>
                    <RecentTv />
                </div>
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
                    {/* Add TV */}
                    <button
                        onClick={() => navigate("/add-tv")}
                        className="bg-gradient-to-r from-[#1976D2] to-[#43A047] hover:from-[#C62828] hover:to-[#A77C48] text-white px-10 py-4 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        ➕ Add TV
                    </button>
                </div>
            </div>
            {/* Data Table */}
            <div className="overflow-x-auto lg:overflow-x-visible">
                <Table />
            </div>
        </div>
    )
}
export default Dashboard
