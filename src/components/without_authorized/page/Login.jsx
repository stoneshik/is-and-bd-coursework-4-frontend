import { Link } from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";


export default function Login() {
    const formHandling = (formData) => {

    }
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <div>
                    <form action={formHandling} className="ui-form main-form" id="login_form">
                        <div className="form-row">
                            <input type="text" id="login-field" required autoComplete="off"/>
                            <label htmlFor="login-field" className="text-input-label">Логин:</label>
                        </div>
                        <div className="form-row">
                            <input type="password" id="password-field" required autoComplete="off"/>
                            <label htmlFor="password-field" className="text-input-label">Пароль:</label>
                        </div>
                        <input type="submit" value="Войти"/>
                        <Link to="forgot_password_email" id="forgot-password">Забыли пароль?</Link>
                    </form>
                    <form action={"register"} className="ui-form second-form">
                        <input type="submit" value="Зарегистрироваться"/>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
