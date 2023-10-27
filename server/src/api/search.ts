import axios from "axios";
import { GroupResult, PreviousSearches, SearchResults, TeacherResult } from "../types/search.types";

class Search {
  private groupsSearchUrl = "https://portal.kuzstu.ru/api/group?group=";
  private teachersSearchUrl = "https://portal.kuzstu.ru/api/teachers?teacher=";
  private previousSearches: PreviousSearches = {};

  private async searchGroups(searchData: string): Promise<GroupResult[]> {
    const request = await axios.get(this.groupsSearchUrl + searchData);
    const requestData: GroupResult[] = request.data;

    return requestData;
  }

  private async searchTeachers(searchData: string): Promise<TeacherResult[]> {
    const request = await axios.get(this.teachersSearchUrl + searchData);
    const requestData: TeacherResult[] = request.data;

    return requestData;
  }

  public async getSearchResult(dataToSearch: string): Promise<SearchResults> {
    dataToSearch = dataToSearch.toLowerCase();

    for (let i = dataToSearch.length; i >= 2; i--) {
      const slicedSearchData = dataToSearch.slice(0, i);

      if (this.previousSearches[slicedSearchData]) {
        return this.previousSearches[slicedSearchData]
          .filter(v => v.name.toLowerCase().indexOf(dataToSearch) !== -1);
      }
    }
    
    const groupsSearchResult = await this.searchGroups(dataToSearch);
    const teachersSearchResult = await this.searchTeachers(dataToSearch);
    
    const rawSearchResults: SearchResults = [...groupsSearchResult, ...teachersSearchResult];
    const serachResults = rawSearchResults.filter(result => result.name);
    
    this.previousSearches[dataToSearch] = serachResults;

    return serachResults;
  }
}

export const search = new Search();