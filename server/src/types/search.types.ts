export interface GroupResult {
  dept_id: string;
  name: string;
}

export interface TeacherResult {
  person_id: string;
  name: string;
}

export type SearchResults = (GroupResult | TeacherResult)[];

export interface PreviousSearches {
  [searchData: string]: SearchResults;
}
