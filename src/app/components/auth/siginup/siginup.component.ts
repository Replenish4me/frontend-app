import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Auth } from '../auth.model';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-siginup',
  templateUrl: './siginup.component.html',
  styleUrls: ['./siginup.component.css'],
})
export class SiginupComponent {
  user: Auth = {};

  email = new FormControl('', [Validators.required, Validators.email]);
  
  constructor (
    private router : Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}
  
  register() {
    // formatar telefone para (xx) xxxxx-xxxx
    this.snackBar.open('Registrando...', 'Fechar')
    this.user.telefone = this.user.telefone?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    this.authService.signup(this.user).subscribe((res: any) => {
      sessionStorage.setItem('token', res.token);
      this.router.navigate(['/login']);
      this.snackBar.open('Registrado com sucesso!', 'Fechar');
    })
  }
  
  login() {
    // navigate to /login
    this.router.navigate(['/login']);
  }

  getEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Email não pode estar vazio';
    }

    return this.email.hasError('email') ? 'Email inválido' : '';
  }
}
