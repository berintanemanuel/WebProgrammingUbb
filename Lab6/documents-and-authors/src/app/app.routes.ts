import { Routes } from '@angular/router';
import { AddAuthorComponent } from './components/add-author/add-author';
import { HomeComponent } from './components/home-component/home-component';
import { ListAuthorsComponent } from './components/list-authors-component/list-authors-component';
import { AddDocumentComponent } from './components/add-document-component/add-document-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'add-author', component: AddAuthorComponent},
  {path: 'list-authors-component', component: ListAuthorsComponent},
  {path: 'add-document-component/:authorId', component: AddDocumentComponent}
];
