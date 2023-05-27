import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './auth.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "https://dev.api.replenish4me.caioruiz.com";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  login(user: Auth) {
    this.snackBar.open('Autenticando...', 'Fechar');
    const errorCallback = (err: any) => {
      this.snackBar.open('Usuário ou senha inválidos', 'Fechar');
    };

    const sucessCallback = (res: any) => {
      sessionStorage.setItem('token', res.token);
      this.router.navigate(['/cart']);
      this.snackBar.open('Autenticado com sucesso', 'Fechar');
    };
    
    this.httpClient.post(`${this.baseUrl}/login`, user). subscribe({
      next: sucessCallback,
      error: errorCallback,
    })
  }

  signup(user: Auth) {
    return this.httpClient.post(`${this.baseUrl}/signup`, user);
  }
}
