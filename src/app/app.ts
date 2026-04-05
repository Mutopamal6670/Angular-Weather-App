import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./Components/navigation/navigation";
import { Footer } from "./Components/footer/footer";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'weather-app';
}
