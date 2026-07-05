import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';


@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private breakPointObserver = inject(BreakpointObserver);
  isMobile = toSignal(
    this.breakPointObserver.observe(Breakpoints.HandsetPortrait).pipe(map(result => result.matches), startWith(false))
  );

  isMobiPortrait = toSignal(
    this.breakPointObserver.observe(Breakpoints.HandsetLandscape).pipe(map(result => result.matches), startWith(false))
  );

  isTablet = toSignal(
    this.breakPointObserver.observe([Breakpoints.Tablet, Breakpoints.TabletPortrait]).pipe(map(result => result.matches), startWith(false))
  )
}