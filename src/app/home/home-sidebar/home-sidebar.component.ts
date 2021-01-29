import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {
  @Output() selectedTab = new EventEmitter();
  @Output() selectedTabAduit = new EventEmitter();
  tabSelected: any = 'firstTab';
  tabSelect: any = 'Primary Consumable Insights';

  constructor() { }

  ngOnInit(): void {
  }

  onClick(tab, selectedAudit){
    this.tabSelected = tab;
    this.tabSelect = selectedAudit;
    this.selectedTab.emit(tab);
    this.selectedTabAduit.emit(selectedAudit);
  }

}
