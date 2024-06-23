import { DaysWeekType,FilterValuesType } from "@/types/general.type";
import RoutineType from "@/types/routine.type";

export const selectFilterOptions = [
    { value: "all", label: "All routine" },
    { value: "important", label: "Important" },
    { value: "waiting", label: "Waiting" },
    { value: "completed", label: "completed" },
    { value:'archived', label:'Archived'},
    { value:'unarchived', label:'Unarchived'},
];

export const daysSchedule : {value: DaysWeekType, label: string}[] = [
    // {value:'day', label: 'Day'},
    {value: 'sunday', label: 'Sunday'},
    {value: 'monday', label: 'Monday'},
    {value: 'tuesday', label: 'Tuesday'},
    {value: 'wednesday', label: 'Wednesday'},
    {value: 'thursday', label: 'Thursday'},
    {value: 'friday', label: 'Friday'},
    {value: 'saturday', label: 'Saturday'},
]


const andOperator = (...conditions: boolean[]) : boolean => {
    if (conditions.length === 0) {
        return false; // No conditions to test
    }

    // Test all conditions using logical AND
    for (let condition of conditions) {
        if (!condition) {
            return false; // If any condition is false, return false
        }
    }

    return true;
}
const isRoutineArchived = (routine : RoutineType) : boolean => routine.isArchived

export const filterRoutines = (
    routines: RoutineType[],
    filterLabel :FilterValuesType,
    selectedDaysSchedule : DaysWeekType[],) => {
    switch (filterLabel) {
        case FilterValuesType.ALL:
            return routines.filter(routine => 
                !selectedDaysSchedule.length || routine.days.some(day => selectedDaysSchedule.includes(day)))
        case FilterValuesType.IMPORTANT:
            return routines.filter(routine => andOperator(
                !selectedDaysSchedule.length || routine.days.some(day => selectedDaysSchedule.includes(day)),
                routine.priority === 'important',
                !isRoutineArchived(routine)))

        case FilterValuesType.COMPLETED:
            return routines.filter(routine => andOperator(
                !selectedDaysSchedule.length || routine.days.some(day => selectedDaysSchedule.includes(day)),
                routine.isSubmitted === true,
                !isRoutineArchived(routine)))

        case FilterValuesType.WAITNG:
            return routines.filter(routine => andOperator(
                !selectedDaysSchedule.length || routine.days.some(day => selectedDaysSchedule.includes(day)),
                routine.isSubmitted === false,
                !isRoutineArchived(routine)))

        case FilterValuesType.ARCHIVED:
            return routines.filter(routine => andOperator(
                !selectedDaysSchedule.length || routine.days.some(day => selectedDaysSchedule.includes(day)),
                routine.isArchived === true))
            
        case FilterValuesType.UNARCHIVED:
            return routines.filter(routine => andOperator(
                !selectedDaysSchedule.length || routine.days.some(day => selectedDaysSchedule.includes(day)),
                routine.isArchived === false))
        default:
            return routines;
        }
}