import { Component, inject, Input } from '@angular/core';
import { CurrentWeatherModel } from '../../Models/weather.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-current-weather',
  imports: [],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.css',
})
export class CurrentWeather {
  @Input() weather? : CurrentWeatherModel | null = null;

  private breakPointsObserver = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakPointsObserver.observe(Breakpoints.HandsetPortrait).pipe(map(result => result.matches), startWith(false))
  );

}