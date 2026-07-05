import { Component, inject, Input } from '@angular/core';
import { HourlyForecastModel } from '../../Models/weather.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-hourly-forecast',
  imports: [],
  templateUrl: './hourly-forecast.html',
  styleUrl: './hourly-forecast.css',
})
export class HourlyForecast {

  @Input() hourlyForecast?: HourlyForecastModel[] | null = null;

  private breakPointObserver = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakPointObserver.observe(Breakpoints.HandsetPortrait).pipe(map(result => result.matches), startWith(false))
  )

}