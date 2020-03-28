import { Component, OnInit } from '@angular/core';
import { DiccionarioService } from '../../../core/services/diccionario.service';
import { Diccionario } from '../../../core/models/diccionario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-diccionarios',
  templateUrl: './lista-diccionarios.component.html',
  styleUrls: ['./lista-diccionarios.component.sass']
})
export class ListaDiccionariosComponent implements OnInit {

  diccionarios: Observable<Diccionario[]>;

  constructor(private diccionarioService: DiccionarioService) { }

  ngOnInit() {
    this.cargarDiccionarios();
  }

  cargarDiccionarios() {
    this.diccionarios = this.diccionarioService.findAll();
  }

}
