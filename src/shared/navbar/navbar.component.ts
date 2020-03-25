import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  active = 1;

  constructor() { }

  ngOnInit() {
  }

  setActivo(active: number) {
    this.active = active;
  }

}
