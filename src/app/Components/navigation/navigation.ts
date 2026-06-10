import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Home } from '../../Pages/home/home';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, Home],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {

}
