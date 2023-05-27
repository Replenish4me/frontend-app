import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
  ) {}

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToReaders() {
    this.router.navigate(['/readers']);
  }

  navigateToPreferences() {
    this.router.navigate(['/preferences']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
