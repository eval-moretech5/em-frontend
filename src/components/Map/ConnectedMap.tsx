import {connect} from "react-redux";
import MapContainer from "components/Map/MapContainer";
import {Dispatch} from "redux";
import {determinePositionAction, loadBranchesAction} from "components/Map/saga";
import {Point} from "components/Map/types";
import {mapSlice} from "components/Map/slice";
import {panelSlice} from "components/Panel/slice";

const mapStateToProps = (storeState: any) => {
    return {
        loaded: storeState.map.loaded,
        type: storeState.map.type,
        branches: storeState.map.branches,
        selectedBranch: storeState.map.selectedBranch,
        userPoint: storeState.map.userPoint,
        userPointType: storeState.map.userPointType,
        mapCenter: storeState.map.mapCenter,
        mapZoom: storeState.map.mapZoom,
        routes: storeState.map.routes,
        selectedRoute: storeState.map.selectedRoute,
        event: storeState.map.event,
        displayType: storeState.panel.displayType
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadBranches: () => {
            dispatch(loadBranchesAction());
        },
        determineUserPosition: () => {
            dispatch(determinePositionAction());
        },
        setLoaded: () => {
            dispatch(mapSlice.actions.setLoaded());
        },
        branchMouseOver: (i: number) => {
            dispatch(mapSlice.actions.selectBranch(i));
        },
        branchClick: (i: number) => {
            dispatch(mapSlice.actions.displayRoutes([]));
            dispatch(mapSlice.actions.selectBranch(i));
            dispatch(panelSlice.actions.openPlaceDetails());
        },
        routeClick: (i: number) => {
            dispatch(mapSlice.actions.selectRoute(i))
        },
        expand: (items: Array<string>) => {
            dispatch(panelSlice.actions.expand(items));
        },
        saveCenter: (point: Point) => {
            dispatch(mapSlice.actions.setCenter(point));
        },
        saveZoom: (zoom: number) => {
            dispatch(mapSlice.actions.setZoom(zoom));
        },
        setManualPosition: (point: Point) => {
            dispatch(mapSlice.actions.setManualPosition(point));
            dispatch(loadBranchesAction());
        }
    }
};

export const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(MapContainer);