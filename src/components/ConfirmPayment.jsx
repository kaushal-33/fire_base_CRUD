import { useContext, useState } from "react";
import TVsContext, { TVsStore } from "../context/TVsContext";

const ConfirmPayment = ({ setConfirmDelivery, confirmDelivery, setIsPopoverOpen }) => {

    const [confirmAmount, setConfirmAmount] = useState("")
    const { handleDelivered } = useContext(TVsStore)
    return (
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
                        onClick={async () => {
                            await handleDelivered(confirmDelivery.id, confirmAmount);
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
    )
}

export default ConfirmPayment