import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mini:boolean = true;
  currentRoute: any;
  // selectedItem: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  // mainNavClick(event, newValue) {
  //   console.log(newValue);
  //   this.selectedItem = newValue;  // don't forget to update the model here
  //   // ... do other stuff here ...
  // }

  ngOnInit(): void {
    console.log(this.router.url);
    this.currentRoute = this.router.url;
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
