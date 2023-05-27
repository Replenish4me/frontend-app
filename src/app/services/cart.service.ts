import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'https://dev.api.replenish4me.caioruiz.com'

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }
  

  getCart() {
    return this.http.get(`${this.baseUrl}/cart`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      }
    });
  }


  addToCart(produto_id: number) {
    return this.http.post(`${this.baseUrl}/add-to-cart`, {
      produto_id: produto_id,
      quantidade: 1,
    }, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`
      },
    })
  }

  removeOneUnity(produto_id: number) {
    return this.http.delete(`${this.baseUrl}/remove-one-unity`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
      body: {
        produto_id: produto_id,
      }
    });
  }

  removeFromCart(produto_id: number) {
    return this.http.delete(`${this.baseUrl}/remove-from-cart`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
      body: {
        produto_id: produto_id,
      }
    });
  }

  checkout() {
    return this.http.get(`${this.baseUrl}/checkout`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      }
    });
  }

}
