import {Component} from '@angular/core';
import {DataService} from './services/data.service';
// @ts-ignore
import Config from '../assets/config.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private data: DataService) {
        data.config = Config;
        console.log('config: ', data.config);
    }
}
