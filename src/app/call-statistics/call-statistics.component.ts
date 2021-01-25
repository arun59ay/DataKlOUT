import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Chart } from 'chart.js';
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
  verificationType: any = 'verification failed';
  PieChart = [];
  chartDataLabel: any[] = [];
  chartDataNumber: any[] = [];

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

      if (res) {
        this.totalCalls = this.performanceReport.varified_calls + this.performanceReport.verification_failed_calls;
        console.log(this.totalCalls);
      }
      this.chartFilterData();
    })

  }



  showToggle(toggle: any, name: any) {
    console.log(name);
    

    this.showMainContent = toggle;
    this.verificationType = name;
    console.log("verificationType*******", this.verificationType);
    this.chartFilterData();
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
        if (questionData && questionData.length) {
          this.router.navigate(['/call-list'], { queryParams: { category: category, id: questionData[0].id, verificationType: this.verificationType } })
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
        if (questionData && questionData.length) {
          this.router.navigate(['/call-list'], { queryParams: { category: category, id: questionData[0].id, verificationType: this.verificationType } })
        }
      })

    }


    // console.log(questionData[0].id);

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

  chart() {
    console.log(this.performanceReport);

    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.chartDataLabel,
        datasets: [{
          label: 'data first',
          data: this.chartDataNumber,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Bar Chart',
          display: false,
        },

        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }



  chartFilterData() {

    console.log("this is verification +++>", this.verificationType);


    if (this.verificationType === 'verification failed') {
      this.chartDataLabel = [];
      this.chartDataNumber = [];

      if (this.phrase_report && this.phrase_report.length) {
        this.phrase_report.map((element: any) => {
          if (element.failed > 0) {
            this.chartDataLabel.push(element.key)
            this.chartDataNumber.push(element.failed)
          }
        });
      }

      if (this.question_report && this.question_report.length) {
        this.question_report.map((element: any) => {
          if (element.failed > 0) {
            this.chartDataLabel.push(element.key)
            this.chartDataNumber.push(element.failed)
          }
        });
      }

    } else if (this.verificationType === 'verification passed') {
      this.chartDataLabel = [];
      this.chartDataNumber = [];
      if (this.phrase_report && this.phrase_report.length) {
        this.phrase_report.map((element: any) => {
          if (element.passed > 0) {
            this.chartDataLabel.push(element.key)
            this.chartDataNumber.push(element.passed)
          }
        });
      }

      if (this.question_report && this.question_report.length) {
        this.question_report.map((element: any) => {
          if (element.passed > 0) {
            this.chartDataLabel.push(element.key)
            this.chartDataNumber.push(element.passed)
          }
        });
      }

    }
    this.chart();
  }



}
