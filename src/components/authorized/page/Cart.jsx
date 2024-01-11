import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import {useEffect, useState} from "react";
import superagent from "superagent";
import {Link} from "react-router-dom";


export function Cart() {
    const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        superagent
            .get('/api/order/get_not_paid')
            .set('Content-Type', 'application/json')
            .then((result) => {
                    const responseOrders = result.body;
                    if (responseOrders === undefined) {
                        return false;
                    }
                    setErrorMessage('');
                    setOrders(responseOrders);
                    return true;
                }
            )
            .catch((err) => {
                    const responseMessage = err.response.body['responseMessage'];
                    if (responseMessage === undefined) {
                        return false;
                    }
                    setErrorMessage(responseMessage);
                    return false;
                }
            )
    }, []);
    const createRowTable = (order) => {
        const orderNum = order['orderNum'];
        const orderType = order['orderType'];
        const orderDate = order['orderDatetime'];
        const orderAmount = order['orderAmount'];
        const orderAddress = order['orderAddress'];
        if (orderNum === undefined ||
            orderType === undefined ||
            orderDate === undefined ||
            orderAmount === undefined ||
            orderAddress === undefined) {
            return;
        }
        const orderTypeString = (orderType === 'PRINT')? 'печать': 'сканирование';
        return (
            <tr>
                <td><input type="checkbox" autoComplete="off" onChange="updateAmount(this);"/></td>
                <td className="num">
                    <Link to={"/order_print/" + orderNum} title="Подробнее о заказе">{orderNum}</Link>
                </td>
                <td>{orderTypeString}</td>
                <td>{orderDate}</td>
                <td>{orderAmount} руб.</td>
                <td className="address">{orderAddress}</td>
                <td>
                    <img src={"./img/cross.png"} alt="cross" style={{width: "24px"}} onClick="remove(this);"/>
                </td>
            </tr>
        );
    };
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
                                <th>Сумма заказа</th>
                                <th>Адрес</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {errorMessage}
                            {orders.map(order => (createRowTable(order)))}
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
