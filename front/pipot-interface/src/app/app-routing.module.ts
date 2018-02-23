import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MeasureComponent} from './measure/measure.component';

const routes: Routes = [
  { path: 'measures', component: MeasureComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRoutingModule {}
