import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-agregar-diccionario',
  templateUrl: './agregar-diccionario.component.html',
  styleUrls: ['./agregar-diccionario.component.sass']
})
export class AgregarDiccionarioComponent {

  diccionarioFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Creamos un form group que consta de tres partes
    // 1. El diccionario
    // 2. Sus categorias gramaticales y subcategorias
    // 3. La informacion y marcacion
    this.diccionarioFormGroup = this.formBuilder.group({
      diccionario: this.formBuilder.group({
        nombre: this.formBuilder.control(''),
        tipo: this.formBuilder.control(''),
        descripcion: this.formBuilder.control(''),
      }),

      catGramaticales: this.formBuilder.array([]),

      informacion: this.formBuilder.group({
        ortografica: this.formBuilder.array([]),
        fonetica: this.formBuilder.array([]),
        morfologica: this.formBuilder.array([]),
        etimologica: this.formBuilder.array([]),
      }),

      marcacion: this.formBuilder.group({
        diatopica: this.formBuilder.array([]),
        diacronica: this.formBuilder.array([]),
        frecuencia: this.formBuilder.array([]),
        valoracionSocial: this.formBuilder.array([]),
        estratificacionSocial: this.formBuilder.array([]),
        pragmatica: this.formBuilder.array([]),
        diatecnica: this.formBuilder.array([]),
      }),
    });
  }

  /* ------ Metodos para administrar las categorias y subcategorias ------ */

  getCatGramaticales(): FormArray {
    return this.diccionarioFormGroup.get('catGramaticales') as FormArray;
  }

  addCatGramatical() {
    const catGramaticales = this.getCatGramaticales();

    catGramaticales.push(this.formBuilder.group({
      nombre: this.formBuilder.control(''),
      abreviatura: this.formBuilder.control(''),
      descripcion: this.formBuilder.control(''),
      subGramaticales: this.formBuilder.array([]),
    }));
  }

  getSubGramaticales(catGramatical: FormGroup): FormArray {
    return catGramatical.get('subGramaticales') as FormArray;
  }

  addSubGramatical(catGramatical: FormGroup) {
    const subGramaticales = this.getSubGramaticales(catGramatical);

    subGramaticales.push(this.formBuilder.group({
      nombre: this.formBuilder.control(''),
      abreviatura: this.formBuilder.control(''),
      descripcion: this.formBuilder.control(''),
    }));
  }

  /* ------ Metodos para administrar la informacion ------ */

  getInformacion(informacion): FormArray {
    return this.diccionarioFormGroup.get('informacion').get(informacion) as FormArray;
  }

  addInformacion(informacion) {
    const informacionArray = this.getInformacion(informacion);

    informacionArray.push(this.formBuilder.group({
      nombre: this.formBuilder.control(''),
      descripcion: this.formBuilder.control(''),
    }));
  }

  /* ------ Metodos para administrar las marcaciones ------ */

  getMarcacion(marcacion): FormArray {
    return this.diccionarioFormGroup.get('marcacion').get(marcacion) as FormArray;
  }

  addMarcacion(marcacion) {
    const marcacionArray = this.getMarcacion(marcacion);

    marcacionArray.push(this.formBuilder.group({
      nombre: this.formBuilder.control(''),
      descripcion: this.formBuilder.control(''),
    }));
  }

  /* ----- Metodos para guardar en la base de datos ----- */

  onSubmit() {
    console.log(this.diccionarioFormGroup.value);
  }
}
