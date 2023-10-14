import {Dispatch} from "redux";
import {connect} from "react-redux";
import OverviewFilterPanel from "components/Panel/OverviewFilterPanel/OverviewFilterPanel";
import {getAtmBanksTitlesAction, getRoutesAction} from "components/Panel/saga";
import {panelSlice} from "components/Panel/slice";
import {mapSlice} from "components/Map/slice";
import {FilterType, PanelFilterValueType} from "components/Panel/types";
import {determinePositionAction, loadBranchesAction} from "components/Map/saga";
import {UserPointType} from "components/Map/types";

const mapStateToProps = (storeState: any) => {
    return {
        branches: storeState.map.branches,
        selectedBranch: storeState.map.selectedBranch,
        routes: storeState.map.routes,
        selectedRoute: storeState.map.selectedRoute,
        expanded: storeState.panel.expanded,
        atmBanks: storeState.panel.atmBanks,
        userPointType: storeState.map.userPointType,
        filters: storeState.panel.filters,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        requestRoutes: () => {
            dispatch(getRoutesAction());
        },
        expand: (items: Array<string>) => {
            dispatch(panelSlice.actions.expand(items));
        },
        branchMouseOver: (i: number) => {
            dispatch(mapSlice.actions.selectBranch(i));
        },
        branchClick: (i: number) => {
            dispatch(mapSlice.actions.selectBranch(i));
            dispatch(panelSlice.actions.openPlaceDetails());
            dispatch(mapSlice.actions.displayRoutes([]));
        },
        routeClick: (i: number) => {
            dispatch(mapSlice.actions.selectRoute(i));
        },
        setFilter: (type: FilterType, value: PanelFilterValueType) => {
            dispatch(panelSlice.actions.setFilter({type, value}));
            dispatch(loadBranchesAction());
        },
        setUserPointType: (userPointType: UserPointType) => {
            if (userPointType == "auto") {
                dispatch(determinePositionAction());
            }
            dispatch(mapSlice.actions.setUserPointType(userPointType));
        },
        fetchAtmBankTitles: () => {
            dispatch(getAtmBanksTitlesAction());
        }
    }
};

export const ConnectedOverviewFilterPanel = connect(mapStateToProps, mapDispatchToProps)(OverviewFilterPanel);