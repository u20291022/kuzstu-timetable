export enum TimetableType {
  GROUP = "group",
  TEACHER = "teacher",
  CLASSROOM = "classroom"
}

export interface Discipline {
  date_lesson: string;
  time: string;
  type: string;
  timetableType: TimetableType;
  subject: string;
  subgroup: string;
  place: string;
  lesson_number: string;
  teacher_name?: string;
  education_group_name?: string;
}