import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Search } from './Components/search/search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'weather-app';
}
