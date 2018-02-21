import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MeasureComponent } from './measure/measure.component';
import { PlantComponent } from './greenhouse/plant/plant.component';
import { MeasureService } from './measure/measure.service';
import { GreenhouseComponent } from './greenhouse/greenhouse.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    MeasureComponent,
    PlantComponent,
    GreenhouseComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MeasureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
