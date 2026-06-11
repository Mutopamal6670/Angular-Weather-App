import { Component, inject, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-welcome',
  imports: [DatePipe, RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  currentTime: Date = new Date();
  userTimeZone: string = '';
  userCity: string = '';
  userCountry: string = '';

  private clockSubscription!: Subscription;

  private breakPointObserver = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakPointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), startWith(false))
  );

  isMobLandscape = toSignal(
    this.breakPointObserver.observe(Breakpoints.HandsetLandscape).pipe(map(result => result.matches), startWith(false))
  )

   
  ngOnInit(): void {
     //1. Get user's explicit timezone from the browser
    this.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    //Clean up thee string to show just the city name
    this.userCity = this.userTimeZone.split('/').pop()?.replace('_', ' ') || 'Your City';

    this.userCountry = this.userTimeZone.split('/').pop()?.replace('_', ' ') || 'Your Country';
    
    //2. Creta a timer that ticks ever second(0 delay, 1000ms interval)
    this.clockSubscription = timer(0, 1000)
      .pipe(map(()=> new Date()))
      .subscribe(time => {
      this.currentTime = time;
    });
  }
    
      
  ngOnDestroy(): void {
    //Unsubscribe to prevent memory leaks when navigating away from the home page
    if(this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
  }

}
