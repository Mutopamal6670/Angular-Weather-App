import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeatherForecast } from '../../Models/weather.model';

@Component({
  selector: 'app-weekly-forecast',
  imports: [DatePipe],
  templateUrl: './weekly-forecast.html',
  styleUrl: './weekly-forecast.css',
})
export class WeeklyForecast {
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

