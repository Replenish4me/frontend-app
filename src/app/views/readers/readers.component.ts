import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReadersService } from 'src/app/services/readers.service';

@Component({
  selector: 'app-readers',
  templateUrl: './readers.component.html',
  styleUrls: ['./readers.component.css']
})
export class ReadersComponent {
  
  carregado = false;
  leitor_id = '';

  leitores: string[] = [];

  constructor(
    private readerService: ReadersService,
    private snackBar: MatSnackBar,
  ) {
    this.getReaders();
  }

  getReaders() {
    this.readerService.getReaders().subscribe((res: any) => {
      console.log(res);
      this.leitores = res.leitores;
      this.carregado = true;
    });
  }

  addReader() {
    this.snackBar.open('Adicionando leitor...', 'Fechar')
    this.readerService.addReader(Number(this.leitor_id)).subscribe((res: any) => {
      this.getReaders();
      this.snackBar.open('Leitor adicionado com sucesso!', 'Fechar');
    });
  }

  removeReader(id: string) {
    this.snackBar.open('Removendo leitor...', 'Fechar');
    this.readerService.removeReader(id).subscribe((res: any) => {
      this.getReaders();
      this.snackBar.open('Leitor removido com sucesso!', 'Fechar');
    });
  }


}
