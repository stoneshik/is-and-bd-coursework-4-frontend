import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function Map() {
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <div style={{position: 'relative', overflow: 'hidden'}} id="map">
                    {/* eslint-disable-next-line react/style-prop-object */}
                    <a href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps" style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '0px'}}>Санкт‑Петербург</a><a href="https://yandex.ru/maps/2/saint-petersburg/?ll=30.315635%2C59.938951&utm_medium=mapframe&utm_source=maps&z=11" style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '14px'}}>Карта Санкт-Петербурга с улицами и номерами домов — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/?ll=30.315635%2C59.938951&z=11" width="800" height="500" frameBorder="0" allowFullScreen="true" style={{position: 'relative'}} title="map"></iframe>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
