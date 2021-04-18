import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MainComponent } from './main/main.component';
import { StartComponent } from './start/start.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SelectAirportsComponent } from './select-airports/select-airports.component';
import { ShareApiModule } from '../services/share-api.module';
import { PipesModule } from '../pipes/pipes.module';




const routes: Routes = [
  {path: '', component: MainComponent,
  children: [
    {path: '', redirectTo: 'start'},
    {path: 'start', component: StartComponent},
  ]},

]

@NgModule({
  declarations: [
    MainComponent,
    SelectAirportsComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FontAwesomeModule,
    ShareApiModule,
    FormsModule,
    PipesModule
  ],
  exports: [RouterModule],
})
export class MainModule { }
