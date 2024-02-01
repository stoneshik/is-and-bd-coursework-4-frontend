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
    const [files, setFiles] = useState({});
    const [typeFunction, setTypeFunction] = useState('');
    const [typeAllFiles, setTypeAllFiles] = useState('');
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
    const setSameTypePrintForAllFiles = (typePrint) => {
        for (let numFile in files) {
            files[numFile].typePrint = typePrint;
        }
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
        let typePrint;
        if (isHavingBlackWhite && isHavingColor) {
            typePrint = 'black_white';
            setTypeFunction('black_white_and_color');
            setTypeAllFiles(typePrint);
        } else if (isHavingBlackWhite) {
            typePrint = 'black_white';
            setTypeFunction('black_white');
            setTypeAllFiles(typePrint);
        } else if (isHavingColor) {
            typePrint = 'color';
            setTypeFunction('color');
            setTypeAllFiles(typePrint);
        }
        setSameTypePrintForAllFiles(typePrint);
    };
    const handlingTypeAllFiles = (event) => {
        const typePrint = event.target.value;
        if (typePrint === undefined || (typePrint !== 'black_white' && typePrint !== 'color' && typePrint !== 'custom')) {
            return;
        }
        setTypeAllFiles(typePrint);
        if (typePrint === 'custom') {
            return;
        }
        setSameTypePrintForAllFiles(typePrint);
    };
    const createFieldSet = (selectedTypeFunction) => {
        switch (selectedTypeFunction) {
            case 'black_white_and_color' :
                return (
                    <fieldset id="type_all_files" className="custom-fieldset"
                                  onChange={(e) => handlingTypeAllFiles(e)}>
                        <label>Тип печати для всех файлов:</label>
                        <input type="radio" value="black_white" name="type_all_files" checked={typeAllFiles === 'black_white'}/>Черно-белая
                        <input type="radio" value="color" name="type_all_files" checked={typeAllFiles === 'color'}/>Цветная
                        <input type="radio" value="custom" name="type_all_files" checked={typeAllFiles === 'custom'}/>Разное
                    </fieldset>
                );
            case 'black_white':
                return (
                    <fieldset id="type_all_files" className="custom-fieldset" onChange={(e) => handlingTypeAllFiles(e)}>
                        <label>Тип печати для всех файлов:</label>
                        <input type="radio" value="black_white" name="type_all_files" checked={typeAllFiles === 'black_white'}/>Черно-белая
                    </fieldset>
                );
            case 'color':
                return (
                    <fieldset id="type_all_files" className="custom-fieldset" onChange={(e) => handlingTypeAllFiles(e)}>
                        <label>Тип печати для всех файлов:</label>
                        <input type="radio" value="color" name="type_all_files" checked={typeAllFiles === 'color'}/>Цветная
                    </fieldset>
                );
            default:
                return;
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
    const createNewFile = (newFile) => {
        let fileNum;
        do {
            fileNum = String(getRandomInteger(1, 10000000));
        } while (fileNum in files);
        files[fileNum] = {file: newFile, typePrint: ''};
        if (typeAllFiles === 'custom') {
            files[fileNum].typePrint = 'black_white';
        } else {
            files[fileNum].typePrint = typeAllFiles;
        }
    };
    const fileUploadHandling = (event) => {
        const newFiles = event.target.files;
        if (newFiles === undefined) {
            return;
        }
        for (let i = 0; i < newFiles.length; i++) {
            const newFile = newFiles[i];
            createNewFile(newFile);
        }
        setUpdating(updating + 1);
    };
    const removeFileElement = (fileNum) => {
        delete files[fileNum];
        setUpdating(updating + 1);
    };
    const updateTypeFileElement = (event, fileNum) => {
        const typeFile = event.target.value;
        if (typeFile === undefined || (typeFile !== 'black_white' && typeFile !== 'color')) {
            return;
        }
        setTypeAllFiles('custom');
        files[fileNum].typePrint = typeFile;
        setUpdating(updating + 1);
    };
    const createFileElement = (fileNum) => {
        switch (typeFunction) {
            case 'black_white_and_color':
                return (
                    <div className="form-row page-selection">
                        <Link to="#">{files[fileNum].file.name}</Link>
                        <fieldset className="custom-fieldset" onChange={(e) => updateTypeFileElement(e, fileNum)}>
                            <input type="radio" value="black_white" name={"type-" + fileNum}
                                   checked={files[fileNum].typePrint === 'black_white'}/>Ч/б
                            <input type="radio" value="color" name={"type-" + fileNum}
                                   checked={files[fileNum].typePrint === 'color'}/>Цветная
                        </fieldset>
                        <img src={"./img/cross.png"} alt="cross" style={{width: "24px"}}
                             onClick={() => removeFileElement(fileNum)}/>
                    </div>
                );
            case 'black_white':
                return (
                    <div className="form-row page-selection">
                        <Link to="#">{files[fileNum].file.name}</Link>
                        <fieldset className="custom-fieldset" onChange={(e) => updateTypeFileElement(e, fileNum)}>
                            <input type="radio" value="black_white" name={"type-" + fileNum}
                                   checked={files[fileNum].typePrint === 'black_white'}/>Ч/б
                        </fieldset>
                        <img src={"./img/cross.png"} alt="cross" style={{width: "24px"}}
                             onClick={() => removeFileElement(fileNum)}/>
                    </div>
                );
            case 'color':
                return (
                    <div className="form-row page-selection">
                        <Link to="#">{files[fileNum].file.name}</Link>
                        <fieldset className="custom-fieldset" onChange={(e) => updateTypeFileElement(e, fileNum)}>
                            <input type="radio" value="color" name={"type-" + fileNum}
                                   checked={files[fileNum].typePrint === 'color'}/>Цветная
                        </fieldset>
                        <img src={"./img/cross.png"} alt="cross" style={{width: "24px"}}
                             onClick={() => removeFileElement(fileNum)}/>
                    </div>
                );
            default:
                return;
        }
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
                            {Object.keys(files).map((fileNum) => createFileElement(fileNum))}
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
