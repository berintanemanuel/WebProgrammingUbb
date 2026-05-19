import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  onLogOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
