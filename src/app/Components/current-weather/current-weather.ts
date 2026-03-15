import { Component, Input } from '@angular/core';
import { CurrentWeatherModel } from '../../Models/weather.model';

@Component({
  selector: 'app-current-weather',
  imports: [],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.css',
})
export class CurrentWeather {
  @Input() weather? : CurrentWeatherModel | null = null;


}
