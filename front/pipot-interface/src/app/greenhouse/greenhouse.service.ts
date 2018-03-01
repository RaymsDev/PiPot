import { Injectable } from '@angular/core';
import { Greenhouse} from '../../model/greenhouse.model';
import { GREENHOUSE} from './mock_greenhouse';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GreenhouseService {

  constructor() { }

  getGrennHouse(): Observable<Greenhouse[]> {
    return of(GREENHOUSE);
  }

  addGreenHouse( greenhouse: Greenhouse): Observable<Greenhouse> {
    /*return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      )*/
    return of(greenhouse);
  }

  deleteGreenHouse(name: string): Observable<{}> {
    /*
    deleteHero (id: number): Observable<{}> {
  const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError('deleteHero'))
    );
}
    */
    return of(200);

  }
}
