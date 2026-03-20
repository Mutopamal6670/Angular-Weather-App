import { inject, Injectable } from '@angular/core';
import { catchError, Observable, map, throwError, forkJoin } from 'rxjs';
import { CurrentWeather } from '../Components/current-weather/current-weather';
import { Forecast } from '../Components/forecast/forecast';
import { CurrentWeatherModel, ForecasteDay, HourlyForecastModel, WeatherForecast } from '../Models/weather.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private readonly http =inject(HttpClient);

  private readonly API_KEY = environment.weatherApiKey;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5'

  getWeather(city: string): Observable<{current: CurrentWeatherModel, forecast: WeatherForecast, hourlyForecast: HourlyForecastModel[]}>{
    const current$ = this.getCurrentWeather(city);
    const forecast$ = this.getForecast(city);
    const hourlyForecast$ = this.getHourlyForecast(city);

    //Combine current and forecast into one Observable
    return forkJoin([current$, forecast$, hourlyForecast$]).pipe(
      map(([current, forecast, hourlyForecast]) => ({current, forecast, hourlyForecast})),    //combine results
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
   * Fetch 3-hour interval forecast
   */
  
  
  private getHourlyForecast(city: string): Observable<HourlyForecastModel[]> {
    const url = `${this.BASE_URL}/forecast?q=${city}&units=metric&appid=${this.API_KEY}`;
    return this.http.get<any>(url).pipe(
      map(this.transformHourlyForecast),
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

  transformHourlyForecast(rawData: any) : HourlyForecastModel[] {
    const targetHours = ['06:00:00', '09:00:00', '12:00:00', '15:00:00', '18:00:00', '21:00:00']; //the hours to be extracted
    const today = new Date().toISOString().split('T')[0];

      return rawData.list.filter((item: any) => {
        const[date, time] = item.dt_txt.split(' ');
        return date === today && targetHours.includes(time);
      })
      .map((item: any): HourlyForecastModel => {
        return {
          time: item.dt_txt.split(' ')[1].slice(0, 5),
          temperature: item.main.temp,
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        };  
      });
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
