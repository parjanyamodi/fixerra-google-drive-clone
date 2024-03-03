import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { searchedAndSorted: FileDetails[] } = {
    searchedAndSorted: [],
};


export const searchedAndSortedSlice = createSlice({
    name: "searchedAndSorted",
    initialState,
    reducers: {
        setSearchedAndSorted: (state, action: PayloadAction<FileDetails[]>) => {
            state.searchedAndSorted = action.payload;
        },
        resetSearchedAndSorted: () => initialState
    },
});

export const { setSearchedAndSorted, resetSearchedAndSorted } = searchedAndSortedSlice.actions;