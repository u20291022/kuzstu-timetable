import axios from "axios";
import { Classrooms, Groups, PreviousSearches, SearchResponse, Teachers } from "../types/search.types";
import { TimetableType } from "../types/get.types";

class TimetableSearch {
  private links = {
    [TimetableType.GROUP]: "https://portal.kuzstu.ru/api/group",
    [TimetableType.TEACHER]: "https://portal.kuzstu.ru/api/teachers",
    [TimetableType.CLASSROOM]: "https://portal.kuzstu.ru/api/classrooms",
  };

  private previousSearches: PreviousSearches = {};

  private searchInPreviousSearches(searchData: string): SearchResponse | null {
    for (let currentSearchLength = searchData.length; currentSearchLength >= 2; currentSearchLength--) {
      const currentSearchData = searchData.slice(0, currentSearchLength);
      const currentSearchItems = this.previousSearches[currentSearchData];

      if (currentSearchItems) {
        const validItems = currentSearchItems.filter((item) => {
          const loweredTimetableName = item.timetableName.toLowerCase();
          return loweredTimetableName.indexOf(searchData) !== -1;
        });

        return validItems;
      }
    }

    return null;
  }

  private async searchGroups(searchData: string): Promise<SearchResponse> {
    const request = await axios.get(this.links[TimetableType.GROUP], {
      params: { group: searchData },
    });
    const groups: Groups = <Groups>request.data;

    return groups.map((group) => {
      return {
        timetableType: TimetableType.GROUP,
        timetableId: group.dept_id,
        timetableName: group.name,
      };
    });
  }

  private sortTeachersByLastName(seacrhData: string, teachers: SearchResponse): SearchResponse {
    return teachers.sort((curr, next) => {
      const currentName = curr.timetableName.toLowerCase();
      const nextName = next.timetableName.toLowerCase();
      return currentName.indexOf(seacrhData) - nextName.indexOf(seacrhData);
    });
  }

  private async searchTeachers(searchData: string): Promise<SearchResponse> {
    const request = await axios.get(this.links[TimetableType.TEACHER], {
      params: { teacher: searchData },
    });

    const rawTeachers: Teachers = <Teachers>request.data;
    const teachers = rawTeachers.map((teacher) => {
      return {
        timetableType: TimetableType.TEACHER,
        timetableId: teacher.person_id,
        timetableName: teacher.name,
      };
    });

    return this.sortTeachersByLastName(searchData, teachers);
  }

  private async searchClassrooms(searchData: string): Promise<SearchResponse> {
    const request = await axios.get(this.links[TimetableType.CLASSROOM], {
      params: { classroom: searchData }
    });
    const classrooms: Classrooms = <Classrooms>request.data;

    return classrooms.map((classroom) => {
      return {
        timetableType: TimetableType.CLASSROOM,
        timetableId: classroom.name, // cuz KuzSTU API uses classroom name as id o_O
        timetableName: classroom.name,
      };
    });
  }

  public async get(searchData: string): Promise<SearchResponse> {
    searchData = searchData.toLowerCase();
    
    const searchResultFromPreviousSearches = this.searchInPreviousSearches(searchData);

    if (searchResultFromPreviousSearches) {
      return searchResultFromPreviousSearches;
    }

    const groups = await this.searchGroups(searchData);
    const teachers = await this.searchTeachers(searchData);
    const classrooms = await this.searchClassrooms(searchData);

    const searchResponse = [...groups, ...teachers, ...classrooms];
    const filteredSearchResponse = searchResponse.filter((item) => item.timetableName);

    this.previousSearches[searchData] = filteredSearchResponse;
    return filteredSearchResponse;
  }
}

export const timetableSearch = new TimetableSearch();
