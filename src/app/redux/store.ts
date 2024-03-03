import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { searchedAndSortedSlice } from './slices/searchedAndSortedSlice';
import { rawFileTreeSlice } from './slices/rawFileTree';
export const store = configureStore({
    reducer: {
        searchedAndSorted: searchedAndSortedSlice.reducer,
        rawFileTree: rawFileTreeSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
