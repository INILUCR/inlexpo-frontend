import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CatGramaticalService } from '../../../core/services/cat-gramatical.service';
import { Observable } from 'rxjs';
import { CatGramatical } from '../../../core/models/cat-gramatical';

@Component({
  selector: 'app-asociar-categorias-diccionario',
  templateUrl: './asociar-categorias-diccionario.component.html',
  styleUrls: ['./asociar-categorias-diccionario.component.sass']
})
export class AsociarCategoriasDiccionarioComponent implements OnInit {

  instrucciones = 'Paso 2: Porfavor seleccione las categorias y subcategorias que va a contener el diccionario.';
  categoriasDiccionarioForm: FormGroup;
  catGramaticales: CatGramatical[];

  constructor(private formBuilder: FormBuilder, private catGramaticalService: CatGramaticalService) { }

  ngOnInit() {
    this.catGramaticalService.findAllWithSubGramatical().subscribe(catGramaticales => {
      this.catGramaticales = catGramaticales;
      this.crearForm();
    });
  }

  // convenience getters for easy access to form fields // source: https://jasonwatmore.com/post/2019/06/25/angular-8-dynamic-reactive-forms-example
  catGramaticalesFormArray() { return this.categoriasDiccionarioForm.controls.catGramaticales as FormArray; }
  catGramaticalFormGroup(i: number) { return this.catGramaticalesFormArray().at(i) as FormGroup; }
  subGramaticalesFormArray(catGramaticalesFormGroup: FormGroup) { return catGramaticalesFormGroup.controls.subGramaticales as FormArray; }

  crearForm() {
    this.categoriasDiccionarioForm = this.formBuilder.group({
      catGramaticales: new FormArray([])
    });

    for (let i = 0; i < this.catGramaticales.length; ++i) {
      this.catGramaticalesFormArray().insert(i, this.formBuilder.group({
        abreviatura: ['', Validators.required],
        subGramaticales: new FormArray([])
      }));

      for (let e = 0; e < this.catGramaticales[i].listaSubGramatical.length; ++e) {
        this.subGramaticalesFormArray(this.catGramaticalFormGroup(i)).insert(e, this.formBuilder.group({
          abreviatura: ['', Validators.required]
        }));
      }
    }
    console.log(this.catGramaticalFormGroup(0));
    console.log(this.catGramaticalesFormArray());
    console.log(this.categoriasDiccionarioForm);
  }

  onSubmit() {}
}
