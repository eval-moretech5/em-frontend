import {Place, Point, Route} from "components/Map/types";
import {sagaActionTypes} from "store/sagaActionTypes";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {
    extendedFetch,
    fromPoint,
    getLowMobilityFilter,
    getPersonTypeFilter, getPlaces, getPremiumServiceFilter, getSelectedPlace, getServiceTypeFilter,
    getTransportFilter
} from "utils/functions";
import {mapSlice} from "components/Map/slice";
import {panelSlice} from "components/Panel/slice";
import {AvailableServicesFilterType, PersonFilterType, TransportFilterType} from "components/Panel/types";

export const getRoutesAction = () => {
    return {
        type: sagaActionTypes.GET_ROUTES,
    }
}

export function* workerGetRoutes(): any {
    yield findAndDisplayRoutes(false);
}

export function* watchGetRoutes() {
    yield takeEvery(sagaActionTypes.GET_ROUTES, workerGetRoutes);
}

export const getRoutesToPlaceAction = () => {
    return {
        type: sagaActionTypes.GET_ROUTES_TO_PLACE,
    }
}

export function* workerGetRoutesToPlace(): any {
    yield findAndDisplayRoutes(true);
}

export function* watchGetRoutesToPlace() {
    yield takeEvery(sagaActionTypes.GET_ROUTES_TO_PLACE, workerGetRoutesToPlace);
}

export const getAtmBanksTitlesAction = () => {
    return {
        type: sagaActionTypes.GET_ATM_BANK_TITLES,
    }
}

export function* workerGetAtmBanksTitles(): any {
    yield put(panelSlice.actions.setAtmBanks(yield call(extendedFetch, "/api/v1/atm-banks")));
}

export function* watchGetAtmBanksTitles() {
    yield takeEvery(sagaActionTypes.GET_ATM_BANK_TITLES, workerGetAtmBanksTitles);
}

function* findAndDisplayRoutes(toSelectedPlace: boolean) {
    try {
        const from: Point = yield select(fromPoint);
        const to: Place = toSelectedPlace ? yield select(getSelectedPlace) : undefined;
        const transport: TransportFilterType = yield select(getTransportFilter);
        const premium: boolean = yield select(getPremiumServiceFilter);
        const lowMobility: boolean = yield select(getLowMobilityFilter);
        const personType: PersonFilterType = yield select(getPersonTypeFilter);
        const services: AvailableServicesFilterType = yield select(getServiceTypeFilter);

        const routes: Array<Route> = yield call(extendedFetch,
            "/api/v1/routes",
            "POST",
            {
                from,
                to,
                premium,
                lowMobility,
                transport,
                personType,
                services,
            }
        );
        const places: Array<Place> = yield select(getPlaces);

        routes.forEach(r => {
            const found: Array<Place> = places.filter(p => p.id == r.placeId);
            if (found.length > 0) {
                r.place = found[0];
            }
        });

        yield put(mapSlice.actions.displayRoutes(routes));
        yield put(panelSlice.actions.expand(["routes"]));
    } catch (e) {
        console.log("Branches not found");
        console.log(e);
    }
}