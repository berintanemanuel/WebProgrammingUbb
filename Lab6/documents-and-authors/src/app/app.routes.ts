import { Routes } from '@angular/router';
import { AddAuthorComponent } from './components/add-author/add-author';
import { HomeComponent } from './components/home-component/home-component';
import { ListAuthorsComponent } from './components/list-authors-component/list-authors-component';
import { AddDocumentComponent } from './components/add-document-component/add-document-component';
import { ListDocumentsComponent } from './components/list-documents-component/list-documents-component';
import { EditDocumentComponent } from './components/edit-document-component/edit-document-component';
import { LoginComponent } from './components/login-component/login-component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'add-author', component: AddAuthorComponent},
  {path: 'list-authors-component', component: ListAuthorsComponent},
  {path: 'add-document-component/:authorId', component: AddDocumentComponent},
  {path: 'list-documents-component', component: ListDocumentsComponent},
  {path: 'edit-document-component/:documentId', component: EditDocumentComponent},
  {path: 'login', component: LoginComponent}
];
