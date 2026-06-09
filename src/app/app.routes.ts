import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home},
    { path: '**', redirectTo: '' }
];
