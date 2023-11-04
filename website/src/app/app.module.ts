import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { SearchHintsComponent } from "./components/search-hints/search-hints.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { TimetableDisciplineComponent } from "./components/timetable-discipline/timetable-discipline.component";
import { MainComponent } from "./components/main/main.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchHintsComponent, LoadingComponent, TimetableDisciplineComponent, MainComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
