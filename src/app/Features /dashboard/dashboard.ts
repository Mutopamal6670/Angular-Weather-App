import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrentWeatherModel, HourlyForecastModel, WeatherForecast } from '../../Shared/Models/weather.model';
import { CurrentWeather } from '../../Shared/Components/current-weather/current-weather';
import { Search } from '../../Shared/Components/search/search';
import { WeeklyForecast } from '../../Shared/Components/weekly-forecast/weekly-forecast';
import { HourlyForecast } from '../../Shared/Components/hourly-forecast/hourly-forecast';
import { map, startWith } from 'rxjs';
import { WeatherService } from '../../Core/Services/weather-service';

@Component({
  selector: 'app-dashboard',
  imports: [Search, CurrentWeather, WeeklyForecast, HourlyForecast],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private breakPointObserver = inject(BreakpointObserver);
  isMobile = toSignal(
    this.breakPointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape]).pipe(map(result => result.matches), startWith(false))
  );

  isTablet = toSignal(
    this.breakPointObserver.observe([Breakpoints.Tablet, Breakpoints.TabletPortrait]).pipe(map(result => result.matches), startWith(false))
  )

  private readonly weatherService = inject(WeatherService);

  //these properties describe the state of the Home component
  //they facilitate data holding
  currentWeather: CurrentWeatherModel | null = null;
  forecast: WeatherForecast | null = null;
  hourlyForecast: HourlyForecastModel[] | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  resetWeatherData() : void {
    this.currentWeather = null;
    this.forecast = null;
    this.hourlyForecast = null;
    this.errorMessage = '';
  }


  searchedCity(city: string) : void {
    console.log(city);    //delete at the end of the project
  
    this.resetWeatherData();
    this.loading = true;

    this.weatherService.getWeather(city).subscribe({
      next: data => {
        console.log("The returned data is: ");
        console.log(data);  //for debugging
        this.currentWeather = data.current;
        this.forecast = data.forecast;
        this.hourlyForecast =data.hourlyForecast;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
      
  }
}
