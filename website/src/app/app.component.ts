import { Component, OnInit } from "@angular/core";
import { ThemeSerivce } from "./services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
})
export class AppComponent implements OnInit {
  constructor (private themeService: ThemeSerivce) {};

  public ngOnInit(): void {
    const onloadTheme = this.themeService.getCurrent();
    this.themeService.set(onloadTheme);

    setInterval(() => this.themeService.set(this.themeService.getCurrent()), 500);
  }
}
