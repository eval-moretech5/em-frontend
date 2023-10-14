import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Place, MapEvent, MapType, Point, Route, UserPointType} from "components/Map/types";

export const mapSlice = createSlice({
    name: "map",
    initialState: {
        loaded: false,
        type: "yandex3" as MapType,
        branches: [] as Array<Place>,
        selectedBranch: -1,
        userPoint: null as Point | null,
        userPointType: "auto" as UserPointType,
        canMoveUserPoint: false,
        mapCenter: { lon: 37.588144, lat: 55.733842 } as Point,
        mapZoom: 15 as number,
        routes: [] as Array<Route>,
        selectedRoute: -1,
        event: null as MapEvent
    },
    reducers: {
        setMapSource: (state, action: PayloadAction<MapType>) => {
            return {
                ...state,
                type: action.payload,
                event: "mapChanged"
            };
        },
        setCenter: (state, action: PayloadAction<Point>) => {
            return {
                ...state,
                mapCenter: action.payload
            }
        },
        setZoom: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                mapZoom: action.payload
            }
        },
        displayBranches: (state, action: PayloadAction<Array<Place>>) => {
            return {
                ...state,
                selectedBranch: -1,
                branches: action.payload,
                event: "fetchedBranches",
            }
        },
        selectBranch: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                selectedBranch: action.payload,
                event: "selectedBranch"
            };
        },
        setPosition: (state, action: PayloadAction<Point>) => {
            return {
                ...state,
                userPoint: action.payload,
                mapCenter: action.payload,
                event: "positionSet"
            }
        },
        setManualPosition: (state, action: PayloadAction<Point>) => {
            return {
                ...state,
                userPoint: action.payload,
            }
        },
        setUserPointType: (state, action: PayloadAction<UserPointType>) => {
            return {
                ...state,
                userPointType: action.payload,
                event: "userPointDraggableChanged"
            }
        },
        setLoaded: (state) => {
            return {
                ...state,
                loaded: true,
                event: "loaded"
            }
        },
        displayRoutes: (state, action: PayloadAction<Array<Route>>) => {
            return {
                ...state,
                selectedRoute: action.payload.length > 0 ? 0 : -1,
                routes: action.payload,
                event: "fetchedRoutes",
            }
        },
        selectRoute: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                selectedRoute: action.payload,
                event: "selectedRoute"
            };
        },
    }
})