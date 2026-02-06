import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'duplicate',
    loadComponent: () => import('./duplicate/duplicate.component'),
  },
];
