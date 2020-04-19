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

  instrucciones = 'Paso 2: Porfavor seleccione las categorias y subcategorias que va a contener el diccionario. Además, escriba la abreviatura que van a tener en este diccionario';
  categoriasDiccionarioForm: FormGroup;
  catGramaticales: CatGramatical[];


  constructor(private formBuilder: FormBuilder, private catGramaticalService: CatGramaticalService) { }

  ngOnInit() {
    this.categoriasDiccionarioForm = this.formBuilder.group({
      catGramaticales: new FormArray([])
    });

    this.catGramaticalService.findAllWithSubGramatical().subscribe(catGramaticales => {
      this.catGramaticales = catGramaticales;
      this.crearForm();
    });
  }

  // Idea tomada del siguiente link: https://jasonwatmore.com/post/2019/06/25/angular-8-dynamic-reactive-forms-example
  catGramaticalesFormArray() { return this.categoriasDiccionarioForm.controls.catGramaticales as FormArray; }
  subGramaticalesFormArray(catGramaticalesFormGroup: FormGroup) { return catGramaticalesFormGroup.controls.subGramaticales as FormArray; }
  catGramaticalFormGroup(i: number) { return this.catGramaticalesFormArray().at(i) as FormGroup; }
  subGramaticalFormGroup(i: number, e: number) { return this.subGramaticalesFormArray(this.catGramaticalFormGroup(i)).at(e) as FormGroup; }
  catGramaticalActiva(i: number) { return this.catGramaticalFormGroup(i).controls.marcado.value; }

  crearForm() {
    for (let i = 0; i < this.catGramaticales.length; ++i) {
      this.catGramaticalesFormArray().insert(i, this.formBuilder.group({
        abreviatura: ['', Validators.required],
        marcado: [false],
        subGramaticales: new FormArray([])
      }));

      for (let e = 0; e < this.catGramaticales[i].listaSubGramatical.length; ++e) {
        this.subGramaticalesFormArray(this.catGramaticalFormGroup(i)).insert(e, this.formBuilder.group({
          abreviatura: ['', Validators.required],
          marcado: [false]
        }));
      }
    }
  }

  catGramaticalesColumna(i: number) {
    var catGramaticalesColumna = [];
    var numCatGrmColumna = this.catGramaticales.length / 3;
    var maxNumCatGrmColumna = Math.ceil(numCatGrmColumna);
    var minNumCatGrmColumna = Math.floor(numCatGrmColumna);

    if (i === 0) {
      for (let e = 0; e < maxNumCatGrmColumna; ++e) {
        catGramaticalesColumna.push(this.catGramaticales[e + this.calculadorPosApartirDeColumna(i)]);
      }
    } else if (i === 1) {
      if (numCatGrmColumna > maxNumCatGrmColumna - 0.5) {
        for (let e = 0; e < maxNumCatGrmColumna; ++e) {
          catGramaticalesColumna.push(this.catGramaticales[e + this.calculadorPosApartirDeColumna(i)]);
        }
      } else {
        for (let e = 0; e < minNumCatGrmColumna; ++e) {
          catGramaticalesColumna.push(this.catGramaticales[e + this.calculadorPosApartirDeColumna(i)]);
        }
      }
    } else if (i === 2) {
      for (let e = 0; e < minNumCatGrmColumna; ++e) {
        catGramaticalesColumna.push(this.catGramaticales[e + this.calculadorPosApartirDeColumna(i)]);
      }
    }

    return catGramaticalesColumna;
  }

  calculadorPosApartirDeColumna(i: number) {
    var pos = 0;
    var numCatGrmColumna = this.catGramaticales.length / 3;
    var maxNumCatGrmColumna = Math.ceil(numCatGrmColumna);
    var minNumCatGrmColumna = Math.floor(numCatGrmColumna);

    if (i === 1) {
      if (numCatGrmColumna > maxNumCatGrmColumna - 0.5) {
        pos += maxNumCatGrmColumna;
      } else {
        pos += minNumCatGrmColumna;
      }

    } else if (i === 2) {
      if (numCatGrmColumna > maxNumCatGrmColumna - 0.5) {
        pos += maxNumCatGrmColumna * 2;
      } else {
        pos += maxNumCatGrmColumna + minNumCatGrmColumna;
      }
    }

    return pos;
  }

  onSubmit() {
    console.log(this.categoriasDiccionarioForm.value);
  }
}
