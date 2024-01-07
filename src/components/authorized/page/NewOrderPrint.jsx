import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function NewOrderPrint() {
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
                                <option selected>Невский пр-кт, д. 1</option>
                                <option>ул. Чайковского, д. 2</option>
                                <option>ул. Шаврова, д. 3</option>
                                <option>Невский пр-кт, д. 4</option>
                                <option>ул. Чайковского, д. 5</option>
                                <option>ул. Шаврова, д. 6</option>
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
                            <input type="text" id="num-field" required autoComplete="off" onInput="inputField(this);"/>
                            <label htmlFor="num-field" className="text-input-label">Количество копий печати:</label>
                        </div>
                        <div className="form-row" id="pay_button">
                            <p>Оплатить <strong id="amount">0 руб.</strong></p>
                            <input type="submit" value="Сейчас" id="pay_button_first" onClick="nowSubmit();"/>
                            <input type="submit" value="Позже" id="pay_button_second" onClick="laterSubmit();"/>
                        </div>
                    </form>
                    <div style={{position: 'relative', overflow: 'hidden'}} id="map">
                        {/* eslint-disable-next-line react/style-prop-object */}
                        <a href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps"
                           style={{
                               color: '#eee',
                               fontSize: '12px',
                               position: 'absolute',
                               top: '0px'
                           }}>Санкт‑Петербург</a><a
                        href="https://yandex.ru/maps/2/saint-petersburg/?ll=30.315635%2C59.938951&utm_medium=mapframe&utm_source=maps&z=11"
                        style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '14px'}}>Карта
                        Санкт-Петербурга с улицами и номерами домов — Яндекс Карты</a>
                        <iframe src="https://yandex.ru/map-widget/v1/?ll=30.315635%2C59.938951&z=11" width="800"
                                height="500" frameBorder="0" allowFullScreen="true"
                                style={{position: 'relative'}}></iframe>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
