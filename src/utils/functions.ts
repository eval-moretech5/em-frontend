import {call} from "redux-saga/effects";
import {Place, Point} from "components/Map/types";
import {AvailableServicesFilterType, PanelType, TransportFilterType} from "components/Panel/types";

export function* extendedFetch(url: string, method = "GET", body: any = undefined, headers = {}): any {
    const requestSettings: RequestInit = {
        method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
    };
    const response: Response = yield call(fetch, process.env.service + url, requestSettings);
    if (!response.ok) {
        throw {
            name: "BadResponse",
            message: "Bad Response",
            response: response,
        };
    }
    return yield call([response, 'json']);
}


export const fromPoint = (store: any): Point => store.map.userPoint;
export const getTransportFilter = (store: any): TransportFilterType => store.panel.filters.transport;
export const getLowMobilityFilter = (store: any): boolean => store.panel.filters.lowMobility;
export const getPremiumServiceFilter = (store: any): boolean => store.panel.filters.premium;
export const getPersonTypeFilter = (store: any): boolean => store.panel.filters.personType;
export const getServiceTypeFilter = (store: any): AvailableServicesFilterType => store.panel.filters.services;

export const userPoint = (store: any): Point => store.map.userPoint;
export const mapCenter = (store: any): Point => store.map.mapCenter;

export const getPlaces = (store: any): Place => store.map.branches;
export const getDisplayType = (store: any): PanelType => store.panel.displayType;

export const getSelectedPlace = (store: any) => store.map.branches[store.map.selectedBranch];
export const getSelectedPlaceId = (store: any) => store.map.branches[store.map.selectedBranch].id;
export const getLineStatSelectedDay = (store: any) => store.panel.placeCard.selectedDay;