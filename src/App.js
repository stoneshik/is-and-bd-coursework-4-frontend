import { Route, Routes } from "react-router-dom";
import { Home } from "./components/without_authorized/page/Home";
import { Login } from "./components/without_authorized/page/Login";
import { Register } from "./components/without_authorized/page/Register";
import { Map as MapWithoutLogin } from "./components/without_authorized/page/Map";

export function App() {
    return (
        <Routes>
            {/* Страницы для неавторизованного пользователя */}
            <Route exact path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/map_without_login" element={<MapWithoutLogin/>}/>
            {/* Страницы для авторизованного пользователя */}
        </Routes>
    );
}
