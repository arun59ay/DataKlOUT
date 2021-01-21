import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {
  @Output() selectedTab = new EventEmitter();
  tabSelected: any = 'firstTab';

  constructor() { }

  ngOnInit(): void {
  }

  onClick(tab){
    this.tabSelected = tab;
    this.selectedTab.emit(tab);
  }

}
