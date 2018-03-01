import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MeasureComponent} from './measure/measure.component';
import { GreenhouseComponent} from './greenhouse/greenhouse.component';
import {Plant} from '../model/plant.model';
import {PlantComponent} from './plant/plant.component';

const routes: Routes = [
  { path: 'measures', component: MeasureComponent},
  { path: 'greenhouses', component: GreenhouseComponent},
  { path: 'plants', component: PlantComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRoutingModule {}
