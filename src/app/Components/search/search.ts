import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private readonly form_build = inject(FormBuilder);

  readonly userForm = this.form_build.group({
    city_name: this.form_build.control('', [Validators.required])
  });

  search(): void {
    console.log(this.userForm.value);

    //Add the logic of how you are going to handle the user input to display the waether forecast of the given city
  }
}
