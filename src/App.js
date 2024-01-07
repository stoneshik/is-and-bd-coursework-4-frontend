import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Страницы для неавторизованного пользователя */}
                <Route exact path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                {/* Страницы для авторизованного пользователя */}
            </Routes>
        </Router>
    )
}
