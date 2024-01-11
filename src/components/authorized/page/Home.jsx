import superagent from "superagent";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function Home() {
    const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [updateVar, setUpdate] = useState(0);
    useEffect(() => {
        superagent
            .get('/api/order/get_paid')
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
    const removeRow = (orderNum) => {
        const result = window.confirm("Вы уверены что хотите удалить заказ?");
        if (!result) {
            return;
        }
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            if (order['orderNum'] === orderNum) {
                orders.splice(i, 1);
                setUpdate(updateVar + 1);
                return;
            }
        }
    };
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
                <td className="num">
                    <Link to={"/order_print/" + orderNum} title="Подробнее о заказе">{orderNum}</Link>
                </td>
                <td>{orderTypeString}</td>
                <td>{orderDate}</td>
                <td>{orderAmount} руб.</td>
                <td className="address">{orderAddress}</td>
                <td>
                    <img src={"./img/cross.png"} alt="cross" style={{width: "24px"}}
                         onClick={() => removeRow(orderNum)}/>
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
                        <h3>Оплаченные заказы</h3>
                        <table>
                            <thead>
                            <tr>
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
