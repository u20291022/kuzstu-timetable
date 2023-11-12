import { TimetableType, TimetableResponse, timeByIndex } from "../types/get.types";
import axios from "axios";

class TimetableGet {
  private links = {
    [TimetableType.GROUP]: "https://portal.kuzstu.ru/api/student_schedule?group_id=",
    [TimetableType.TEACHER]: "https://portal.kuzstu.ru/api/teacher_schedule?teacher_id=",
    [TimetableType.CLASSROOM]: "https://portal.kuzstu.ru/api/classroom_schedule?classroom="
  };

  private setDisciplinesTimeAndType(timetable: TimetableResponse, timetableType: TimetableType): TimetableResponse {
    return timetable.map((discipline) => {
      discipline.timetableType = timetableType;
      discipline.time = timeByIndex[Number(discipline.lesson_number) - 1];
      
      // fix for original API (it has two variants: Лаб and лаб.)
      discipline.type = discipline.type.toLowerCase().includes("лаб") ? "лаб." : discipline.type

      return discipline;
    });
  }

  public async get(timetableType: TimetableType, timetableId: string): Promise<TimetableResponse> {
    const apiUrl = this.links[timetableType];

    const request = await axios.get(apiUrl + timetableId);
    const rawTimetableResponse: TimetableResponse = request.data;

    const timetableResponse = this.setDisciplinesTimeAndType(rawTimetableResponse, timetableType);
    return timetableResponse.filter((data) => data.date_lesson);
  }
}

export const timetableGet = new TimetableGet();
