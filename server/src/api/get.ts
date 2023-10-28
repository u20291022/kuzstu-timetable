import { TimetableType, TimetableResponse, timeByIndex } from "../types/get.types";
import axios from "axios";

class TimetableGet {
  private links = {
    [TimetableType.GROUP]: "https://portal.kuzstu.ru/api/student_schedule?group_id=",
    [TimetableType.TEACHER]: "https://portal.kuzstu.ru/api/teacher_schedule?teacher_id=",
  };

  private setDisciplinesTimesAndType(timetable: TimetableResponse): TimetableResponse {
    return timetable.map((discipline) => {
      discipline.type = discipline.education_group_name ? TimetableType.GROUP : TimetableType.TEACHER;
      discipline.time = timeByIndex[Number(discipline.lesson_number) - 1];

      return discipline;
    });
  }

  public async get(timetableType: TimetableType, timetableId: string): Promise<TimetableResponse> {
    const apiUrl = this.links[timetableType];

    const request = await axios.get(apiUrl + timetableId);
    const rawTimetableResponse: TimetableResponse = request.data;

    const timetableResponse = this.setDisciplinesTimesAndType(rawTimetableResponse);
    return timetableResponse.filter((data) => data.date_lesson);
  }
}

export const timetableGet = new TimetableGet();
