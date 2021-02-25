import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CallListComponent } from './call-list/call-list.component';
import { CallStatisticsComponent } from './call-statistics/call-statistics.component';
import { HomeComponent } from './home/home.component';
import { HomeSidebarComponent } from './home/home-sidebar/home-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TabComponent } from './tab/tab.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { ReportTabComponent } from './call-statistics/report-tab/report-tab.component';
import { ReversePipe } from './pipe/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CallListComponent,
    CallStatisticsComponent,
    HomeComponent,
    HomeSidebarComponent,
    TabComponent,
    DeleteConfirmationComponent,
    ReportTabComponent,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    DeleteConfirmationComponent
  ],
  entryComponents: [DeleteConfirmationComponent]
})
export class AppModule { }
