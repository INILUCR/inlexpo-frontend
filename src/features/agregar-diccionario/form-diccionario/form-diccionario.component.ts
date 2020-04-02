import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-diccionario',
  templateUrl: './form-diccionario.component.html',
  styleUrls: ['./form-diccionario.component.sass']
})
export class FormDiccionarioComponent implements OnInit {

  instrucciones = 'Paso 1: Porfavor ingrese los datos generales del diccionario.';
  diccionarioForm = new FormGroup({
    nombre: new FormControl(''),
    tipo: new FormControl(''),
    descripcion: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.diccionarioForm.value);
  }
}
