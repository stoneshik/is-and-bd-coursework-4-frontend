import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import superagent from "superagent";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { getRandomInteger } from "../../../utils";


export function NewOrderPrint() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [vendingPoints, setVendingPoints] = useState([]);
    const [selectedVendingPoint, setSelectedVendingPoint] = useState({});
    const [numberCopiesField, setNumberCopiesField] = useState('');
    const [files, setFiles] = useState([]);
    const [typeFunction, setTypeFunction] = useState('');
    const [amount, setAmount] = useState(0);
    const [updating, setUpdating] = useState(0);
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
                    setSelectedVendingPoint(responseVendingPoints[0]);
                    updateFunctionVariant(responseVendingPoints[0]);
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
    const updateFunctionVariant = (vendingPoint) => {
        const blackWhiteString = 'BLACK_WHITE_PRINT';
        const colorPrintString = 'COLOR_PRINT';
        let isHavingBlackWhite = false;
        let isHavingColor = false;
        const functionVariants = vendingPoint['functionVariants'];
        if (functionVariants === undefined) {
            return;
        }
        for (let i = 0; i < functionVariants.length; i++) {
            const functionVariant = functionVariants[i];
            const functionVariantString = functionVariant['functionVariant'];
            if (isHavingBlackWhite && isHavingColor) {
                break;
            }
            if (functionVariantString === blackWhiteString) {
                isHavingBlackWhite = true;
                continue;
            }
            if (functionVariantString === colorPrintString) {
                isHavingColor = true;
            }
        }
        if (isHavingBlackWhite && isHavingColor) {
            setTypeFunction('black_white_and_color');
        } else if (isHavingBlackWhite) {
            setTypeFunction('black_white');
        } else if (isHavingColor) {
            setTypeFunction('color');
        }
    };
    const createFieldSet = (selectedTypeFunction) => {
        if (selectedTypeFunction === 'black_white_and_color') {
            return (<fieldset id="type_all_files" className="custom-fieldset">
                <label>Тип печати для всех файлов:</label>
                <input type="radio" value="black_white" name="type" checked/>Черно-белая
                <input type="radio" value="color" name="type"/>Цветная
                <input type="radio" value="custom" name="type"/>Разное
            </fieldset>);
        } else if (selectedTypeFunction === 'black_white') {
            return (<fieldset id="type_all_files" className="custom-fieldset">
                <label>Тип печати для всех файлов:</label>
                <input type="radio" value="black_white" name="type" checked/>Черно-белая
            </fieldset>);
        } else if (selectedTypeFunction === 'color') {
            return (<fieldset id="type_all_files" className="custom-fieldset">
                <label>Тип печати для всех файлов:</label>
                <input type="radio" value="color" name="type" checked/>Цветная
            </fieldset>);
        }
    };
    const changeHandlingSelect = (event) => {
        const address = event.target.value;
        for (let i = 0; i < vendingPoints.length; i++) {
            const vendingPoint = vendingPoints[i];
            const addressVendingPoint = vendingPoint['vendingPointAddress'];
            if (addressVendingPoint === address) {
                setSelectedVendingPoint(vendingPoint);
                updateFunctionVariant(vendingPoint);
                return;
            }
        }
    };
    const changeHandlingInputText = (event, functionForSetValue) => {
        functionForSetValue(event.target.value);
        if (event.target.value) {
            event.target.classList.add('inputting_field');
        } else {
            event.target.classList.remove('inputting_field');
        }
    };
    const changeHandlingNumberCopiesField = (event) => {
        changeHandlingInputText(event, setNumberCopiesField);
    };
    const fileUploadHandling = (event) => {
        const newFiles = event.target.files;
        if (newFiles === undefined) {
            return;
        }
        files.push(...newFiles);
        setUpdating(updating + 1);
    };
    const removeFileElement = (event, file) => {
        for (let i = 0; i < files.length; i++) {
            const fileIter = files[i];
            if (file === fileIter) {
                files.splice(i, 1);
                setUpdating(updating + 1);
                return;
            }
        }
    };
    const createFileElement = (file) => {
        const fileNum = getRandomInteger(1, 10000000);
        return (
            <div className="form-row page-selection">
                <Link to="#">{file.name}</Link>
                <fieldset className="custom-fieldset">
                    <input type="radio" value="black_white" name={"type-" + fileNum} checked />Ч/б
                    <input type="radio" value="color" name={"type-" + fileNum} />Цветная
                </fieldset>
                <img src={"./img/cross.png"} alt="cross" style={{width: "24px"}}
                     onClick={(e) => removeFileElement(e, file)}/>
            </div>
        );
    };
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <div id="new_order_wrapper" className="container">
                    <form className="ui-form main-form" id="new_order_form">
                        <h3>Заказ на печать</h3>
                        <div className="form-row">
                            <label htmlFor="address">Выбор места:</label>
                            <select id="address" name="address" size="3" className="select"
                                    onChange={(e) => changeHandlingSelect(e)}>
                                {vendingPoints.map((vendingPoint, index) => createOptionAddress(vendingPoint, index))}
                            </select>
                        </div>
                        <div className="form-row">
                            <input type="file" multiple="multiple" onChange={(e) => fileUploadHandling(e)} required/>
                        </div>
                        {createFieldSet(typeFunction)}
                        <div id="files_list">
                            {files.map(file => createFileElement(file))}
                        </div>
                        <div className="form-row">
                            <input type="text" id="number_copies_field" required autoComplete="off"
                                   name="number_copies_field"
                                   onChange={(e) => changeHandlingNumberCopiesField(e)}/>
                            <label htmlFor="number_copies_field" className="text-input-label">Количество копий печати:</label>
                        </div>
                        <div className="form-row" id="pay_button">
                            <p>Сумма заказа: <strong id="amount">{amount} руб.</strong></p>
                            <input type="submit" value="Добавить в корзину"/>
                        </div>
                        <div className="error">{errorMessage}</div>
                        <div className="success-text">{successMessage}</div>
                    </form>
                    <YMaps>
                        <div>
                            <Map defaultState={{
                                center: [59.938678, 30.314474], zoom: 10,
                                controls: ["zoomControl", "fullscreenControl"],}} width={800} height={500}
                                 modules={["control.ZoomControl", "control.FullscreenControl"]}>
                                <div>
                                    {vendingPoints.map(vendingPoint => createPlacemark(vendingPoint))}
                                </div>
                            </Map>
                        </div>
                    </YMaps>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
