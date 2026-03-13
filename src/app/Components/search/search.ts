import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

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
