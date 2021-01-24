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
  phraseData: any;
  showMainContent: boolean = false;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.toggleSidebar();

    this.apiService.performanceReport().subscribe(res => {
      console.log(" performance Report", res);
      this.performanceReport = res;

      for (let key in this.performanceReport.phrase_report) {
        let obj = {
          key: key,
          failed: this.performanceReport.phrase_report[key].failed,
          passed: this.performanceReport.phrase_report[key].passed
        }

        this.phrase_report.push(obj);
      }
      console.log(this.phrase_report)

      for (let key in this.performanceReport.question_report) {
        let obj = {
          key: key,
          failed: this.performanceReport.question_report[key].failed,
          passed: this.performanceReport.question_report[key].passed
        }

        this.question_report.push(obj);
      }
      console.log(this.question_report)


      if (res) {

        this.totalCalls = this.performanceReport.varified_calls + this.performanceReport.verification_failed_calls;
        console.log(this.totalCalls);



      }

    })


  }

  navigate(category: any) {
    console.log(category);

    let questionData: any[] = [];
    if (category) {
      this.apiService.getPhrases().subscribe(res => {
        console.log("res", res);
        let phrases: any = res
        phrases.forEach((each: any) => {
          if (each.category === category) {
               questionData.push(each)
          }
        })
        console.log("phrase", questionData);
        if(questionData && questionData.length){
          this.router.navigate(['/call-list'], {queryParams: {category: category, id: questionData[0].id}})
        }
      })

      this.apiService.getQuestions().subscribe(res => {
        // console.log("question", res);
        let questions: any = res
        questions.map((each: any) => {
          each.subject.forEach((element: any) => {
            if (element == category) {
              questionData.push(each);
            }
          });
        })
        console.log("questions", questionData);
        if(questionData && questionData.length){
          this.router.navigate(['/call-list'], {queryParams: {category: category, id: questionData[0].id}})
        }
      })
      
    }


    // console.log(questionData[0].id);
    
  }


   showToggle(toggle){
     this.showMainContent = toggle
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
