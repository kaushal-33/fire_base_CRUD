import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import { Toaster } from "react-hot-toast"
import AddTV from "./pages/AddTV"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Toaster />
                <Routes>
                    <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                    <Route path="/add-tv" element={<AddTV />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App