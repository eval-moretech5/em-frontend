import {sagaActionTypes} from "store/sagaActionTypes";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {extendedFetch, getSelectedPlaceId} from "utils/functions";
import {StatResponse} from "components/Panel/types";
import {panelSlice} from "components/Panel/slice";
import {PayloadAction} from "@reduxjs/toolkit";

export const getPlaceCardPersonTypeTab = (store: any): string => store.panel.placeCard.personTypeTab;

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