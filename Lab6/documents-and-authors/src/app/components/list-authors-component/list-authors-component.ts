import { Component } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-authors-component',
  imports: [],
  templateUrl: './list-authors-component.html',
  styleUrl: './list-authors-component.css',
})

export class ListAuthorsComponent {
  authors = [];

  constructor(
    private authorService: AuthorService,
    private router: Router
  ){}

  ngOnInit(){
    this.authorService.getAllAuthors().subscribe({
      next: (response) => {
        console.log(response);
      }
    });

  }
}
