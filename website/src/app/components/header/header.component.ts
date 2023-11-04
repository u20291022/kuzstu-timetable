import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"]
})
export class HeaderComponent implements OnInit {
  public ngOnInit(): void {
    const searchInput = <HTMLInputElement>document.getElementById("search");
    const searchButton = <HTMLButtonElement>document.getElementById("search-button");
    
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
      }
    })
  }
}