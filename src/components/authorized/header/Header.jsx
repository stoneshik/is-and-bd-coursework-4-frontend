import { Link, NavLink } from "react-router-dom";


export default function Header() {
    return (
        <div id="header" className="container">
            <div className="container"><Link to="/main" className="none-underline"><h2>TypoFast</h2></Link></div>
            <div className="container">
                <ul className="menu row">
                    <li><NavLink to="#">помощь</NavLink></li>
                    <li><NavLink to="/map">мы на карте</NavLink></li>
                    <li><NavLink to="/files">файлы</NavLink></li>
                    <li><NavLink to="/cart">корзина</NavLink></li>
                    <li id="hamburger">
                        <div className="description">аккаунт</div>
                        <div className="hamburger-wrapper">
                            <ul>
                                <li><Link id="login" to="#"></Link></li>
                                <li><Link to="#">1337,00р</Link></li>
                                <li><Link to="#">пополнить счет</Link></li>
                                <li><Link to="/personal_account">личный кабинет</Link></li>
                                <li><Link to="/">выйти</Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}