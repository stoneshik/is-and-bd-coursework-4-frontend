import { NavLink } from "react-router-dom";

import MainHeader from "../headers/MainHeader";
import MainFooter from "../footers/MainFooter";


export default function Login() {
    return (
        <div>
            <MainHeader/>
            <div id="wrapper" className="container">
                <div>
                    <form action={"formAction"} className="ui-form main-form" id="login_form" onSubmit="handlingSubmit();">
                        <div className="form-row">
                            <input type="text" id="login-field" required autoComplete="off"
                                   onInput="inputField(this);"/>
                            <label htmlFor="login-field" className="text-input-label">Логин:</label>
                        </div>
                        <div className="form-row">
                            <input type="password" id="password-field" required autoComplete="off"
                                   onInput="inputField(this);"/>
                            <label htmlFor="password-field" className="text-input-label">Пароль:</label>
                        </div>
                        <input type="submit" value="Войти"/>
                        <a href="forgot_password_email.html" id="forgot-password">Забыли пароль?</a>
                        <ul className="menu">
                            <li><a><img src="includes/img/VK_Compact_Logo_(2021-present).svg.webp" alt="vk"/></a></li>
                            <li><a><img src="includes/img/32_@mail_sign_only_square_b.svg" alt="email"/></a></li>
                            <li><a><img src="includes/img/Yandex_icon.svg.png" alt="yandex"/></a></li>
                        </ul>
                    </form>
                    <form action="register.html" className="ui-form second-form">
                        <input type="submit" value="Зарегистрироваться"/>
                    </form>
                </div>
            </div>
            <MainFooter/>
        </div>
    );
}
