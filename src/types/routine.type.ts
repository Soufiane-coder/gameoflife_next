import { Dayjs } from "dayjs";
import { PriorityType, DaysWeekType } from "./general.type";
import { Timestamp } from "firebase/firestore";

export enum GoalStatus {
    DONE = 'DONE',
    SKIPPED = 'SKIPPED',
    WAITING = 'WAITING',
}

export enum GoalTypeAttrs {
    SUBGOAL = 'SUBGOAL',
    SMALLGOAL = 'SMALLGOAL',
    BIGGOAL = 'BIGGOAL',
}
export interface GoalType {
    label: string;
    goalId?: string;
    type: GoalTypeAttrs;
    description : string;
    status: GoalStatus;
}

interface AbstractRoutineType{
    routineId?: string;
    categoryId ?: string;
    title : string;
    description  : string;
    level  : 0 | 1 | 2 | 3 | 4 | 5;
    combo  : number;
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
    // added string cause when i use fetch method dayjs turnt to string to be sent from user to server
    lastSubmit : Dayjs | string; // yyyy-mm-dd
    rangeTime : [Dayjs,Dayjs] | [string, string]; // 'HH:mm:ss'
    spentedTime : Dayjs | string;
}

export interface RoutineDeliverableType extends AbstractRoutineType {
    lastSubmit : Timestamp;
    rangeTime : [Timestamp,Timestamp]; // 'HH:mm:ss'
    spentedTime : Timestamp;
}