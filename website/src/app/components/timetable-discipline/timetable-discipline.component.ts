import { Component, Input } from "@angular/core";
import { Discipline } from "src/app/models/discipline.model";

@Component({
  selector: "timetable-discipline",
  templateUrl: "timetable-discipline.component.html",
  styleUrls: ["timetable-discipline.component.css"]
})
export class TimetableDisciplineComponent {
  @Input() discipline: Discipline;
  @Input() prevDiscipline: Discipline | null;
}