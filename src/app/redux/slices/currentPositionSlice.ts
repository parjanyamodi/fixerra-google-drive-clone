
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type CurrentPosition = {
    activeDirectory: string[];
    currentFileTree: FileTree
}
const initialState: CurrentPosition = { activeDirectory: [], currentFileTree: {} };

export const currentPositionSlice = createSlice({
    name: 'currentPosition',
    initialState,
    reducers: {
        setActiveDirectory: (state, action: PayloadAction<string[]>) => {
            return { ...state, activeDirectory: action.payload };
        },
        setCurrentFileTree: (state, action: PayloadAction<FileTree>) => {
            return { ...state, currentFileTree: action.payload }
        },
        resetCurrentPosition: () => initialState
    },
});

export const { setActiveDirectory, setCurrentFileTree, resetCurrentPosition } = currentPositionSlice.actions;

