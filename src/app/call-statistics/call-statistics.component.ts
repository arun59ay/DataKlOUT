import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-call-statistics',
  templateUrl: './call-statistics.component.html',
  styleUrls: ['./call-statistics.component.css']
})
export class CallStatisticsComponent implements OnInit {

  mini:boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.toggleSidebar();
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
