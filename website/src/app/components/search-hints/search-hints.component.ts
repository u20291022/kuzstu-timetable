import { Component, OnInit } from "@angular/core";
import { TimetableType } from "src/app/models/discipline.model";
import { SearchItem } from "src/app/models/search-item.model";
import { TimetableGetService } from "src/app/services/timetable-get.service";
import { TimetableSearchService } from "src/app/services/timetable-search.service";

@Component({
  selector: "app-search-hints",
  templateUrl: "search-hints.component.html",
  styleUrls: ["search-hints.component.css"]
})
export class SearchHintsComponent implements OnInit {
  constructor (public searchService: TimetableSearchService, public getService: TimetableGetService) {}

  public onClick(searchItem: SearchItem) {
    const searchHints = <HTMLElement>document.getElementById("search-hints");
    const searchInput = <HTMLInputElement>document.getElementById("search");
    const searchSection = <HTMLElement>document.getElementById("search-section");
    
    searchHints.style.visibility = "hidden";
    
    searchInput.value = "";
    searchInput.placeholder = searchItem.timetableName;

    searchSection.style.borderBottomLeftRadius = "5px";
    searchSection.style.borderBottomRightRadius = "5px";

    this.getService.disciplines = [];
    this.getService.get(searchItem);
  }

  public ngOnInit() {
    const searchInput = <HTMLInputElement>document.getElementById("search");
    const searchButton = <HTMLButtonElement>document.getElementById("search-button");
    const searchHints = <HTMLElement>document.getElementById("search-hints");
    const searchSection = <HTMLElement>document.getElementById("search-section");

    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value;

      if (searchValue.length < 2) {
        searchHints.style.visibility = "hidden";

        searchSection.style.borderBottomLeftRadius = "5px";
        searchSection.style.borderBottomRightRadius = "5px";
      }
    })

    document.addEventListener("click", (event) => {
      if (event.target &&
          !searchHints.contains(<Node>event.target) &&
          !searchButton.contains(<Node>event.target) &&
          !searchInput.contains(<Node>event.target)) { 
        searchHints.style.visibility = "hidden";

        searchSection.style.borderBottomLeftRadius = "5px";
        searchSection.style.borderBottomRightRadius = "5px";
      } 
    })

    searchButton.addEventListener("click", () => {
      const searchValue = searchInput.value;

      if (searchValue.length >= 2) {
        searchHints.style.visibility = "visible";

        this.searchService.searchItems = [];
        this.searchService.search(searchValue);

        searchSection.style.borderBottomLeftRadius = "0px";
        searchSection.style.borderBottomRightRadius = "0px";
      }
    })

    searchSection.addEventListener("resize", (event) => {
      this.resizeSearchHints();
    })

    this.resizeSearchHints(); // onload
  }

  private resizeSearchHints() {
    const searchHints = <HTMLElement>document.getElementById("search-hints");
    const searchSection = <HTMLElement>document.getElementById("search-section");

    const computedStyle = window.getComputedStyle(searchSection);
    const searchSectionWidth = computedStyle.width;

    searchHints.style.width = searchSectionWidth;
  }
}