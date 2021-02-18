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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }




}

