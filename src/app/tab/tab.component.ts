import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  @Input() data: any;
  addSuggestionOpenText: any;
  @ViewChild('openbutton') openbutton;
  recommendedSprintList: any;
  getPhrasesData: any;
  addSuggestion: Array<any> = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnChanges(): void {
    this.recommendedSprint(this.data);
    this.addSuggestionOpenText = '';
    if (this.data) {
      this.addSuggestionOpenText = '';
      this.addSuggestion = [];
      this.getPhrases();
    }
  }

  ngOnInit(): void {
    this.recommendedSprint(this.data);
  }

  recommendedSprint(data) {
    this.apiService.recommendedSprint(data).subscribe(res => {
      this.recommendedSprintList = res;
    })
  }


  openingModal(suggestion) {
    this.openbutton.nativeElement.click();
    this.addSuggestionOpenText = suggestion;
  }

  createPhrases(item) {
    let payload = {
      "sentence": item,
      "category": this.data
    }
    this.apiService.createPhrases(payload).subscribe(res => {
      console.log("this is textarea data*****", res);
      this.getPhrases();
    })
    console.log(this.data, "this is textarea data", payload);
  }

  getPhrases() {
    this.apiService.getPhrases().subscribe(res => {
      console.log("this is get pharses", res);
      this.addSuggestionOpenText = '';
      this.addSuggestion = [];
      this.getPhrasesData = res;

      this.getPhrasesData.forEach(each => {
        if (each.category == this.data) {
          // console.log("this is loop data", each.category);
          // console.log("this is loop data sentences", each.sentence);

          this.addSuggestion.push(each.sentence);

          console.log("this is loop data *********", this.addSuggestion);
        }
      });
      this.addSuggestionOpenText = this.addSuggestion;

    })
  }

 

}
