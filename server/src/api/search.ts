import axios from "axios";
import { Groups, PreviousSearches, SearchResponse, Teachers } from "../types/search.types";
import { TimetableType } from "../types/get.types";

class TimetableSearch {
  private links = {
    [TimetableType.GROUP]: "https://portal.kuzstu.ru/api/group",
    [TimetableType.TEACHER]: "https://portal.kuzstu.ru/api/teachers",
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
        })

        return validItems;
      }
    }

    return null;
  }

  private async searchGroups(searchData: string): Promise<SearchResponse> {
    const request = await axios.get(this.links[TimetableType.GROUP], {
      params: { group: searchData }
    });
    const groups: Groups = <Groups>request.data;

    return groups.map((group) => {
      return {
        timetableType: TimetableType.GROUP,
        timetableId: group.dept_id,
        timetableName: group.name
      }
    })
  }

  private async searchTeachers(searchData: string): Promise<SearchResponse> {
    const request = await axios.get(this.links[TimetableType.TEACHER], {
      params: { teacher: searchData }
    });

    const teachers: Teachers = <Teachers>request.data;

    return teachers.map((teacher) => {
      return {
        timetableType: TimetableType.TEACHER,
        timetableId: teacher.person_id,
        timetableName: teacher.name
      }
    })
  }

  public async get(searchData: string): Promise<SearchResponse> {
    searchData = searchData.toLowerCase();
    const searchResultFromPreviousSearches = this.searchInPreviousSearches(searchData);

    if (searchResultFromPreviousSearches) {
      return searchResultFromPreviousSearches;
    }

    const groups = await this.searchGroups(searchData);
    const teachers = await this.searchTeachers(searchData);
    const searchResponse = [...groups, ...teachers];
    const filteredSearchResponse = searchResponse.filter((item) => item.timetableName);

    this.previousSearches[searchData] = filteredSearchResponse;
    return filteredSearchResponse;
  }
}

export const timetableSearch = new TimetableSearch();
