import { Link } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function OrderScan() {
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <div id="content">
                    <div id="orders">
                        <h3>Общая информация о заказе</h3>
                        <table>
                            <tbody>
                            <tr>
                                <th>Номер заказа</th>
                                <th>Тип заказа</th>
                                <th>Статус</th>
                                <th>Дата заказа</th>
                                <th>Осталось</th>
                                <th>Сумма заказа</th>
                                <th>Адрес</th>
                            </tr>
                            <tr>
                                <td className="num"><Link to="order_scan" title="Подробнее о заказе">111321</Link></td>
                                <td>сканирование</td>
                                <td>оплачен</td>
                                <td>14.12.2023</td>
                                <td>4 дня</td>
                                <td>5.00 руб.</td>
                                <td className="address">Невский пр-кт, д. 24</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="container column">
                        <h3>Было заказано 10 страниц</h3>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
