import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { GreenhouseService} from './greenhouse.service';
import {Greenhouse} from '../../model/greenhouse.model';
import {toast} from 'angular2-materialize';
import {PLANT} from '../plant/mock-plant';

@Component({
  selector: 'app-greenhouse',
  templateUrl: './greenhouse.component.html',
  styleUrls: ['./greenhouse.component.css']
})
export class GreenhouseComponent implements OnInit {

  greenhouses: Greenhouse[];
  green_to_send: Greenhouse = {device: '2442D3',
    position: {name: 'Toulouse', lattitude: '2345678O', longitude: '123N'},
    plant: {name: 'Geranium', waterNeed: 6, lightNeed: 3, temperatureNeed: '16', moistureNeed: 47}
  };
  @Output() subMenuGreenHouse = new EventEmitter<Boolean>();

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit() {
    this.getGreenhouse();
    this.subMenuGreenHouse.emit(true);
  }

  getGreenhouse(): void {
    this.greenhouseService.getGrennHouse().subscribe( greenhouses => this.greenhouses = greenhouses);
  }

  deletePlant(plantName: string): void {
    this.greenhouseService.deleteGreenHouse(plantName).subscribe(plant => toast('La plante a bien été suprimé', 4000));
  }

  addGreenHouse( greenhouse_v: Greenhouse): void {
    this.greenhouseService.addGreenHouse( greenhouse_v).subscribe( greenhouse => toast(greenhouse.device + 'a bien été ajouté', 4000));
  }
}
