import {Component} from "react";
import TwoGisMap from "components/Map/2GisMap/TwoGisMap";
import YandexMapV3 from "components/Map/YandexMapV3/YandexMapV3";
import {CommonMapProps, MapType} from "components/Map/types";

export interface MapProps extends CommonMapProps {
    type: MapType;
}

class MapContainer extends Component<MapProps, {}> {

    render() {

        switch (this.props.type) {
            case "yandex3" : return <YandexMapV3 {...this.props} />;
            case "2gis": return <TwoGisMap {...this.props} />;
            default: throw new Error("wrong type of map!");
        }
    }

    componentDidMount() {
        this.props.determineUserPosition();
    }
}

export default MapContainer;