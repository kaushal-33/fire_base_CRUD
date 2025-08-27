import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TVsContext from './context/TVsContext.jsx'
import AuthContext from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthContext>
        <TVsContext>
            <App />
        </TVsContext>
    </AuthContext>
)
