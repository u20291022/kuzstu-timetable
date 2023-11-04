import { TimetableType } from "./discipline.model";

export interface SearchItem {
  timetableType: TimetableType,
  timetableId: string,
  timetableName: string
}