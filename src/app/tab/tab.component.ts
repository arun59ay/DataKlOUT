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

  constructor(
    private apiService: ApiService
  ) { }

  ngOnChanges(): void{
    this.recommendedSprint(this.data);
    this.addSuggestionOpenText = '';
  }

  ngOnInit(): void {
    this.recommendedSprint(this.data);
  }
  
  recommendedSprint(data){
    this.apiService.recommendedSprint(data).subscribe( res => {
       this.recommendedSprintList = res;
    })
  }


  openingModal(suggestion) {
    this.openbutton.nativeElement.click();
    this.addSuggestionOpenText = suggestion;
  }

}
