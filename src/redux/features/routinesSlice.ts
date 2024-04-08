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
        },
        checkRoutine: (state, action: PayloadAction<string>) => {
            const routineId = action.payload
            return state.map(routine => routine.routineId !== routineId ? routine : {...routine, isSubmitted: true})
        }
    }
})

export const { addRoutine, setRoutines, checkRoutine } = routinesReducer.actions;

export default routinesReducer.reducer;