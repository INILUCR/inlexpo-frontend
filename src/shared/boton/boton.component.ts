import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.sass']
})
export class BotonComponent implements OnInit {
  @Input() contenido: string;
  @Input() tipo: string;

  constructor() { }

  ngOnInit() {
  }

}
