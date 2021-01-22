import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {
  currentCategory: any;
  phraseDetails: any = [];
  phrasedisqualified: any = [];
  questionDetails: any = [];
  questiondisqualified: any = [];
  allListDataFilter: any = [];
  phraseData: any = [];
  questionData: any = [];
  allData: any = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.currentCategory = res.category;
      console.log(this.currentCategory);
    })



    this.categoryApiCall();





  }


  categoryApiCall() {
    this.apiService.getPhrases().subscribe(res => {
      console.log("prases", res);
      this.phraseData = res.filter(each => {
        return each.catagory == this.currentCategory;
      })
    })

    this.apiService.getQuestions().subscribe(res => {
      console.log("question", res);
      res.map(each => {
        each.subject.forEach(element => {
          if (element == this.currentCategory) {
            this.questionData.push(each)
          }
        });
      })
    })

    if (this.questionData) {
      this.filterData();
    }

  }



  filterData() {
    this.apiService.disqualifiedCallList(this.questionData[0].id).subscribe(res => {
      res.forEach(element => {
        this.allData.push(element)
      });
    })
    this.apiService.questionDisqualifiedCallList(this.questionData[0].id).subscribe(res => {
      // console.log("this is diqualified data for list 2", res);
      res.forEach(element => {
        this.allData.push(element)
      });
    })

  }

}
