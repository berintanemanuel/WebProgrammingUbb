import { Routes } from '@angular/router';
import { AddAuthorComponent } from './components/add-author/add-author';
import { HomeComponent } from './components/home-component/home-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'add-author', component: AddAuthorComponent},
];
