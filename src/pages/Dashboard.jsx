import { useContext } from "react"
import Header from "../components/Header"
import { TVsStore } from "../context/TVsContext"
import RecentTv from "../components/RecentTv"
import Table from "../components/Table"
import { CheckCircle, Clock, Tv } from "lucide-react"

const Dashboard = () => {
    const { tvData } = useContext(TVsStore)

    const pendingTask = tvData.filter((tv) => tv.isWorkDone === false);

    return (
        <div className="min-h-screen">
            <div className="px-2 pt-2">
                <Header />
            </div>
            <div className="">
                <div className="bg-white/80 backdrop-blur-md border border-[#A77C48]/40 rounded-lg mx-2 my-2 shadow-lg p-2">
                    <RecentTv />
                </div>
                <div className="bg-white/80 backdrop-blur-md border border-[#A77C48]/40 shadow-lg rounded-lg mx-2 mb-2 flex flex-col justify-between">
                    <div className="p-2 text-sm font-medium flex justify-between md:flex-nowrap gap-2 flex-wrap items-center">
                        <div className="md:w-4/12 w-full flex items-center justify-between p-3 rounded-lg bg-[#1976D2]/10">
                            <span className="flex items-center gap-2 text-[#37474F]">
                                <Tv className="w-4 h-4 text-[#1976D2]" /> Total TVs
                            </span>
                            <span className="text-[#1976D2] font-bold">{tvData.length}</span>
                        </div>

                        <div className="md:w-4/12 w-full flex items-center justify-between p-3 rounded-lg bg-[#FFC107]/10">
                            <span className="flex items-center gap-2 text-[#37474F]">
                                <Clock className="w-4 h-4 text-[#FFC107]" /> Pending
                            </span>
                            <span className="text-[#FFC107] font-bold">{pendingTask.length}</span>
                        </div>

                        <div className="md:w-4/12 w-full flex items-center justify-between p-3 rounded-lg bg-[#43A047]/10">
                            <span className="flex items-center gap-2 text-[#37474F]">
                                <CheckCircle className="w-4 h-4 text-[#43A047]" /> Completed
                            </span>
                            <span className="text-[#43A047] font-bold">{tvData.length - pendingTask.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Data Table */}
            <div className="mx-2 mb-2 p-2 rounded-lg border border-[#A77C48]/40">
                <Table />
            </div>
        </div>
    )
}
export default Dashboard
