import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function Cart() {
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <div id="content">
                    <div id="orders">
                        <h3>Неоплаченные заказы</h3>
                        <table>
                            <thead>
                            <tr>
                                <th></th>
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
                    <div id="total" className="container">
                        <h3>Итого: <span id="amount">0</span> руб.</h3>
                        <div className="button" onClick="handlingPay();">Оплатить</div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
