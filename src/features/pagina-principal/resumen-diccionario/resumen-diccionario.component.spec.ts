import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDiccionarioComponent } from './resumen-diccionario.component';

describe('ResumenDiccionarioComponent', () => {
  let component: ResumenDiccionarioComponent;
  let fixture: ComponentFixture<ResumenDiccionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenDiccionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDiccionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
