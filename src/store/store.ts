import createSagaMiddleware from "redux-saga";
import {Store} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {createRootReducer} from "store/reducer";
import {watchDeterminePosition, watchLoadBranches} from "components/Map/saga";
import {watchGetAtmBanksTitles, watchGetRoutes, watchGetRoutesToPlace} from "components/Panel/saga";
import {watchGetDayLineStat} from "components/Panel/LineStatistic/saga";


const sagaMiddleware = createSagaMiddleware();

export const store: Store = configureStore(
    {
        reducer: createRootReducer(),
        middleware: [
            sagaMiddleware
        ],
        devTools: true
    }
);


sagaMiddleware.run(watchLoadBranches);
sagaMiddleware.run(watchDeterminePosition);
sagaMiddleware.run(watchGetRoutes);
sagaMiddleware.run(watchGetRoutesToPlace);
sagaMiddleware.run(watchGetAtmBanksTitles);
sagaMiddleware.run(watchGetDayLineStat);