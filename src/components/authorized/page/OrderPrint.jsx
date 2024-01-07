import { Link } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function OrderPrint() {
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
                                <th>Дата заказа</th>
                                <th>Осталось</th>
                                <th>Сумма заказа</th>
                                <th>Адрес</th>
                            </tr>
                            <tr>
                                <td className="num"><Link to="#" title="Подробнее о заказе">333444</Link></td>
                                <td>печать</td>
                                <td>13.12.2023</td>
                                <td>3 дня</td>
                                <td>28.00 руб.</td>
                                <td className="address">Невский пр-кт, д. 24</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="files" className="container column">
                        <h3>Приложенные файлы</h3>
                        <div className="container files">
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file1.pdf</Link>
                                <div><p>Страницы</p><p>1-2</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file4.pdf</Link>
                                <div><p>Страницы</p><p>1,7,9-12</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file2.pdf</Link>
                                <div><p>Полностью</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file4112.pdf</Link>
                                <div><p>Полностью</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
