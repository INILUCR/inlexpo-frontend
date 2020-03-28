import {Component, Input, OnInit} from '@angular/core';
import { Diccionario } from '../../../core/models/diccionario';

@Component({
  selector: 'app-resumen-diccionario',
  templateUrl: './resumen-diccionario.component.html',
  styleUrls: ['./resumen-diccionario.component.sass']
})
export class ResumenDiccionarioComponent implements OnInit {

  @Input() diccionario: Diccionario;

  constructor() { }

  ngOnInit() {
  }

}
