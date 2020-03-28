import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  activo = 1;

  constructor() { }

  ngOnInit() {
  }

  setActivo(activo: number) {
    this.activo = activo;
  }

}
