import { Component, Input } from '@angular/core';
import { HourlyForecastModel } from '../../Models/weather.model';

@Component({
  selector: 'app-hourly-forecast',
  imports: [],
  templateUrl: './hourly-forecast.html',
  styleUrl: './hourly-forecast.css',
})
export class HourlyForecast {

  @Input() hourlyForecast?: HourlyForecastModel[] | null = null;
}
