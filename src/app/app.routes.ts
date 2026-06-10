import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Welcome } from './Pages/welcome/welcome';
import { Search } from './Components/search/search';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'welcome', component: Welcome},
    { path: 'search', component: Search},
    { path: '**', redirectTo: '' }
];
