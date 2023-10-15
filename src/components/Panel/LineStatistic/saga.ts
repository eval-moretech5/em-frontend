import {sagaActionTypes} from "store/sagaActionTypes";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {extendedFetch, getLineStatSelectedDay, getPlaceCardPersonTypeTab, getSelectedPlaceId} from "utils/functions";
import {PersonFilterType, StatResponse} from "components/Panel/types";
import {panelSlice} from "components/Panel/slice";
import {PayloadAction} from "@reduxjs/toolkit";
import {mapSlice} from "components/Map/slice";
import dateFormat from "dateformat";

export const getDayLineStatAction = (selectedDay: string) => {
    return {
        type: sagaActionTypes.GET_DAY_LINE_STAT,
        payload: selectedDay
    }
}

export function* workerGetDayLineStat(action: PayloadAction<string>) {

    const tab: string = yield select(getPlaceCardPersonTypeTab);
    const placeId: string = yield select(getSelectedPlaceId);
    const selectedDay: string = action.payload;

    const response: StatResponse = yield call(extendedFetch, `/api/v1/line/${placeId}/${tab}/stat/${selectedDay}`);

    yield put(panelSlice.actions.changeSelectedDay(selectedDay));
    yield put(panelSlice.actions.setLineStats(response));
}

export function* watchGetDayLineStat() {
    yield takeEvery(sagaActionTypes.GET_DAY_LINE_STAT, workerGetDayLineStat);
}



export const setPlaceCardPersonTypeTabAction = (personType: PersonFilterType) => {
    return {
        type: sagaActionTypes.SET_PLACE_CARD_PERSON_TYPE,
        payload: personType
    }
}

export function* workerSetPlaceCardPersonTypeTab(action: PayloadAction<string>) {

    const personType: PersonFilterType | string = action.payload;
    const placeId: string = yield select(getSelectedPlaceId);
    const selectedDay: string = yield select(getLineStatSelectedDay);

    const response: StatResponse = yield call(extendedFetch, `/api/v1/line/${placeId}/${personType}/stat/${selectedDay}`);

    yield put(panelSlice.actions.setPlaceCardPersonTypeTab(personType as PersonFilterType));
    yield put(panelSlice.actions.setLineStats(response));
}

export function* watchSetPlaceCardPersonTypeTab() {
    yield takeEvery(sagaActionTypes.SET_PLACE_CARD_PERSON_TYPE, workerSetPlaceCardPersonTypeTab);
}





export const initAndOpenPlaceCardAction = () => {
    return {
        type: sagaActionTypes.INIT_AND_OPEN_PLACE_CARD,
    }
}

export function* workerInitAndOpenPlaceCard() {
    yield put(panelSlice.actions.openPlaceDetails());
    yield put(mapSlice.actions.displayRoutes([]));

    const selectedDay: string = yield select(getLineStatSelectedDay);

    yield put(getDayLineStatAction(selectedDay));

}

export function* watchInitAndOpenPlaceCard() {
    yield takeEvery(sagaActionTypes.INIT_AND_OPEN_PLACE_CARD, workerInitAndOpenPlaceCard);
}


export const setDefaultLineStatWeekAction = () => {
    return {
        type: sagaActionTypes.SET_DEFAULT_STAT_WEEK,
    }
}

export function* workerSetDefaultLineStatWeek() {
    const now: Date = new Date();

    const daysToRemove: number = now.getDay() == 0
        ? 6
        : now.getDay() - 1;

    const weekStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - daysToRemove
    );

    const weekStartString = dateFormat(weekStart, "yyyy-mm-dd");

    yield put(panelSlice.actions.changeWeekStart(weekStartString));
    yield put(panelSlice.actions.changeSelectedDay(weekStartString));

}

export function* watchSetDefaultLineStatWeek() {
    yield takeEvery(sagaActionTypes.SET_DEFAULT_STAT_WEEK, workerSetDefaultLineStatWeek);
}