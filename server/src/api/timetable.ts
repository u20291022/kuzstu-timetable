import axios from "axios";
import { TimetableJson, TimetableType } from "../types/timetable.types";

class Timetable {
  private groupTimetableScheduleUrl = "https://portal.kuzstu.ru/api/student_schedule?group_id=";
  private teacherTimetableScheduleUrl = "https://portal.kuzstu.ru/api/teacher_schedule?teacher_id=";

  public async getTimetable(timetableType: TimetableType, timetableId: string): Promise<TimetableJson> {
    let apiUrl = "";

    switch (timetableType) {
      case TimetableType.GROUP: {
        apiUrl = this.groupTimetableScheduleUrl;
        break;
      }

      case TimetableType.TEACHER: {
        apiUrl = this.teacherTimetableScheduleUrl;
        break;
      }
    }

    const request = await axios.get(apiUrl + timetableId);
    const requestData: TimetableJson = request.data;

    return requestData.filter(data => data.date_lesson);
  }
}

export const timetable = new Timetable();