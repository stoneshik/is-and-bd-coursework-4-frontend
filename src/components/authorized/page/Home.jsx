import { NavLink } from "react-router-dom";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function Home() {
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <div id="content">
                    <div id="orders">
                        <h3>Оплаченные заказы</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Номер заказа</th>
                                <th>Тип заказа</th>
                                <th>Дата заказа</th>
                                <th>Осталось</th>
                                <th>Сумма заказа</th>
                                <th>Адрес</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h2>Новый заказ</h2>
                        <div className="container double-column">
                            <NavLink className="new-order-wrapper" to="/new_order_print">
                                <div className="new-order">
                                    <img src={"./img/printer.png"} alt="printer"/>
                                    <h3>Заказ на печать</h3>
                                </div>
                            </NavLink>
                            <NavLink className="new-order-wrapper" to="/new_order_scan">
                                <div className="new-order">
                                    <img src={"./img/scanner.png"} alt="scanner"/>
                                    <h3>Заказ на сканирование</h3>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
