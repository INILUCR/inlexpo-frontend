import { Component, OnInit } from '@angular/core';
import { DiccionarioService } from '../../../core/services/diccionario.service';
import { Diccionario } from '../../../core/models/diccionario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.sass']
})
export class PaginaPrincipalComponent implements OnInit {

  diccionarios: Diccionario[];

  constructor(private diccionarioService: DiccionarioService,
              private router: Router) { }

  ngOnInit() {
    this.cargarDiccionarios();
  }

  cargarDiccionarios() {
    this.diccionarioService.buscarTodos().subscribe(diccionarios => {
      this.diccionarios = diccionarios;
    });
  }

  goToCreateDiccionario() {
    this.router.navigate(['agregar-diccionario']);
  }

  goToDiccionario(i: number) {
    this.router.navigate(['diccionario/' + (i + 1)]);
  }
}
