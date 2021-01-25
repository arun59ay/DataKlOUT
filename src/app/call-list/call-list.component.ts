import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { verify } from 'crypto';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {
  phraseDetails: any = [];
  phrasedisqualified: any = [];
  questionDetails: any = [];
  questiondisqualified: any = [];
  allListDataFilter: any = [];
  phraseData: any = [];
  allData: any = [];
  category: any;
  verificationType: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      let category: any = res.category;
      let id: any = res.id;
      this.category = res.category;
      this.verificationType= res.verificationType;
      // console.log("category", category);
      // console.log("id", this.id);
      // console.log("verification type", this.verificationType);
      this.filterData(category);
    })
  }



  filterData(id: any) {
    this.apiService.disqualifiedCallList(id).subscribe(res => {
      let disqualifiedCallList: any = res
      disqualifiedCallList.forEach((element: any) => {
        this.allData.push(element)
      });
      console.log("alldata", this.allData);
    })
    this.apiService.questionDisqualifiedCallList(id).subscribe(res => {
      console.log(res);
      let questionCallList: any = res;
      questionCallList.forEach((element: any) => {
        this.allData.push(element);
      });
      console.log("alldata", this.allData);
    })


  }

}
