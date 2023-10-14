import {connect} from "react-redux";
import {Dispatch} from "redux";
import {MapType} from "components/Map/types";
import {mapSlice} from "components/Map/slice";
import MapSwitcher from "components/MapSwitcher/MapSwitcher";

const mapStateToProps = (storeState: any) => {
    return {
        mapType: storeState.map.type,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setMapSource: (source: MapType) => {
            dispatch(mapSlice.actions.setMapSource(source));
        },
    }
}

export const ConnectedMapSwitcher = connect(mapStateToProps, mapDispatchToProps)(MapSwitcher);