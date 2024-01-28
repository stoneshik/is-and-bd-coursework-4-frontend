import { useEffect, useState } from "react";
import superagent from "superagent";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function NewOrderPrint() {
    const [errorMessage, setErrorMessage] = useState('');
    const [vendingPoints, setVendingPoints] = useState([]);
    useEffect(() => {
        superagent
            .get('/api/vending_point/get_print')
            .set('Content-Type', 'application/json')
            .then((result) => {
                    const responseVendingPoints = result.body;
                    if (responseVendingPoints === undefined) {
                        return false;
                    }
                    setErrorMessage('');
                    setVendingPoints(responseVendingPoints);
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
    const createPlacemark = (vendingPoint) => {
        const vendingPointCords = vendingPoint['vendingPointCords'];
        const vendingPointAddress = vendingPoint['vendingPointAddress'];
        if (vendingPointCords === undefined || vendingPointAddress === undefined) {
            return;
        }
        return <Placemark modules={["geoObject.addon.balloon"]} defaultGeometry={vendingPointCords}
                          properties={{balloonContent: "Адрес: " + vendingPointAddress,}}/>;
    };
    const createOptionAddress = (vendingPoint, index) => {
        const vendingPointAddress = vendingPoint['vendingPointAddress'];
        if (vendingPointAddress === undefined) {
            return;
        }
        if (index === 0) {
            return <option selected>{vendingPointAddress}</option>;
        }
        return <option>{vendingPointAddress}</option>;
    };
    return (
        <div>
        <Header/>
            <div id="wrapper" className="container">
                <div id="new_order_wrapper" className="container">
                    <form action={"main"} className="ui-form main-form" id="new_order_form">
                        <h3>Заказ на печать</h3>
                        <div className="form-row">
                            <label htmlFor="address">Выбор места:</label>
                            <select id="address" name="address" size="3" className="select">
                                {vendingPoints.map((vendingPoint, index) => createOptionAddress(vendingPoint, index))}
                            </select>
                        </div>
                        <div className="form-row">
                            <input type="file" multiple="multiple" onChange="fileUpload(this);" required/>
                        </div>
                        <fieldset id="type_all_files" className="custom-fieldset" onChange="typeAllFiles(this);">
                            <label>Тип печати для всех файлов:</label>
                            <input type="radio" value="black_white" name="type" checked/>Черно-белая
                            <input type="radio" value="color" name="type"/>Цветная
                            <input type="radio" value="custom" name="type"/>Разное
                        </fieldset>
                        <div id="files_list">
                        </div>
                        <div className="form-row">
                            <input type="text" id="num-field" required autoComplete="off"/>
                            <label htmlFor="num-field" className="text-input-label">Количество копий печати:</label>
                        </div>
                        <div className="form-row" id="pay_button">
                            <p>Сумма заказа: <strong id="amount">0 руб.</strong></p>
                            <input type="submit" value="Добавить в корзину"/>
                        </div>
                    </form>
                    <YMaps>
                        <div>
                            <Map defaultState={{ center: [59.938678, 30.314474], zoom: 10,
                                controls: ["zoomControl", "fullscreenControl"],}} width={800} height={500}
                                 modules={["control.ZoomControl", "control.FullscreenControl"]}>
                                <div>
                                    {vendingPoints.map(vendingPoint => (createPlacemark(vendingPoint)))}
                                </div>
                            </Map>
                            <div className="error">{errorMessage}</div>
                        </div>
                    </YMaps>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
