import { Injectable } from "@angular/core";
import { Discipline, TimetableType } from "../models/discipline.model";
import axios from "axios";
import { SearchItem } from "../models/search-item.model";

@Injectable({
  providedIn: "root",
})
export class TimetableGetService {
  private url = "https://api.u20291022.info/timetable/get";
  public disciplines: Discipline[] = [];
  public timetableType = TimetableType.GROUP; // default
  public timetableName = "ИТб-222" // default
  public loading = false;

  public async get(searchItem: SearchItem): Promise<Discipline[]> {
    this.timetableType = searchItem.timetableType;
    this.timetableName = searchItem.timetableName;
    this.loading = true;

    const request = await axios.get(this.url, {
      params: {
        type: searchItem.timetableType,
        id: searchItem.timetableId,
      },
    });
    
    this.loading = false;

    this.disciplines = <Discipline[]>request.data
    return this.disciplines;
  }

  public getByDate(dateString: string) {
    return this.disciplines.filter((discipline) => {
      return discipline.date_lesson === dateString;
    })
  }
}
