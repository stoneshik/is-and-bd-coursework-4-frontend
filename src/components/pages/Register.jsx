import { Link } from "react-router-dom";

import MainHeader from "../headers/MainHeader";
import MainFooter from "../footers/MainFooter";


export default function Register() {
    const formHandling = (formData) => {

    }
    return (
        <div>
            <MainHeader/>
            <div id="wrapper" className="container">
                <div>
                    <form action={formHandling} className="ui-form main-form" id="register_form">
                        <div className="form-row">
                            <input type="email" id="email-field" required autoComplete="off"/>
                            <label htmlFor="email-field" className="text-input-label">Почта:</label>
                        </div>
                        <div className="form-row">
                            <input type="text" id="login-field" required autoComplete="off"/>
                            <label htmlFor="login-field" className="text-input-label">Логин:</label>
                        </div>
                        <div className="form-row">
                            <input type="password" id="password-field" required autoComplete="off"/>
                            <label htmlFor="password-field" className="text-input-label">Пароль:</label>
                        </div>
                        <div className="form-row">
                            <input type="submit" value="Зарегистрироваться"/>
                        </div>
                        <div className="form-row">
                            <input type="checkbox" id="agreement" required autoComplete="off"/>
                            <span>Я согласен(на) с <br/><Link to="#">условиями пользования</Link></span>
                        </div>
                    </form>
                    <form action={"login"} className="ui-form second-form">
                        <input type="submit" value="Войти"/>
                    </form>
                </div>
            </div>
            <MainFooter/>
        </div>
    );
}
