import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-report-tab',
  templateUrl: './report-tab.component.html',
  styleUrls: ['./report-tab.component.css']
})
export class ReportTabComponent implements OnInit {
  @Input() reportData: Array<any>;
  projectData: any[] = [];
  projectDataRes: any[];
  heading: any;
  headingList: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnChanges(): void {
    console.log("this is report data", this.reportData);
  }

  ngOnInit(): void {
    this.heading = Object.keys(this.reportData[0].check_point_performance);
    // this.heading.toString();
    
    // console.log("this is report data", Object.keys(this.reportData[0].check_point_performance));
    this.heading.forEach( each => {
      let obj = {
        keys: each
      }
      this.headingList.push(obj)
    });
    
    // this.reportData.forEach( each => {
    //   let obj = {
    //     keys: Object.keys(each.check_point_performance),
    //     // agentName: each.agent,
    //     // customerName: each.customer
    //   }
    //     this.headingList.push(obj)
    // })


  }




}

