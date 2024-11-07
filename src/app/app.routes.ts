import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./old-state-example.component').then(m => m.OldStateComponent);
    },
  },
  {
    path: 'new',
    loadComponent() {
      return import('./new-state-example.component').then(m => m.NewStateComponent);
    },
  }, 
];
