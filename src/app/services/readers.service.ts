import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadersService {
  baseUrl = 'https://dev.api.replenish4me.caioruiz.com'

  constructor(
    private http: HttpClient,
  ) { }

  getReaders() {
    return this.http.get(`${this.baseUrl}/reders`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      }
    });
  }

  removeReader(id: string) {
    return this.http.delete(`${this.baseUrl}/remove-reader`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
      body: {
        leitor_id: id,
      }
    });
  }

  addReader(id: number) {
    return this.http.post(`${this.baseUrl}/add-reader`, {
      leitor_id: id,
    }, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      }
    });
  }
}
