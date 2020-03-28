import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDiccionariosComponent } from './lista-diccionarios.component';

describe('ListaDiccionariosComponent', () => {
  let component: ListaDiccionariosComponent;
  let fixture: ComponentFixture<ListaDiccionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDiccionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDiccionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
