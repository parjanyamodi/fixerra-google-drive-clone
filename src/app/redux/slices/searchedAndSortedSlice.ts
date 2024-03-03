import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { files: FileDetails[] } = {
    files: [],
};


export const searchedAndSortedSlice = createSlice({
    name: "searchedAndSorted",
    initialState,
    reducers: {
        setSearchedAndSorted: (state, action: PayloadAction<FileDetails[]>) => {
            return { ...state, files: action.payload };
        },
        resetSearchedAndSorted: () => initialState
    },
});

export const { setSearchedAndSorted, resetSearchedAndSorted } = searchedAndSortedSlice.actions;