import { Component, OnInit } from '@angular/core';
import { MeasureService} from './measure.service';
import {Measure} from '../../model/measure.model';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent implements OnInit {

  measures: Measure[];

  constructor(private measureServices: MeasureService) { }

  ngOnInit() {
    this.getMeasures();
  }

  getMeasures(): void {
    this.measureServices.getMeasures()
      .subscribe(measures => this.measures = measures);
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

}
