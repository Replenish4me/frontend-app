import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '../views/preferences/preferences.model';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private baseUrl = 'https://dev.api.replenish4me.caioruiz.com'

  constructor(
    private http: HttpClient,
  ) { }

  getPreferences() {
    return this.http.get(`${this.baseUrl}/preferences`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      }
    });
  }

  updatePreferences(preferences: Preferences) {
    preferences.dia_da_semana = preferences.dia_semana ?? 0;
    return this.http.post(`${this.baseUrl}/update-preferences`, {
      preferencias: {
        aprovar_automaticamente: preferences.aprovar_automaticamente ? 1 : 0,
        frequencia: preferences.frequencia,
        dia_da_semana: preferences.dia_da_semana,
        dia_semana: preferences.dia_semana,
      },
    }, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      }
    });
  }
}
