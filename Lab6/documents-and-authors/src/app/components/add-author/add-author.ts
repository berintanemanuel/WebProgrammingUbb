import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-add-author',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-author.html',
})
export class AddAuthorComponent {
  authorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private authorService: AuthorService,
    private router: Router
  ){}

  onSubmit(){
    if(this.authorForm.valid){
      this.authorService.addAuthor(this.authorForm.value).subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
          error: (err) => console.error(err)
      });
    } else{
      this.authorForm.markAllAsTouched();
      return;
    }
  }
}
