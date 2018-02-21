import { Injectable } from '@angular/core';
import { Measure} from '../../model/measure.model';

import { MEASURES} from './mock-measures';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MeasureService {

  constructor() { }

  getMeasures(): Observable<Measure[]> {
    return of(MEASURES);
  }

}
