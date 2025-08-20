import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./component/ProtectedRoute"
import Dashboard from "./pages/Dashboard"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App