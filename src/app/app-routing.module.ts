import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CallListComponent } from './call-list/call-list.component';
import { CallStatisticsComponent } from './call-statistics/call-statistics.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'call-list', component: CallListComponent},
  {path: 'call-statistics', component: CallStatisticsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
