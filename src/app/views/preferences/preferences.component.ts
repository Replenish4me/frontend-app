import { Component } from '@angular/core';
import { Preferences } from './preferences.model';
import { PreferencesService } from 'src/app/services/preferences.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  preferences: Preferences = {
    aprovar_automaticamente: false,
    frequencia: 0,
    dia_da_semana: 0,
  };

  carregado = false;

  constructor(
    private preferencesService: PreferencesService,
    private snackBar: MatSnackBar,
  ) {
    this.getPreferences();
  }

  getPreferences() {
    this.preferencesService.getPreferences().subscribe({
      next: (res: any) => {
        console.log(res);
        this.preferences = res.preferences;
        this.carregado = true;
      },
      error: (err: any) => {
        this.preferences = {
          aprovar_automaticamente: false,
          frequencia: 0,
          dia_da_semana: 0,
          dia_semana: 0,
        }
        this.carregado = true;
      }
    });
  }

  updatePreferences() {
    this.snackBar.open('Atualizando preferencias...', 'Fechar');
    this.preferencesService.updatePreferences(this.preferences).subscribe((res: any) => {
      this.snackBar.open('Preferências atualizadas com sucesso!', 'Fechar');
    });
  }
}
