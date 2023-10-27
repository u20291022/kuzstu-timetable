export enum TimetableType {
  GROUP = "group",
  TEACHER = "teacher"
}

export interface Discipline {
  date_lesson: string,
  type: string,
  subject: string, // discipline
  teacher_name?: string, // if teacher's timetable
  education_group_name?: string, // if group timetable
  subgroup: string,
  place: string, // classroom
  lesson_number: string,
}

export type TimetableJson = Discipline[];