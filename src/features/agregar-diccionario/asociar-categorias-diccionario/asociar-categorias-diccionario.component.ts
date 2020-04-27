import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatGramaticalService } from '../../../core/services/cat-gramatical.service';
import { CatGramatical } from '../../../core/models/cat-gramatical';
import { CatGrmDiccionario } from '../../../core/models/cat-grm-diccionario';
import { SubGrmDiccionario } from '../../../core/models/sub-grm-diccionario';
import { AbreviaturaValida } from './custom-validator.validator';
import { ComunicadorParaCategoriasAsociadasService } from '../../../core/services/comunicador-para-categorias-asociadas.service';

@Component({
  selector: 'app-asociar-categorias-diccionario',
  templateUrl: './asociar-categorias-diccionario.component.html',
  styleUrls: ['./asociar-categorias-diccionario.component.sass']
})
export class AsociarCategoriasDiccionarioComponent implements OnInit {

  instrucciones = 'Paso 2: Porfavor seleccione las categorias y subcategorias que va a contener el diccionario. Además, escriba la abreviatura que van a tener en este diccionario';
  categoriasDiccionarioForm: FormGroup;
  catGramaticales: CatGramatical[];

  constructor(private formBuilder: FormBuilder,
              private catGramaticalService: CatGramaticalService,
              private ccaService: ComunicadorParaCategoriasAsociadasService) { }

  ngOnInit() {
    this.categoriasDiccionarioForm = this.formBuilder.group({
      catGramaticales: new FormArray([])
    });

    this.catGramaticalService.buscarTodosConSubcategoriasAsociadas().subscribe(catGramaticales => {
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
        id: [this.catGramaticales[i].id, Validators.required],
        abreviatura: [''],
        marcado: [false],
        subGramaticales: new FormArray([])
      },
        {
          validator: AbreviaturaValida('marcado', 'abreviatura')
        }
      ));

      for (let e = 0; e < this.catGramaticales[i].listaSubGramatical.length; ++e) {
        this.subGramaticalesFormArray(this.catGramaticalFormGroup(i)).insert(e, this.formBuilder.group({
          id: [this.catGramaticales[i].listaSubGramatical[e].id, Validators.required],
          abreviatura: [''],
          marcado: [false]
        },
          {
            validator: AbreviaturaValida('marcado', 'abreviatura')
          }
        ));
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
    if (this.categoriasDiccionarioForm.valid) {
      var catSubAsociadas = [];
      var catGrmDiccionarios = [];
      var subGrmDiccionarios = [];

      for (var catGramatical of this.categoriasDiccionarioForm.value.catGramaticales) {
        if (catGramatical.marcado) {
          var nuevoCatGrmDic = new CatGrmDiccionario();
          nuevoCatGrmDic.catGramaticalId = catGramatical.id;
          nuevoCatGrmDic.abreviatura = catGramatical.abreviatura;

          catGrmDiccionarios.push(nuevoCatGrmDic);
        }

        for (var subGramatical of catGramatical.subGramaticales) {
          if (subGramatical.marcado) {
            var nuevoSubGrmDic = new SubGrmDiccionario();
            nuevoSubGrmDic.catGramaticalId = catGramatical.id;
            nuevoSubGrmDic.subGramaticalId = subGramatical.id;
            nuevoSubGrmDic.abreviatura = subGramatical.abreviatura;

            subGrmDiccionarios.push(nuevoSubGrmDic);
          }
        }
      }

      catSubAsociadas.push(catGrmDiccionarios);
      catSubAsociadas.push(subGrmDiccionarios);

      this.ccaService.emitChange(catSubAsociadas);
    }
  }
}
