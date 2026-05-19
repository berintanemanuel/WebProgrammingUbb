import { Routes } from '@angular/router';
import { AddAuthorComponent } from './components/add-author/add-author';
import { HomeComponent } from './components/home-component/home-component';
import { ListAuthorsComponent } from './components/list-authors-component/list-authors-component';
import { AddDocumentComponent } from './components/add-document-component/add-document-component';
import { ListDocumentsComponent } from './components/list-documents-component/list-documents-component';
import { EditDocumentComponent } from './components/edit-document-component/edit-document-component';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './guards/auth-guard';
import { RegisterComponent } from './components/register-component/register-component';
export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  {path: 'add-author', component: AddAuthorComponent, canActivate: [authGuard]},
  {path: 'list-authors-component', component: ListAuthorsComponent, canActivate: [authGuard]},
  {path: 'add-document-component/:authorId', component: AddDocumentComponent, canActivate: [authGuard]},
  {path: 'list-documents-component', component: ListDocumentsComponent, canActivate: [authGuard]},
  {path: 'edit-document-component/:documentId', component: EditDocumentComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
