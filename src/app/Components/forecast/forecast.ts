import { Component, Input } from '@angular/core';
import { WeatherForecast } from '../../Models/weather.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forecast',
  imports: [DatePipe],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css',
})
export class Forecast {
  @Input() forecast? : WeatherForecast | null = null;

}
