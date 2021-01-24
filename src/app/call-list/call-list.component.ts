import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      let category: any = res.category;
      let id: any = res.id;
      console.log("category", category);
      console.log("id", id);
      this.filterData(id);
    })
  }


  // categoryApiCall(category: any) {
  //   let questionData: any[] = [];
  //   this.apiService.getPhrases().subscribe(res => {
  //     let phrases: any = res
  //     this.phraseData = phrases.filter((each: any) => {
  //       return each.catagory == category;
  //     })
  //     console.log("phrase", this.phraseData);
      
  //   })

  //   this.apiService.getQuestions().subscribe(res => {
  //     let questions: any = res
  //     questions.map((each: any) => {
  //       each.subject.forEach((element: any) => {
  //         if (element == category) {
  //           questionData.push(each);
  //         }
  //       });
  //     })
  //     if (questionData && questionData.length) {
  //       this.filterData(questionData);
  //     }
  //     console.log("quest", questionData);
  //   })
  // }



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
