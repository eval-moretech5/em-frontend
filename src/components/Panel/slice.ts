import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    AtmBanks,
    AvailableServicesFilterType,
    FilterActionPayload, Filters, PanelType,
    PersonFilterType, PlaceCardType,
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
        } as PlaceCardType
    },
    reducers: {
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
        initPlaceCard: (state) => {
            const now: Date = new Date();

            const daysToRemove: number = now.getDay() == 0
                ? 6
                : now.getDay() - 1;

            const weekStart = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() - daysToRemove
            );

            const weekStartString = weekStart.getFullYear() + "-" + (weekStart.getMonth() + 1) + "-" + weekStart.getDate();

            return {
                ...state,
                placeCard: {
                    ...state.placeCard,
                    weekStart: weekStartString,
                    selectedDay: weekStartString
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