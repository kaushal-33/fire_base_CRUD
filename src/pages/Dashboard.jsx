import { useContext } from "react"
import Header from "../components/Header"
import { TVsStore } from "../context/TVsContext"

const Dashboard = () => {

    const { tvData } = useContext(TVsStore)
    console.log(tvData)
    return (
        <div className="">
            <Header />
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Info</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">T.V Details</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Problem Description</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Delivered Date</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tvData.length > 0 ? (tvData.map(tv => {
                            return <tr key={tv?.id} className="bg-white font-mono">
                                <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                                    {tv.date.toDate().toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                                    <span className="block font-semibold">
                                        {tv?.customerName}
                                    </span>
                                    <span className="block">
                                        {tv?.contact}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 capitalize">{tv?.brand} {tv?.size}"</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{tv?.problem}</td>
                                <td className="px-6 py-4 text-sm text-center capitalize text-yellow-600 font-medium">Pending</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-500">--</td>
                                <td className="px-6 py-4 text-sm text-center space-x-2">
                                    <button className="px-3 py-1 border border-green-500 rounded text-xs" title="Confirm delivery">✅Delivery</button>
                                    <button className="px-3 py-1 bg-yellow-500 text-white rounded text-xs">Repaired</button>
                                    <button className="px-3 py-1 text-white rounded text-xs border border-red-500" title="Delete">❌</button>
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs">Edit</button>
                                </td>
                            </tr>
                        })) : <tr><td className="text-center" colSpan={7}>NO data</td></tr>
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Dashboard