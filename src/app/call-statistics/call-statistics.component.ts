import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
declare var $: any;

@Component({
  selector: 'app-call-statistics',
  templateUrl: './call-statistics.component.html',
  styleUrls: ['./call-statistics.component.css']
})
export class CallStatisticsComponent implements OnInit {

  mini: boolean = true;
  // phraseDetails: any = [];
  // phrasedisqualified: any = [];
  // questionDetails: any = [];
  // questiondisqualified: any = [];
  phrase_report: any = [];
  question_report: any = [];
  disqualifiedCallList: any;
  performanceReport: any;
  totalCalls: any;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.toggleSidebar();

    this.apiService.performanceReport().subscribe(res => {
      console.log(" performance Report", res);
      this.performanceReport = res;

      for (let key in res.phrase_report) {
        let obj = {
          key: key,
          failed: res.phrase_report[key].failed,
          passed: res.phrase_report[key].passed
        }

        this.phrase_report.push(obj);
      }
      console.log(this.phrase_report)

      for (let key in res.question_report) {
        let obj = {
          key: key,
          failed: res.question_report[key].failed,
          passed: res.question_report[key].passed
        }

        this.question_report.push(obj);
      }
      console.log(this.question_report)

      
      if (res) {

        this.totalCalls = this.performanceReport.varified_calls + this.performanceReport.verification_failed_calls;
        console.log(this.totalCalls);



      }

    })

    // this.apiService.getPhrases().subscribe(res => {

    //   res.forEach(element => {
    //     this.apiService.phraseQualifiedCallList(element.id).subscribe(res => {
    //       // console.log("res from phrase", res);
    //       this.disqualifiedCallList = res;
    //       res.forEach(each => {
    //         this.phraseDetails.push(each)
    //       });
    //     })
    //   });

    //   res.forEach(element => {
    //     this.apiService.disqualifiedCallList(element.id).subscribe(res => {
    //       // console.log("res from phrase", res);
    //       this.disqualifiedCallList = res;
    //       res.forEach(each => {
    //         this.phrasedisqualified.push(each)
    //       });
    //     })
    //   });
    // })

    // // questioner api calling

    // this.apiService.getQuestions().subscribe(res => {
    //   res.forEach(element => {
    //     this.apiService.questionQualifiedCallList(element.id).subscribe(res => {
    //       res.forEach(each => {
    //         this.questionDetails.push(each)
    //       });
    //     })
    //   });

    //   res.forEach(element => {
    //     this.apiService.questionDisqualifiedCallList(element.id).subscribe(res => {
    //       res.forEach(each => {
    //         this.questiondisqualified.push(each)
    //       });
    //     })
    //   });



    // console.log("res from phraseDetails", this.phraseDetails);
    // console.log("res from phrasedisqualified", this.phrasedisqualified);
    // console.log("res from questionDetails", this.questionDetails);
    // console.log("res from questiondisqualified", this.questiondisqualified);


    // })

  }

  toggleSidebar() {
    if (this.mini) {
      //console.log("opening sidebar");
      (<HTMLSelectElement>document.getElementById('nav_sidebar')).style.width = "240px";
      (<HTMLSelectElement>document.getElementById("main")).style.marginLeft = "240px";
      this.mini = false;
    } else {
      //console.log("closing sidebar");
      (<HTMLSelectElement>document.getElementById("nav_sidebar")).style.width = "58px";
      (<HTMLSelectElement>document.getElementById("main")).style.marginLeft = "58px";
      this.mini = true;
    }
  }


  

}
