import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase";

export const TVsStore = createContext();

const TVsContext = ({ children }) => {

    const [tvData, setTvData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let tvSnapshot = await getDocs(collection(db, "TVs"))
        let tvArr = tvSnapshot.docs.map(tv => ({ ...tv.data(), id: tv.id }));
        setTvData(tvArr);
    }

    return (
        <TVsStore.Provider value={{ tvData }}>
            {children}
        </TVsStore.Provider>
    )
}

export default TVsContext