import { Component, OnInit } from '@angular/core';
import { DiccionarioService } from '../../../core/services/diccionario.service';
import { Diccionario } from '../../../core/models/diccionario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.sass']
})
export class PaginaPrincipalComponent implements OnInit {

  diccionarios: Observable<Diccionario[]>;

  constructor(private diccionarioService: DiccionarioService) { }

  ngOnInit() {
    this.cargarDiccionarios();
  }

  cargarDiccionarios() {
    this.diccionarios = this.diccionarioService.buscarTodos();
  }

}
