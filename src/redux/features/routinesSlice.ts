import RoutineType from "@/types/routine.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

type RoutineInitType = {
    loading: boolean,
    routines?: RoutineType[],
    error: string,
}

const routineInitialState : RoutineInitType = {
    loading : false,
    routines : undefined,
    error: '', 
}

export const fetchRoutines = createAsyncThunk('routine/fetchRoutines', async ({uid, lastVisit}: {uid: string, lastVisit: Timestamp}) => {
    const res = await fetch(`/api/firebase/routines`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uid,
            lastVisit,
        }),
    })
    return await res.json()
})


export const routinesReducer = createSlice({
    name: 'routines',
    initialState : routineInitialState,
    reducers: {
        addRoutine: (state, action: PayloadAction<RoutineType>) => {
            state.routines?.push(action.payload)
        },
        setRoutines: (state, action: PayloadAction<RoutineType[]>) => {
            return {...state, routines: action.payload}
        },
        checkRoutine: (state, action: PayloadAction<string>) => {
            const routineId = action.payload
            const routines = state.routines?.map(routine => routine.routineId !== routineId ? routine : {...routine, isSubmitted: true})
            return {...state, routines}
        },
        removeRoutine: (state, action: PayloadAction<string>) => {
            const routines = state.routines?.filter(routine => routine.routineId !== action.payload)
            return {...state, routines}
        },
        editRoutine: (state, action :PayloadAction<RoutineType>) => {
            const routines =  state.routines?.map((routine : RoutineType) => {
                if (routine.routineId === action.payload.routineId) {
                  routine = {...action.payload}
                }
                return routine;
              });
            return {...state, routines}
        },
        buySkip: (state, action: PayloadAction<string>) => {
            const routineId = action.payload
            const routines = state.routines?.map(routine => routine.routineId !== routineId ? routine : {...routine, skip: 1+routine.skip})
            return {...state, routines}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoutines.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRoutines.fulfilled, (state, action : PayloadAction<RoutineType[]>) => {
            state.loading = false;
            state.routines = action.payload;
            state.error = '';
        });
        builder.addCase(fetchRoutines.rejected, (state, action ) => {
            state.loading = false;
            state.routines = undefined;
            state.error = action.error.message || 'Something went wrong';
        });
    },
})

export const { addRoutine, setRoutines, checkRoutine, removeRoutine, editRoutine, buySkip } = routinesReducer.actions;

export default routinesReducer.reducer;