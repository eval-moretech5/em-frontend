import {call, put, select, takeEvery} from "redux-saga/effects";
import {Place, Point} from "components/Map/types";
import {sagaActionTypes} from "store/sagaActionTypes";
import {mapSlice} from "components/Map/slice";
import {getUserLocation} from "components/Map/functions";
import {
    extendedFetch, getDisplayType,
    getLowMobilityFilter,
    getPersonTypeFilter, getPremiumServiceFilter, getServiceTypeFilter,
    getTransportFilter,
    mapCenter,
    userPoint
} from "utils/functions";
import {panelSlice} from "components/Panel/slice";
import {AvailableServicesFilterType, PanelType, PersonFilterType, TransportFilterType} from "components/Panel/types";

export const loadBranchesAction = () => {
    return {
        type: sagaActionTypes.LOAD_BRANCHES
    }
}

export function* workerLoadBranches(): any {
    try {

        const displayType: PanelType = yield select(getDisplayType);
        if (displayType == "placeDetails") {
            /* Делается это, потому что есть баг, при перемещении места пользователя, отделения перезапрашиваются,
             * отсортированные по близости к новой точке. Соответственно индексы пересчитываются. Выбранное может
             * измениться.
             * Текущее решение решает эту проблему, но оно мне кажется не идеальным.
             * TODO Возможно, лучше сделать, чтобы selectedBranch хранил не индекс отделения, а его id
             * И, соответственно, весь код переделать под это, если надо.
             * Но маркеры для карт лежат в массиве, где индекс равен индексу соответствующего отделения
             * */
            return;
        }

        let from: Point | null = yield select(userPoint);
        if (from == null) {
            from = (yield select(mapCenter)) as Point;
        }

        const transport: TransportFilterType = yield select(getTransportFilter);
        const premium: boolean = yield select(getPremiumServiceFilter);
        const lowMobility: boolean = yield select(getLowMobilityFilter);
        const personType: PersonFilterType = yield select(getPersonTypeFilter);
        const services: AvailableServicesFilterType = yield select(getServiceTypeFilter);

        const filter = {
            from,
            premium,
            lowMobility,
            transport,
            personType,
            services,
        };

        const branches: Array<Place> = yield call(extendedFetch, "/api/v1/places/", "POST", filter);
        yield put(mapSlice.actions.displayBranches(branches));
        yield put(panelSlice.actions.expand(["branches"]));
    } catch (e) {
        console.log(e)
    }
}

export function* watchLoadBranches() {
    yield takeEvery(sagaActionTypes.LOAD_BRANCHES, workerLoadBranches);
}

export const determinePositionAction = () => {
    return {
        type: sagaActionTypes.DETERMINE_POSITION,
    }
}

export function* workerDeterminePosition(): any {
    try {
        const position: GeolocationPosition = yield yield call(getUserLocation);
        yield put(mapSlice.actions.setPosition({lon: position.coords.longitude, lat: position.coords.latitude}));
    } catch (e) {
        console.log("Getting position failed", e);
    }
}

export function* watchDeterminePosition() {
    yield takeEvery(sagaActionTypes.DETERMINE_POSITION, workerDeterminePosition);
}