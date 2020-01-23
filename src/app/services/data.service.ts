import {Injectable} from '@angular/core';
import {Config} from '../data/Config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public config: Config;

  constructor() {

  }
}
