import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diccionario } from '../../../core/models/diccionario';
import { ComunicadorParaDiccionarioCreadoService } from '../../../core/services/comunicador-para-diccionario-creado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-diccionario',
  templateUrl: './form-diccionario.component.html',
  styleUrls: ['./form-diccionario.component.sass']
})
export class FormDiccionarioComponent implements OnInit {

  instrucciones = 'Paso 1: Porfavor ingrese los datos generales del diccionario.';
  diccionarioForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });

  constructor(private cdcService: ComunicadorParaDiccionarioCreadoService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.diccionarioForm.valid) {
      var nuevoDiccionario = new Diccionario();
      nuevoDiccionario.nombre = this.diccionarioForm.value.nombre;
      nuevoDiccionario.tipo = this.diccionarioForm.value.tipo;
      nuevoDiccionario.descripcion = this.diccionarioForm.value.descripcion;

      this.cdcService.emitChange(nuevoDiccionario);
      this.router.navigate(['agregar-diccionario/asociar-categorias-diccionario']);
    }
  }
}
