import { Injectable } from "@angular/core";
import { SearchItem } from "../models/search-item.model";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class TimetableSearchService {
  private url = "https://api.u20291022.info/timetable/search";
  public searchItems: SearchItem[] = [];
  public searching = false;

  public async search(searchData: string): Promise<SearchItem[]> {
    this.searching = true;

    const request = await axios.get(this.url, { params: { data: searchData } });

    this.searchItems = <SearchItem[]>request.data;
    this.searching = false;

    return this.searchItems;
  }
}
