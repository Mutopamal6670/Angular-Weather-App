import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith } from 'rxjs';


@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {

  private breakPointObserver = inject(BreakpointObserver);
  isMobile = toSignal(
    this.breakPointObserver.observe(Breakpoints.HandsetPortrait).pipe(map(result => result.matches), startWith(false))
  )

  isMobileLandscape = toSignal(
    this.breakPointObserver.observe(Breakpoints.HandsetLandscape).pipe(map(result => result.matches), startWith(false))
  )
}