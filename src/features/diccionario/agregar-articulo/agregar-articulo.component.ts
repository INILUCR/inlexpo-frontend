import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcepcionService } from 'src/core/services/acepcion.service';
import { ArticuloService } from 'src/core/services/articulo.service';
import { Articulo } from 'src/core/models/articulo';
import { Acepcion } from 'src/core/models/acepcion';
import { CatGramaticalService } from 'src/core/services/cat-gramatical.service';
import { CatGramatical } from 'src/core/models/cat-gramatical';

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.sass']
})
export class AgregarArticuloComponent implements OnInit {

  articuloFormGroup: FormGroup;

  catGramaticales: CatGramatical[];

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private acepcionService: AcepcionService,
              private articuloService: ArticuloService,
              private catGramaticalService: CatGramaticalService,
              private router: Router) {}

  ngOnInit() {
    // Creamos un form group que consta de dos cosas
    // 1. El articulo
    // 2. Sus acepciones y las categorias y subcategorias a las que estas estan asociadas
    this.articuloFormGroup = this.formBuilder.group({
      articulo: this.formBuilder.group({
        lema: this.formBuilder.control(''),
      }),

      acepciones: this.formBuilder.array([]),
    });

    const diccionarioId = this.route.snapshot.params.diccionarioId;

    this.catGramaticalService.buscarPorDiccionario(diccionarioId).subscribe(catGramaticales => {
      this.catGramaticales = catGramaticales;
    });
  }

  /* ------ Metodos para administrar las acepciones ------ */

  getAcepciones(): FormArray {
    return this.articuloFormGroup.get('acepciones') as FormArray;
  }

  addAcepcion() {
    const acepciones = this.getAcepciones();

    acepciones.push(this.formBuilder.group({
      definicion: this.formBuilder.control(''),
      prioridad: this.formBuilder.control(''),
      catGramaticalAsc: this.formBuilder.control(''),
    }));
  }

  deleteAcepcion(index: number) {
    const acepciones = this.getAcepciones();

    acepciones.removeAt(index);
  }

  /* ----- Metodos para guardar en la base de datos ----- */

  onSubmit() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;

    const articulo = this.articuloFormGroup.value.articulo as Articulo;

    // Primero guardamos el articulo
    this.articuloService.crear(diccionarioId, articulo).subscribe(articuloNuevo => {
      // Agregamos las acepciones a la base
      const acepciones = this.articuloFormGroup.value.acepciones as Acepcion[];

      acepciones.forEach(acepcion => {
        this.acepcionService.crear(articuloNuevo.id, acepcion['catGramaticalAsc'], acepcion).subscribe(acepcionNueva => {
          // No hace nada
        });
      });
    });

    this.router.navigate(['diccionario/' + diccionarioId]);
  }
}
