import { Component, inject } from '@angular/core';
import { Search } from "../../Components/search/search";
import { CurrentWeather } from '../../Components/current-weather/current-weather';
import { CurrentWeatherModel, WeatherForecast } from '../../Models/weather.model';
import { WeatherService } from '../../Services/weather-service';
import { Forecast } from "../../Components/forecast/forecast";

@Component({
  selector: 'app-home',
  imports: [Search, CurrentWeather, Forecast],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private readonly weatherService = inject(WeatherService);

  //these properties describe the state of the Home component
  //they facilitate data holding
  currentWeather: CurrentWeatherModel | null = null;
  forecast: WeatherForecast | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  resetWeatherData() : void {
    this.currentWeather = null;
    this.forecast = null;
    this.errorMessage = '';
  }


  searchedCity(city: string) : void {
    console.log(city);    //delete at the end of the project
  
    this.resetWeatherData();
    this.loading = true;

    this.weatherService.getWeather(city).subscribe({
      next: data => {
        this.currentWeather = data.current;
        this.forecast = data.forecast;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
      //add logic to fetch weather data for the submitted city
  }
}






//Next task 
/**
 * Work on the current-weather component
 * Work on the forecast component
 * resole any problems in the home component
 * deal with event listening
 * 
 */