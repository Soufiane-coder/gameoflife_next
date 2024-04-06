import RoutineType from "@/types/routine.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: RoutineType[] = []

export const routinesReducer = createSlice({
    name: 'routines',
    initialState,
    reducers: {
        addRoutine: (state, action: PayloadAction<RoutineType>) => {
            state.push(action.payload)
        },
        setRoutines: (state, action: PayloadAction<RoutineType[]>) => {
            return action.payload
        }
    }
})

export const { addRoutine, setRoutines } = routinesReducer.actions;

export default routinesReducer.reducer;