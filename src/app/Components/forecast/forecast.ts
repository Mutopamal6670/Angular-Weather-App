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
  

  isToday(date: string) : boolean {
    const today = new Date(); //to store the current date
    const forecastDate = new Date(date);

    return (
      today.getFullYear === forecastDate.getFullYear &&
      today.getMonth === forecastDate.getMonth &&
      today.getDate === forecastDate.getDate
    )
  }
}
