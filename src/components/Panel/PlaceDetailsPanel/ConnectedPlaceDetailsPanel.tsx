import {connect} from "react-redux";
import PlaceDetailsPanel from "components/Panel/PlaceDetailsPanel/PlaceDetailsPanel";
import {Dispatch} from "redux";
import {getRoutesToPlaceAction} from "components/Panel/saga";
import {panelSlice} from "components/Panel/slice";
import {UserPointType} from "components/Map/types";
import {determinePositionAction, loadBranchesAction} from "components/Map/saga";
import {mapSlice} from "components/Map/slice";
import {FilterType, PanelFilterValueType, PersonFilterType} from "components/Panel/types";
import {getDayLineStatAction, setPlaceCardPersonTypeTabAction} from "components/Panel/LineStatistic/saga";

const mapStateToProps = (storeState: any) => {
    return {
        place: storeState.map.branches[storeState.map.selectedBranch],
        atmBanks: storeState.panel.atmBanks,
        userPointType: storeState.map.userPointType,
        filters: storeState.panel.filters,
        expanded: storeState.panel.expanded,
        routes: storeState.map.routes,
        selectedRoute: storeState.map.selectedRoute,
        placeCard: storeState.panel.placeCard,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        buildRoute: () => {
            dispatch(getRoutesToPlaceAction());
        },
        closeDetails: () => {
            dispatch(panelSlice.actions.openOverviewFilter());
            dispatch(mapSlice.actions.displayRoutes([]));
            dispatch(loadBranchesAction());
        },
        setUserPointType: (userPointType: UserPointType) => {
            if (userPointType == "auto") {
                dispatch(determinePositionAction());
            }
            dispatch(mapSlice.actions.setUserPointType(userPointType));
        },
        setFilter: (type: FilterType, value: PanelFilterValueType) => {
            dispatch(panelSlice.actions.setFilter({type, value}));
            dispatch(loadBranchesAction());
        },
        expand: (items: Array<string>) => {
            dispatch(panelSlice.actions.expand(items));
        },
        routeClick: (i: number) => {
            dispatch(mapSlice.actions.selectRoute(i));
        },
        changeWeekStart: (weekStart: string) => {
            dispatch(panelSlice.actions.changeWeekStart(weekStart));
        },
        changeSelectedDay: (selectedDay: string) => {
            dispatch(getDayLineStatAction(selectedDay));
        },
        setPlaceCardPersonTypeTab: (personType: PersonFilterType) => {
            dispatch(setPlaceCardPersonTypeTabAction(personType));
        },
    }
}

export const ConnectedPlaceDetailsPanel = connect(mapStateToProps, mapDispatchToProps)(PlaceDetailsPanel);