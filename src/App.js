import { Route, Routes } from "react-router-dom";
/* Страницы для неавторизованного пользователя */
import { Home as HomeWithoutLogin } from "./components/without_authorized/page/Home";
import { Login } from "./components/without_authorized/page/Login";
import { Register } from "./components/without_authorized/page/Register";
import { Map as MapWithoutLogin } from "./components/without_authorized/page/Map";
/* Страницы для авторизованного пользователя */
import { Home } from "./components/authorized/page/Home";
import { Map } from "./components/authorized/page/Map";
import { NewOrderPrint } from "./components/authorized/page/NewOrderPrint";
import { NewOrderScan } from "./components/authorized/page/NewOrderScan";
import { OrderPrint } from "./components/authorized/page/OrderPrint";
import { OrderScan } from "./components/authorized/page/OrderScan";
import { Cart } from "./components/authorized/page/Cart";
import { Files } from "./components/authorized/page/Files";

export function App() {
    return (
        <Routes>
            {/* Страницы для неавторизованного пользователя */}
            <Route exact path="/" element={<HomeWithoutLogin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/map_without_login" element={<MapWithoutLogin/>}/>
            {/* Страницы для авторизованного пользователя */}
            <Route path="/main" element={<Home/>}/>
            <Route path="/map" element={<Map/>}/>
            <Route path="/new_order_print" element={<NewOrderPrint/>}/>
            <Route path="/new_order_scan" element={<NewOrderScan/>}/>
            <Route path="/order_print" element={<OrderPrint/>}/>
            <Route path="/order_scan" element={<OrderScan/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/files" element={<Files/>}/>
        </Routes>
    );
}
