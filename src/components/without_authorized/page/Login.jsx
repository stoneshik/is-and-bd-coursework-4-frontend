import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const formHandling = (event) => {
        event.preventDefault();
        if (!login) {
            setErrorMessage('Введите логин');
            return false;
        }
        if (!password) {
            setErrorMessage('Введите пароль');
            return false;
        }
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
        setErrorMessage('');
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
                                   value={login}
                                   onChange={(e) => setLogin(e.target.value)}/>
                            <label htmlFor="login-field" className="text-input-label">Логин:</label>
                        </div>
                        <div className="form-row">
                            <input type="password" id="password-field" required autoComplete="off"
                                   name="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <label htmlFor="password-field" className="text-input-label">Пароль:</label>
                        </div>
                        <input type="submit" value="Войти"/>
                        <Link to="forgot_password_email" id="forgot-password">Забыли пароль?</Link>
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
