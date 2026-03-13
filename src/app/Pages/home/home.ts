import { Component } from '@angular/core';
import { Search } from "../../Components/search/search";
import { CurrentWeather } from '../../Components/current-weather/current-weather';
import { WeatherForecast } from '../../Models/weather.model';

@Component({
  selector: 'app-home',
  imports: [Search],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  //these properties describe the state of the Home component
  //thefacilitate data holding
  currentWeather: CurrentWeather | null = null;
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

      //add logic to fetch weather data for the submitted city
  }
}
