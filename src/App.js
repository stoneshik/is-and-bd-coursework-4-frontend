import { Route, Routes } from "react-router-dom";
import Home from "./components/without_authorized/page/Home";
import Login from "./components/without_authorized/page/Login";
import Register from "./components/without_authorized/page/Register";

export default function App() {
    return (
        <Routes>
            {/* Страницы для неавторизованного пользователя */}
            <Route exact path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            {/* Страницы для авторизованного пользователя */}
        </Routes>
    );
}
