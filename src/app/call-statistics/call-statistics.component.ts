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
  showScript: boolean = false;
  productTable: boolean = false;
  reportTable: boolean = false;
  phrase_report: any = [];
  question_report: any = [];
  disqualifiedCallList: any;
  performanceReport: any;
  totalCalls: any;
  phraseData: any;
  showMainContent: boolean = false;
  verificationType: any = 'verification failed';
  PieChart: any;
  chartDataLabel: any[] = [];
  chartDataNumber: any[] = [];
  question_report_list: any = [];
  colors: any = [];
  productWiseReport: any;
  projectWiseData: any[] = [];
  srciptReport: any;
  report: any;
  selectedItem: any;
  chartData: any[] = [];
  chartDataProductLabel: any[] = [];
  chartDataProductNumber: any[] = [];
  productWiseReportTableData: any;
  reportData: any[] = [];
  heading: string[];
  productName: any;


  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.toggleSidebar();

    this.apiService.performanceReport().subscribe(res => {
      // console.log(" performance Report", res);
      this.performanceReport = res;
      this.question_report_list = this.performanceReport.question_report;

      for (let key in this.performanceReport.phrase_report) {
        let obj = {
          key: key,
          failed: this.performanceReport.phrase_report[key].failed,
          passed: this.performanceReport.phrase_report[key].passed
        }

        this.phrase_report.push(obj);
      }


      this.performanceReport.question_report.forEach(element => {

        element.subject_analysis.map(each => {

          each.product = element.product;
          this.question_report.push(each)

        })

      });


      if (res) {
        this.totalCalls = this.performanceReport.varified_calls + this.performanceReport.verification_failed_calls;
      }
      this.chartFilterData();
    })

    this.getProductReport();

    this.getScriptReport();

  }



  showToggle(toggle: any, name: any) {
    this.showMainContent = toggle;
    this.verificationType = name;
    this.chartFilterData();
  }

  navigate(product: any, category: any) {
    // console.log(product, category);

    let questionData: any[] = [];
    if (category || product) {
      this.apiService.getPhrases().subscribe(res => {
        // console.log("res", res);
        let phrases: any = res
        phrases.forEach((each: any) => {
          if (each.category === product) {
            questionData.push(each)
          }
        })
        // console.log("phrase", questionData);
        if (questionData && questionData.length) {
          this.router.navigate(['/call-list'], { queryParams: { product: questionData[0].product, category: product, id: questionData[0].id, verificationType: this.verificationType } })
        }
      })
      if (category || product) {
        this.apiService.getQuestions().subscribe(res => {
          // console.log("question########3333", res);
          let questions: any = res
          questions.map((each: any) => {
            // console.log("question$$$$$$$", each);
            each.subject.forEach((element: any) => {
              if (each.product == product && element.split('/')[0] == category) {
                questionData.push(each);
              }
            });
          })
          // console.log("questions", questionData);
          if (questionData && questionData.length) {
            this.router.navigate(['/call-list'], { queryParams: { product: questionData[0].product, category: category, id: questionData[0].id, verificationType: this.verificationType } })
          }
        })
      }
    }

  }


  toggleSidebar() {
    if (this.mini) {
      (<HTMLSelectElement>document.getElementById('nav_sidebar')).style.width = "240px";
      (<HTMLSelectElement>document.getElementById("main")).style.marginLeft = "240px";
      this.mini = false;
    } else {
      (<HTMLSelectElement>document.getElementById("nav_sidebar")).style.width = "58px";
      (<HTMLSelectElement>document.getElementById("main")).style.marginLeft = "58px";
      this.mini = true;
    }
  }

  chart() {
    console.log(this.performanceReport);
    // for (let i = 0; i < this.chartDataLabel.length; i++) {
    //   this.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    // }

    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.chartDataProductLabel,
        datasets: [{
          label: 'data first',
          data: this.chartDataProductNumber,
          // backgroundColor: this.colors,
          // borderColor: this.colors,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(473, 182, 68, 0.2)',
            'rgba(482, 498, 14, 0.2)',
            'rgba(218, 123, 56, 0.2)',
            'rgba(298, 812, 28, 0.2)',
            'rgba(38, 392, 387, 0.2)',
            'rgba(312, 38, 392, 0.2)',
            'rgba(384, 159, 64, 0.2)',
            'rgba(30, 472, 83, 0.2)',
            'rgba(23, 626, 211, 0.2)',
            'rgba(91, 382, 323, 0.2)',
            'rgba(73, 958, 423, 0.2)',
            'rgba(594, 37, 12, 0.2)',
            'rgba(928, 75, 45, 0.2)',
            'rgba(047, 362, 74, 0.2)',
            'rgba(839, 85, 942, 0.2)',
            'rgba(838, 29, 643, 0.2)',
            'rgba(929, 293, 502, 0.2)',
            'rgba(949, 012, 731, 0.2)',
            'rgba(203, 934, 348, 0.2)',
            'rgba(203, 208, 348, 0.2)',
            'rgba(746, 292, 84, 0.2)',
            'rgba(398, 391, 14, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(473, 182, 68, 1)',
            'rgba(482, 498, 14, 1)',
            'rgba(218, 123, 56, 1)',
            'rgba(298, 812, 28, 1)',
            'rgba(38, 392, 387, 1)',
            'rgba(312, 38, 392, 1)',
            'rgba(384, 159, 64, 1)',
            'rgba(30, 472, 83, 1)',
            'rgba(23, 626, 211, 1)',
            'rgba(91, 382, 323, 1)',
            'rgba(73, 958, 423, 1)',
            'rgba(594, 37, 12, 1)',
            'rgba(928, 75, 45, 1)',
            'rgba(047, 362, 74, 1)',
            'rgba(839, 85, 942, 1)',
            'rgba(838, 29, 643, 1)',
            'rgba(929, 293, 502, 1)',
            'rgba(949, 012, 731, 1)',
            'rgba(203, 934, 348, 1)',
            'rgba(203, 208, 348, 1)',
            'rgba(746, 292, 84, 1)',
            'rgba(398, 391, 14, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          position: 'right',
          labels: {
            fontSize: 30,
          },
        },
        hover: {
          mode: 'label',
          onHover: function (e, el) {
            $("#pieChart").css("cursor", el[0] ? "pointer" : "default");
          }
        },
        title: {
          text: 'Bar Chart',
          display: false,
          // titleFontSize: 50,
        },
        tooltips: {
          titleFontSize: 30,
          bodyFontSize: 30,
          mode: 'label',
        },
      }
    })
  }

  chartFilterData() {
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
            this.chartDataLabel.push(element.product + ' - ' + element.subject)
            this.chartDataNumber.push(element.failed)
          }
        });
      }
      console.log("this is question ********", this.question_report);

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
            this.chartDataLabel.push(element.product + ' - ' + element.subject)
            this.chartDataNumber.push(element.passed)
          }
        });
      }

    }
    this.chart();
    // console.log("this is question ********", this.chartDataLabel, "/&&&&&&&&", this.chartDataNumber);
  }

  verificationPassed(verificationType) {
    this.router.navigate(['/call-list'], { queryParams: { type: 'separate', verificationType: verificationType } })
  }

  getProductReport() {
    this.apiService.getProductWiseReport().subscribe(res => {
      this.productWiseReport = res;
      this.productWiseReport.forEach(element => {
        if(element.failed > 0){
          this.chartDataProductLabel.push(element.product)
          this.chartDataProductNumber.push(element.failed)
        }
      });

    })
  }

  getScriptReport() {
    this.apiService.getScriptReport().subscribe(res => {
      this.srciptReport = res;
      this.chartDataProductLabel.push('Calling Script')
      this.chartDataProductNumber.push(this.srciptReport.failed)
      this.report = this.srciptReport.analysis;
      console.log("this is report data", this.report);
      this.heading = Object.keys(this.report[0].check_point_performance);

      this.heading.forEach( each => {
        let obj = {
          keys: each
        }
        this.reportData.push(obj)
      });
    })
  }


  openScript(item, productName) {
    this.productWiseReportTableData = item.calls;
    this.productName = productName;
    console.log("this is active tab", this.productName);
    
  }



  calling(itemName, itemValue) {

    if (itemName == 'product') {
      this.productName = '';
      this.productTable = !this.productTable;
      this.reportTable = false;
    } else if (itemName == 'report') {
      // this.productName = '';
      this.reportTable = true;
      this.productTable = false;
    }
  }

}
