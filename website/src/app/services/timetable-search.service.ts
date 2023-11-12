import { Injectable } from "@angular/core";
import { SearchItem } from "../models/search-item.model";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class TimetableSearchService {
  private url = "https://api.u20291022.info/timetable/search";

  public searchItems: SearchItem[] = [];
  public searching = false;

  public async search(searchData: string): Promise<SearchItem[]> {
    this.searching = true;

    searchData = this.fixSearchData(searchData);
    const request = await axios.get(this.url, { params: { data: searchData } });

    this.searchItems = <SearchItem[]>request.data;
    this.searching = false;

    return this.searchItems;
  }

  private fixSearchData(searchData: string): string {
    let fixedSearchData = "";

    const loweredSearchData = searchData.toLowerCase();
    const isEnglishLetters = searchData.match(/[A-Za-z]/g) !== null;
    
    if (isEnglishLetters) {
      const englishToRussian: { [engChar: string]: string } = {
        "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е",
        "y": "н", "u": "г", "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ",
        "a": "ф", "s": "ы", "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л",
        "l": "д", ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и", "n": "т",
        "m": "ь", ",": "б", ".": "ю"
      }

      fixedSearchData = loweredSearchData.split("")
        .map((char) => englishToRussian[char] || char)
        .join("");
    }
    else { // if russian
      fixedSearchData = loweredSearchData.replace(/ё/g, "е");
    }

    return fixedSearchData;
  }
}
