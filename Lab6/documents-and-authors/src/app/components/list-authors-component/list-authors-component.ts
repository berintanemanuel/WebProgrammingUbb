import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

export interface Author {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-list-authors-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-authors-component.html',
  styleUrl: './list-authors-component.css',
  standalone: true,
})

export class ListAuthorsComponent {
  authors: Author[] = [];

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.authorService.getAllAuthors().subscribe({
      next: (response: Author[]) => {
        this.authors = response;
        console.log(this.authors);
        this.cdr.detectChanges();
      },
      error: (err) => {console.error(err);}
    });

  }
}
