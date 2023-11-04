export enum TimetableType {
  GROUP = "group",
  TEACHER = "teacher",
}

interface Discipline {
  date_lesson: string;
  time: string; // we set time
  timetableType: TimetableType;// we set type
  type: string; 
  subject: string;
  subgroup: string;
  place: string;
  lesson_number: string;
  teacher_name?: string;
  education_group_name?: string;
}

export type TimetableResponse = Discipline[];

export const timeByIndex = [
  "9:00-10:30",
  "10:50-12:20",
  "13:20-14:50",
  "15:10-16:40",
  "17:00-18:30",
  "18:50-20:20",
  "20:30-22:00",
];