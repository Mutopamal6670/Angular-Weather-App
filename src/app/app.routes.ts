import { Routes } from '@angular/router';
import { Landing } from './Features /landing/landing';
import { Dashboard } from './Features /dashboard/dashboard';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'dashboard', component: Dashboard},
    { path: '**', redirectTo: '' }
];
