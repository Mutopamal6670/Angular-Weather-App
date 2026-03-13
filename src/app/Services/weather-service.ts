import { inject, Injectable } from '@angular/core';
import { catchError, Observable, map, throwError, forkJoin } from 'rxjs';
import { CurrentWeather } from '../Components/current-weather/current-weather';
import { Forecast } from '../Components/forecast/forecast';
import { CurrentWeatherModel, ForecasteDay, WeatherForecast } from '../Models/weather.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private readonly http =inject(HttpClient);

  private readonly API_KEY = environment.weatherApiKey;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5'

  getWeather(city: string): Observable<{current: CurrentWeatherModel, forecast: WeatherForecast}>{
    const current$ = this.getCurrentWeather(city);
    const forecast$ = this.getForecast(city);

    //Combine current and forecast into one Observable
    return forkJoin([current$, forecast$]).pipe(
      map(([current, forecast]) => ({current, forecast})),    //combine results
      catchError(this.handleError)
    );
  }

  /**
   * 
   *Fetch current weather from API
   */

   private getCurrentWeather(city: string): Observable<CurrentWeatherModel> { 
    const url = `${this.BASE_URL}/weather?q=${city}&units=metric&appid=${this.API_KEY}`;
    
    return this.http.get<any>(url).pipe(
      map(this.transformCurrent),
      catchError(this.handleError)
    );
  }

  /**
   * Fetch 5-day forecast from API 
   */
  private getForecast(city: string) : Observable<WeatherForecast> {
    const url = `${this.BASE_URL}/forecast?q=${city}&units=metric&appid=${this.API_KEY}`;

    return this.http.get<any>(url).pipe(
      map(this.transformForecast),
      catchError(this.handleError)
    );
  }


  /**
   * Transform raw current weather JSON into CurrentWeather interface
   */
  transformCurrent(rawData: any) : CurrentWeatherModel{
    return {
      city: rawData.name,
      temperature: rawData.main.temp,
      description: rawData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${rawData.weather[0].icon}@2x.png`,
      humidity: rawData.main.humidity,
      windSpeed: rawData.wind.speed
    }
  }

  /**
   * Transform raw current weather JSON into CurrentWeather interface
   */

  transformForecast(rawData: any) :WeatherForecast {

    // OpenWeatherMap returns a list of 3-hour forecasts; we convert to one per day
    const daysMap: { [date: string]: ForecasteDay } = {};

    rawData.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0]; //YYYY-MM-DD

      if(!daysMap[date]) {
        daysMap[date] = {
          date,
          temperature: item.main.temp,
          description: item.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        };
      }
    });

    return {
      city: rawData.city.name,
      days: Object.values(daysMap)
    };
  }

  /**
  *Generic error handler
  */

  private handleError(error: HttpErrorResponse){
    let msg = 'An unknown error occurred';

    if(error.error instanceof ErrorEvent) {
      msg = `Error: ${error.error.message}`;
    }
    else if(error.status === 404) {
      msg = 'City not found';
    }

    return throwError(() => new Error(msg));
  }
}
