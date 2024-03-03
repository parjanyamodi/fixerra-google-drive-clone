
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FileTree = {

};

export const rawFileTreeSlice = createSlice({
    name: 'rawFileTree',
    initialState,
    reducers: {
        setRawFileTree: (state, action: PayloadAction<FileTree>) => {
            return action.payload;
        },
        resetRawFileTree: () => initialState


    },
});

export const { setRawFileTree, resetRawFileTree } = rawFileTreeSlice.actions;

