import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiccionarioComponent } from './agregar-diccionario.component';

describe('AgregarDiccionarioComponent', () => {
  let component: AgregarDiccionarioComponent;
  let fixture: ComponentFixture<AgregarDiccionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDiccionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDiccionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
