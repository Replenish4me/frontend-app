import { Component } from '@angular/core';
import { Cart } from './cart.model';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  carrinho: Cart[] = [];
  total: number = 0
  carregado: boolean = false;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,  
  ) {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe((res: any) => {
      console.log(res.carrinho);
      this.carrinho = res.carrinho;
      this.total = res.total;
      this.carregado = true;
    });
  }

  removeOneUnity(produto_id: number, quantidade: number) {
    if(quantidade != 1) {
      this.snackBar.open('Removendo produto...', 'Fechar');
      this.cartService.removeOneUnity(produto_id).subscribe((res: any) => {
        this.getCart();
        this.snackBar.open('Produto removido com sucesso!', 'Fechar');
      });
    }
    else {
      if (confirm('Deseja remover o produto do carrinho?')) {
        this.snackBar.open('Removendo produto...', 'Fechar');
        this.cartService.removeFromCart(produto_id).subscribe((res: any) => {
          this.getCart();
          this.snackBar.open('Produto removido com sucesso!', 'Fechar');
        });
      }
    }
  }

  addToCart(produto_id: number) {
    this.snackBar.open('Adicionando produto...', 'Fechar')
    this.cartService.addToCart(produto_id).subscribe((res: any) => {
      this.getCart();
      this.snackBar.open('Produto adicionado com sucesso!', 'Fechar');
    });
  }

  checkout() {
    this.snackBar.open('Finalizando compra...', 'Fechar');
    this.cartService.checkout().subscribe((res: any) => {
      this.getCart();
      this.snackBar.open('Compra finalizada com sucesso!', 'Fechar');
    });
  }
}
