import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule} from 'angular2-materialize';

import { AppComponent } from './app.component';
import { MeasureComponent } from './measure/measure.component';
import { PlantComponent } from './greenhouse/plant/plant.component';
import { MeasureService } from './measure/measure.service';
import { GreenhouseComponent } from './greenhouse/greenhouse.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MeasureComponent,
    PlantComponent,
    GreenhouseComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AppRoutingModule
  ],
  providers: [
    MeasureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
