import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    AtmBanks,
    AvailableServicesFilterType,
    FilterActionPayload, Filters, PanelType,
    PersonFilterType, PlaceCardType, StatResponse,
    TransportFilterType
} from "components/Panel/types";

export const panelSlice = createSlice({
    name: "panel",
    initialState: {
        expanded: [],
        filters: {
            transport: "CAR" as TransportFilterType,
            premium: false,
            lowMobility: false,
            personType: "PHYSICAL" as PersonFilterType,
            services: [] as AvailableServicesFilterType,
        } as Filters,
        atmBanks: {} as AtmBanks,
        displayType: "overviewFilter" as PanelType,
        placeCard: {
            personTypeTab: "PHYSICAL" as PersonFilterType,
            weekStart: "",
            selectedDay: "",
            lineStats: {} as StatResponse
        } as PlaceCardType
    },
    reducers: {
        setPlaceCardPersonTypeTab: (state, action: PayloadAction<PersonFilterType>) => {
            return {
                ...state,
                placeCard: {
                    ...state.placeCard,
                    personTypeTab: action.payload
                }
            }
        },
        setLineStats: (state, action: PayloadAction<StatResponse>) => {
            return {
                ...state,
                placeCard: {
                    ...state.placeCard,
                    lineStats: action.payload
                }
            }
        },
        changeWeekStart: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                placeCard: {
                    ...state.placeCard,
                    weekStart: action.payload
                }
            }
        },
        changeSelectedDay: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                placeCard: {
                    ...state.placeCard,
                    selectedDay: action.payload
                }
            }
        },
        openOverviewFilter: (state) => {
            return {
                ...state,
                displayType: "overviewFilter"
            };
        },
        openPlaceDetails: (state) => {
            return {
                ...state,
                displayType: "placeDetails"
            };
        },
        expand: (state, action) => {
            return {
                ...state,
                expanded: action.payload
            }
        },
        setFilter: (state, action: PayloadAction<FilterActionPayload>) => {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.type]: action.payload.value
                }
            }
        },
        setAtmBanks: (state, action: PayloadAction<AtmBanks>) => {
            return {
                ...state,
                atmBanks: action.payload
            }
        }
    }
});