import superagent from "superagent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function Cart() {
    const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [checkedOrders] = useState({});
    const [amount, setAmount] = useState(0.0);
    const [updateVar, setUpdate] = useState(0);
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
            );
    }, []);
    const updateChecked = (orderNum, orderAmount) => {
        checkedOrders[orderNum] = !checkedOrders[orderNum];
        if (checkedOrders[orderNum]) {
            setAmount(amount + orderAmount);
            return;
        }
        setAmount(amount - orderAmount);
    };
    const removeRow = (orderNum, orderAmount) => {
        const result = window.confirm("Вы уверены что хотите удалить заказ?");
        if (!result) {
            return;
        }
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            if (order['orderNum'] === orderNum) {
                if (checkedOrders[orderNum]) {
                    setAmount(amount - orderAmount);
                }
                orders.splice(i, 1);
                delete checkedOrders[orderNum];
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
        if (checkedOrders[orderNum] === undefined) {
            checkedOrders[orderNum] = false;
        }
        return (
            <tr>
                <td><input type="checkbox" autoComplete="off"
                           onChange={() => {updateChecked(orderNum, orderAmount)}}/></td>
                <td className="num">
                    <Link to={"/order_print/" + orderNum} title="Подробнее о заказе">{orderNum}</Link>
                </td>
                <td>{orderTypeString}</td>
                <td>{orderDate}</td>
                <td>{orderAmount} руб.</td>
                <td className="address">{orderAddress}</td>
                <td>
                    <img src={"./img/cross.png"} alt="cross" style={{width: "24px"}}
                         onClick={() => removeRow(orderNum, orderAmount)}/>
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
                        <h3>Итого: <span id="amount">{amount}</span> руб.</h3>
                        <div className="button" onClick="handlingPay();">Оплатить</div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
