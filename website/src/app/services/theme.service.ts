import { Injectable } from "@angular/core";
import { Theme } from "../models/theme.model";

@Injectable({
  providedIn: "root"
})
export class ThemeSerivce {
  public getCurrent(): Theme {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkTheme ? Theme.DARK : Theme.LIGHT;
  }

  public set(theme: Theme) {
    if (theme === Theme.DARK) {
      document.documentElement.style.setProperty("--bg-color", "#333333");
      document.documentElement.style.setProperty("--text-color", "#999999");
      document.documentElement.style.setProperty("--accent-color", "#252525");
      document.documentElement.style.setProperty("--active-color", "#6688aa");
      document.documentElement.style.setProperty("--shadow-color", "#111111aa");
    }
    else {
      document.documentElement.style.setProperty("--bg-color", "#ffffff");
      document.documentElement.style.setProperty("--text-color", "#333333");
      document.documentElement.style.setProperty("--accent-color", "#d7e7f7");
      document.documentElement.style.setProperty("--active-color", "#b1c8de");
      document.documentElement.style.setProperty("--shadow-color", "#999999aa");
    }
  }
}