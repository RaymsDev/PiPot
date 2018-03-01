import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule} from 'angular2-materialize';

import { AppComponent } from './app.component';
import { MeasureComponent } from './measure/measure.component';
import { PlantComponent } from './plant/plant.component';
import { MeasureService } from './measure/measure.service';
import { GreenhouseComponent } from './greenhouse/greenhouse.component';
import { GreenhouseService} from './greenhouse/greenhouse.service';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import {PlantService} from './plant/plant.service';
import { PlantEditComponent } from './plant/plant-edit/plant-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasureComponent,
    PlantComponent,
    GreenhouseComponent,
    HeaderComponent,
    PlantEditComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AppRoutingModule
  ],
  providers: [
    MeasureService,
    GreenhouseService,
    PlantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
