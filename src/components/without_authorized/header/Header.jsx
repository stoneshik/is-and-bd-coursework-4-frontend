import {Link, NavLink} from "react-router-dom";


export default function Header() {
    return (
        <div id="header" className="container">
            <div className="container"><Link to="/" className="none-underline"><h2>TypoFast</h2></Link></div>
            <div className="container">
                <ul className="menu row">
                    <li><NavLink to="/about">о нас</NavLink></li>
                    <li><NavLink to="/help">помощь</NavLink></li>
                    <li><NavLink to="/map_without_login">мы на карте</NavLink></li>
                    <li><NavLink to="/login">вход</NavLink></li>
                </ul>
            </div>
        </div>
    );
}
