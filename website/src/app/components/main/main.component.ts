import { Component, OnInit } from "@angular/core";
import { TimetableType } from "src/app/models/discipline.model";
import { TimetableGetService } from "src/app/services/timetable-get.service";

@Component({
  selector: "app-main",
  templateUrl: "main.component.html",
  styleUrls: ["main.component.css"]
})
export class MainComponent implements OnInit {
  public date = new Date();
  public currentDate = this.date.toLocaleDateString("fr-CA"); // fr-CA cuz format is "yyyy-MM-dd"
  public currentFullDate = this.capitalizeFirstLetter(this.date.toLocaleDateString("ru-RU", { "dateStyle": "full" }));

  constructor(public getService: TimetableGetService) {
    setInterval(() => (this.date = new Date()), 1000); // update time every second
  }

  public async ngOnInit(): Promise<void> {
    const dateInput = <HTMLInputElement>document.getElementById("date-input");

    if (!dateInput) {
      return;
    }

    await this.getService.get({
      timetableId: "6479",
      timetableType: TimetableType.GROUP,
      timetableName: "ИТб-222"
    }); // default
    
    dateInput.addEventListener("change", () => {
      const newDate = dateInput.value;
      const date = new Date(newDate);

      this.currentDate = newDate;
      this.currentFullDate = newDate ?
        this.capitalizeFirstLetter(date.toLocaleDateString("ru-RU", { "dateStyle": "full" })) :
        "Неправильная дата!";
    });
  }

  private capitalizeFirstLetter(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
}