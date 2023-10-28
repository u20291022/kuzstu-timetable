import { TimetableType } from "./get.types";

interface Group {
  dept_id: string;
  name: string;
}

export type Groups = Group[];

interface Teacher {
  person_id: string;
  name: string;
}

export type Teachers = Teacher[];

interface SearchItem {
  timetableType: TimetableType,
  timetableId: string,
  timetableName: string
}

export type SearchResponse = SearchItem[];

export interface PreviousSearches {
  [searchData: string]: SearchResponse;
}