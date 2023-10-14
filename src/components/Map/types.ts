import {PanelType} from "components/Panel/types";

export interface Point {
    lat: number;
    lon: number;
}

export interface Place {
    id: number;
    type: "BRANCH" | "ATM";
    address: string;
    point: Point;

    name: string;
    services: Array<string>;
    twoGisId?: string;

    ownerBank: string;
    organization: string;

    lineTime: number;

    distance: number;

    serviceNaturalEntity: boolean;
    serviceLegalEntity: boolean;

    serviceLowMobility: boolean;

    servicePremium: boolean;

    schedule: {
        from: string;
        till: string;
    }

    textSchedule: {
        naturalEntity: string;
        legalEntity: string;
    }
}

export type MapType = "yandex2" | "yandex3" | "2gis" | "mapbox";

export type MapEvent = "loaded" | "positionSet" | "userPointDraggableChanged" | "fetchedBranches" | "fetchedRoutes" | "selectedBranch" | "selectedRoute" | "mapChanged" | null;

export interface CommonMapProps {
    loaded: boolean;
    branches: Array<Place>;
    selectedBranch: number;
    userPoint: Point | null;
    userPointType: UserPointType;
    mapCenter: Point;
    mapZoom: number;
    routes: Array<Route>;
    selectedRoute: number;
    displayType: PanelType;

    event: MapEvent;
    expand: (items: Array<string>) => void;
    loadBranches: () => void;
    determineUserPosition: () => void;
    setLoaded: () => void;
    branchMouseOver: (i: number) => void;
    branchClick: (i: number) => void;
    routeClick: (i: number) => void;
    saveCenter: (point: Point) => void;
    saveZoom: (zoom: number) => void;
    setManualPosition: (point: Point) => void;
}

export interface Route {
    id: string;
    textDistance: string;
    distance: number;
    textDuration: string;
    duration: number;
    textFullDuration: string;
    fullDuration: number;
    lineDuration: number;
    maneuvers: Array<Maneuver>;
    placeId: number;
    place: Place;
}

export interface Maneuver {
    type: string;
    comment: string;
    pathComment: string;
    distance: number;
    duration: number;
    chunks: Array<Geometry>;
}

export type UserPointType = "auto" | "manual";

export interface Geometry {
    color: "no-traffic" | "fast" | "normal" | "slow" | "slow-jams" | "ignore" | string;
    points: Array<Point>;
}