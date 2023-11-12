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
  public loading = false;
  
  public timetableType = TimetableType.GROUP; // by default
  public timetableName = "ИТб-222" // by default

  public async get(searchItem: SearchItem): Promise<Discipline[]> {
    this.timetableType = searchItem.timetableType;
    this.timetableName = searchItem.timetableName;
    this.loading = true;

    // bad method to fix kuzstu bad api method
    if (this.timetableType === TimetableType.CLASSROOM) {
      searchItem.timetableId = searchItem.timetableId.slice(0, 5) // "4 лекционная аудитория" -> "4 лек"
    }

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
