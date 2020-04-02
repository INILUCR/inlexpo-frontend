import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarCategoriasDiccionarioComponent } from './asociar-categorias-diccionario.component';

describe('AsociarCategoriasDiccionarioComponent', () => {
  let component: AsociarCategoriasDiccionarioComponent;
  let fixture: ComponentFixture<AsociarCategoriasDiccionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarCategoriasDiccionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarCategoriasDiccionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
