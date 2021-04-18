import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportsPipe } from './airports.pipe';


@NgModule({
  declarations: [AirportsPipe],
  imports: [
    CommonModule
  ],
  exports: [AirportsPipe]
})
export class PipesModule { }
