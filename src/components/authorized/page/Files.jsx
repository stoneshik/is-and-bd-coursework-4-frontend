import { Link } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function Files() {
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <div id="content">
                    <div className="container column">
                        <h3>Файлы полученные сканированием</h3>
                        <div className="container files">
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file1.pdf</Link>
                                <div><p>Осталось 4 дня</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file4.pdf</Link>
                                <div><p>Осталось 6 дней</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="container column">
                        <h3>Загруженные файлы</h3>
                        <div className="container files">
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file1.pdf</Link>
                                <div><p>Осталось 2 дня</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file4.pdf</Link>
                                <div><p>Осталось 2 дня</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file2.pdf</Link>
                                <div><p>Осталось 3 дня</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file4112.pdf</Link>
                                <div><p>Осталось 3 дня</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file2.pdf</Link>
                                <div><p>Осталось 3 дня</p></div>
                            </div>
                            <div className="file">
                                <img src={"./img/file.png"} alt="printer"/>
                                <Link to="#">file4112.pdf</Link>
                                <div><p>Осталось 4 дня</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
