import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [DatePipe],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  currentTime: Date = new Date();
  userTimeZone: string = '';
  userCity: string = '';
    
  private clockSubscription!: Subscription;
    
  ngOnInit(): void {
     //1. Get user's explicit timezone from the browser
    this.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    //Clean up thee string to show just the city name
    this.userCity = this.userTimeZone.split('/').pop()?.replace('_', ' ') || 'Your City';
    
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
