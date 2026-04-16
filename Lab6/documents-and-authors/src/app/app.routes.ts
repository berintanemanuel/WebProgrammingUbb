import { Routes } from '@angular/router';
import { AddAuthorComponent } from './components/add-author/add-author';
import { HomeComponent } from './components/home-component/home-component';
import { ListAuthorsComponent } from './components/list-authors-component/list-authors-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'add-author', component: AddAuthorComponent},
  {path: 'list-authors-component', component: ListAuthorsComponent}
];
