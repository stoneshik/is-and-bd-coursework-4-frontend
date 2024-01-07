import { NavLink } from "react-router-dom";

import { MainHeader } from "../headers/MainHeader";
import { MainFooter } from "../footers/MainFooter";


const Home = () => {
    return (
        <div>
            <MainHeader/>
            <div id="wrapper_index_page">
                <div id="index_page_header">
                    <div className="form-row">
                        <h1>Вендинг печати и сканирования</h1>
                        <div id="button_wrapper" className="container">
                            <NavLink to="register">
                                <div id="button_first" className="button">Начать пользоваться</div>
                            </NavLink>
                            <NavLink to="login">
                                <div id="button_second" className="button">Уже есть аккаунт</div>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div id="index_page_content">
                    <div className="container column">
                        <h2>Наши преимущества</h2>
                        <div className="container">
                            <div className="advantage">
                                <img src={"./img/speed.png"} alt="speed"/>
                                <h3>Скорость</h3>
                            </div>
                            <div className="advantage">
                                <img src={"./img/click.png"} alt="click"/>
                                <h3>Оформление заказа<br/>в пару кликов</h3>
                            </div>
                            <div className="advantage">
                                <img src={"./img/discount.png"} alt="discount"/>
                                <h3>Низкая цена</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter/>
        </div>
    );
}

export default Home;