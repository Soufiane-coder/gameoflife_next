import { setComboToZeroInFirebase, uncheckAllRoutinesBelongToUserInFirebase, UpdateSkipAndLastSubmitInFirebase, updateTheDayOfLastVisitToTodayInFirebase } from "@/lib/firebase/routine.apis";
import { TimestampToDayjs } from "@/lib/firebase/utils";
import RoutineType, { RoutineDeliverableType } from "@/types/routine.type";
import { UserType } from "@/types/user.type";
import dayjs, { Dayjs } from "dayjs";
import { Timestamp } from "firebase/firestore";



export const initialProtocol = async (uid: string, userSLastVisit: Timestamp, routines : RoutineType[]) => {
        // if users opject has been loaded from local storage then that function will
        // if(!userSLastVisit?.toDate) return;
        // not be in the scope so we wait until we get the object from database
        const lastVisit = dayjs(userSLastVisit.toDate()).format('YYYY-MM-DD')
    
        if(lastVisit !== dayjs(new Date()).format('YYYY-MM-DD')){
            await uncheckAllRoutinesBelongToUserInFirebase(uid, routines);
            await updateTheDayOfLastVisitToTodayInFirebase(uid)
            routines = routines.map(routine => ({...routine, isSubmitted: false,}))
        }
    
        return await Promise.all(routines.map(async routine => {
            const localRoutine = routine
    
            const {routineId, combo, lastSubmit} = localRoutine;
            let {skip} = localRoutine;
            
            if(combo === 0) return localRoutine;
    
            const currentDate = new Date();
            const lastSubmitFormatted = new Date((lastSubmit as Dayjs).toDate()).toISOString().slice(0, 10);
    
            if (lastSubmitFormatted === currentDate.toISOString().slice(0, 10)) return localRoutine;
    
            const yesterday = new Date();
            yesterday.setDate(currentDate.getDate() - 1);
            const yesterdayFormatted = yesterday.toISOString().slice(0, 10);
    
            if (lastSubmitFormatted === yesterdayFormatted) return localRoutine;
    
            const dateDiff = Math.floor((currentDate.getTime() - new Date(lastSubmitFormatted).getTime()) / (1000 * 60 * 60 * 24));
    
    
            if(skip >= dateDiff - 1){ // it will not be -1 cause when diff is zero it means yesterday
                skip -= dateDiff - 1; // -1 means untill yesterday
    
                await UpdateSkipAndLastSubmitInFirebase(uid, routineId as string, skip, Timestamp.fromDate(yesterday))
                localRoutine.skip = skip;
            }
            else{
                await setComboToZeroInFirebase(uid, routineId as string);
                localRoutine.combo = 0;
            }
    
            return localRoutine
        }))
}