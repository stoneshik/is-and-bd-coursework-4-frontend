import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function MyMap() {
    return (
        <div>
            <Header/>
            <div id="wrapper" className="container">
                <YMaps>
                    <div>
                        <Map defaultState={{ center: [59.938678, 30.314474], zoom: 10,
                            controls: ["zoomControl", "fullscreenControl"],}} width={800} height={500}
                               modules={["control.ZoomControl", "control.FullscreenControl"]}>
                            <div>
                                <Placemark defaultGeometry={[59.938678, 30.314474]} />
                            </div>
                        </Map>
                    </div>
                </YMaps>
            </div>
            <Footer/>
        </div>
    );
}
