import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

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

  private readonly form_build = inject(FormBuilder);

  @Output() readonly citySearch = new EventEmitter<string>();

  readonly userForm = this.form_build.group({
    city_name: this.form_build.control('', [Validators.required, Validators.minLength(2)])
  });

  search(): void {
    console.log(this.userForm.value);

    //Add the logic of how you are going to handle the user input to display the waether forecast of the given city
    if(this.userForm.invalid) return;

    const city = this.userForm.controls.city_name.value;

    console.log(city);  //remove after project completion

    if(city) {
      this.citySearch.emit(city);
    }
  }
}
