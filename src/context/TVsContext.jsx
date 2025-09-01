import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase";
import toast from "react-hot-toast";

export const TVsStore = createContext();

const TVsContext = ({ children }) => {

    const [tvData, setTvData] = useState([]);
    const [updateId, setUpdateId] = useState(null)
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let tvSnapshot = await getDocs(collection(db, "TVs"))
        let tvArr = tvSnapshot.docs.map(tv => ({ ...tv.data(), id: tv.id }));
        setTvData(tvArr);
    }
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "TVs", id))
            fetchData()
            toast.success("T.V removed...!", { position: "top-left" });
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Try again!", { position: "top-right" });
        }
    }
    const handleUpdate = async (id, newData) => {
        try {
            await updateDoc(doc(db, "TVs", id), newData);
            fetchData();
            toast.success("T.V details updated...!", { position: "top-left" });
            setUpdateId(null)
        } catch (error) {
            console.error(error);
        }
    }

    const handleWorkDone = async (id) => {
        let data = tvData.filter(tv => tv.id)
        if (!data) return;
        try {
            await updateDoc(doc(db, "TVs", id), { isWorkDone: true });
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelivered = async (id, amount) => {
        if (amount <= 0 || amount === "") return toast.error("Enter valid amount...!");
        let data = tvData.filter(tv => tv.id)
        if (!data) return;
        try {
            await updateDoc(doc(db, "TVs", id), { isdelivered: true, deliveredAmount: amount });
            fetchData();
            toast.success("T.V details updated...!", { position: "top-left" });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <TVsStore.Provider value={{ tvData, fetchData, handleDelete, handleUpdate, updateId, setUpdateId, handleWorkDone, handleDelivered }}>
            {children}
        </TVsStore.Provider>
    )
}

export default TVsContext