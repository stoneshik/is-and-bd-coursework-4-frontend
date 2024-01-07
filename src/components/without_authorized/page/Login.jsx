import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const changeHandling = (event, functionForSetValue) => {
        functionForSetValue(event.target.value);
        if (event.target.value) {
            event.target.classList.add('inputting_field');
        } else {
            event.target.classList.remove('inputting_field');
        }
    };
    const validateForm = () => {
        if (!login) {setErrorMessage('Введите логин'); return false;}
        if (!password) {setErrorMessage('Введите пароль'); return false;}
        if (login.length > 15) {
            setErrorMessage('Длина логина не должна превышать 15 символов');
            return false;
        }
        if (login.length < 3) {
            setErrorMessage('Длина логина должна быть больше 2 символов');
            return false;
        }
        if (password.length < 6) {
            setErrorMessage('Длина пароля должна быть более 5 символов');
            return false;
        }
        const regex = new RegExp('[a-zA-Z0-9]+');
        if (!regex.test(login)) {
            setErrorMessage('Логин должен быть написан латинскими буквами, могут использоваться цифры');
            return false;
        }
        if (!regex.test(password)) {
            setErrorMessage('Пароль должен быть написан латинскими буквами,могут использоваться цифры');
            return false;
        }
        setErrorMessage('');
        return true;
    };
    const formHandling = (event) => {
        event.preventDefault();
        if (!validateForm()) {return false;}
        return navigate('/main');
    };
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <div>
                    <form className="ui-form main-form" id="login_form" onSubmit={formHandling}>
                        <div className="form-row">
                            <input type="text" id="login-field" required autoComplete="off"
                                   name="login"
                                   onChange={(e) => changeHandling(e, setLogin)}/>
                            <label htmlFor="login-field" className="text-input-label">Логин:</label>
                        </div>
                        <div className="form-row">
                            <input type="password" id="password-field" required autoComplete="off"
                                   name="password"
                                   onChange={(e) => changeHandling(e, setPassword)}/>
                            <label htmlFor="password-field" className="text-input-label">Пароль:</label>
                        </div>
                        <input type="submit" value="Войти"/>
                        <div className="error">{errorMessage}</div>
                    </form>
                    <form action={"/register"} className="ui-form second-form">
                        <input type="submit" value="Зарегистрироваться"/>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
