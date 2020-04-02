import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiccionarioComponent } from './form-diccionario.component';

describe('FormDiccionarioComponent', () => {
  let component: FormDiccionarioComponent;
  let fixture: ComponentFixture<FormDiccionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDiccionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDiccionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
