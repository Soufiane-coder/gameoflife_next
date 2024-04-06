import { Dayjs } from "dayjs";
import { PriorityType, DaysWeekType } from "./general.type";
import { Timestamp } from "firebase/firestore";

export enum GoalStatus {
    DONE = 'DONE',
    SKIPPED = 'SKIPPED',
    WAITING = 'WAITING',
}
export interface GoalType {
    label: string;
    goalId: string;
    type: 'sub-goal' | 'small-goal' | 'big-goal';
    description : string;
    status: GoalStatus;
}

interface AbstractRoutineType{
    routineId?: string;
    categoryId ?: string;
    title : string;
    description  : string;
    level  : 0 | 1 | 2 | 3 | 4 | 5;
    combo  : 0;
    isSubmitted  : boolean;
    isArchived : boolean;
    skip : number;
    priority  : PriorityType,
    message : string;
    emoji : string;
    bgEmojiColor : string;
    character  : string;
    days : DaysWeekType[];
}

export default interface RoutineType extends AbstractRoutineType {
    lastSubmit : Dayjs; // yyyy-mm-dd
    rangeTime : [Dayjs,Dayjs]; // 'HH:mm:ss'
    spentedTime : Dayjs;
}

export interface RoutineDeliverableType extends AbstractRoutineType {
    lastSubmit : Timestamp;
    rangeTime : [Timestamp,Timestamp]; // 'HH:mm:ss'
    spentedTime : Timestamp;
}