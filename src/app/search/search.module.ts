import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareApiModule } from '../services/share-api.module';
import { SearchComponent } from './search/search.component';




const routes: Routes = [
  {path: '', component:SearchComponent,
  // children: [
  //   {path: '', redirectTo: 'info'},
  //   {path: 'info', component: somecomponent},
  // ]
}
]

@NgModule({
  declarations: [
    SearchComponent,
],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareApiModule
  ],
  exports: [
    RouterModule,
  ]
})
export class SearchModule { }
