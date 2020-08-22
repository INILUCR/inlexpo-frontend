import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { Diccionario } from "src/core/models/diccionario";
import { DiccionarioService } from "src/core/services/diccionario.service";
import { CatGramatical } from "src/core/models/cat-gramatical";
import { CatGramaticalService } from "src/core/services/cat-gramatical.service";
import { SubGramaticalService } from "src/core/services/sub-gramatical.service";
import { Router } from "@angular/router";
import { InfOrtograficaService } from "src/core/services/inf-ortografica.service";
import { MarDiatopicaService } from "src/core/services/mar-diatopica.service";
import { InformacionMarcacion } from "src/core/models/informacion-o-marcacion";
import { InfEtimologicaService } from "src/core/services/inf-etimologica.service";
import { InfFoneticaService } from "src/core/services/inf-fonetica.service";
import { InfMorfologicaService } from "src/core/services/inf-morfologica.service";
import { MarDiacronicaService } from "src/core/services/mar-diacronica.service";
import { MarDiatecnicaService } from "src/core/services/mar-diatecnica.service";
import { MarEstratificacionSocialService } from "src/core/services/mar-estratificacion-social.service";
import { MarFrecuenciaService } from "src/core/services/mar-frecuencia.service";
import { MarPragmaticaService } from "src/core/services/mar-pragmatica.service";
import { MarValoracionSocialService } from "src/core/services/mar-valoracion-social.service";

@Component({
  selector: "app-agregar-diccionario",
  templateUrl: "./agregar-diccionario.component.html",
  styleUrls: ["./agregar-diccionario.component.sass"],
})
export class AgregarDiccionarioComponent implements OnInit {
  diccionarioFormGroup: FormGroup;
  // Variables utilizadas para reducir el metodo para crearla informacion y marcacion
  informacionMarcacion;

  // Vaialbes creadas para simplificar el html
  listaInformacionNombres = [
    ["etimológica", "etimologica"],
    ["fonética", "fonetica"],
    ["morfológica", "morfologica"],
    ["ortográfica", "ortografica"],
  ];

  listaMarcacionNombres = [
    ["diacrónica", "diacronica"],
    ["diatécnica", "diatecnica"],
    ["diatópica", "diatopica"],
    ["sociolingüística de estratificación social", "estratificacion"],
    ["frecuencia", "frecuencia"],
    ["pragmática", "pragmatica"],
    ["sociolingüística de valoración social", "valoracion"],
  ];

  constructor(
    private formBuilder: FormBuilder,
    private diccionarioService: DiccionarioService,
    private catGramaticalService: CatGramaticalService,
    private subGramaticalService: SubGramaticalService,
    private infEtimologicaService: InfEtimologicaService,
    private infFoneticaService: InfFoneticaService,
    private infMorfologicaService: InfMorfologicaService,
    private infOrtograficaService: InfOrtograficaService,
    private marDiacronicaService: MarDiacronicaService,
    private marDiatecnicaService: MarDiatecnicaService,
    private marDiatopicaService: MarDiatopicaService,
    private marEstratificacionSocialService: MarEstratificacionSocialService,
    private marFrecuenciaService: MarFrecuenciaService,
    private marPragmaticaService: MarPragmaticaService,
    private marValoracionSocialService: MarValoracionSocialService,
    private router: Router
  ) {}

  ngOnInit() {
    // Creamos un form group que consta de tres partes
    // 1. El diccionario
    // 2. Sus categorias gramaticales y subcategorias
    // 3. La informacion y marcacion
    this.diccionarioFormGroup = this.formBuilder.group({
      diccionario: this.formBuilder.group({
        nombre: this.formBuilder.control(""),
        tipo: this.formBuilder.control(""),
        descripcion: this.formBuilder.control(""),
      }),

      catGramaticales: this.formBuilder.array([]),

      // Informacion
      etimologica: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      fonetica: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      morfologica: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      ortografica: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),

      // Marcacion
      diacronica: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      diatecnica: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      diatopica: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      estratificacion: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      frecuencia: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      pragmatica: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
      valoracion: this.formBuilder.group({
        lista: this.formBuilder.array([]),
      }),
    });

    // Creamos un objeto que guarda los servicios para guardar informacion y marcacion
    this.informacionMarcacion = {
      etimologica: this.infEtimologicaService,
      fonetica: this.infFoneticaService,
      morfologica: this.infMorfologicaService,
      ortografica: this.infOrtograficaService,
      diacronica: this.marDiacronicaService,
      diatecnica: this.marDiatecnicaService,
      diatopica: this.marDiatopicaService,
      estratificacion: this.marEstratificacionSocialService,
      frecuencia: this.marFrecuenciaService,
      pragmatica: this.marPragmaticaService,
      valoracion: this.marValoracionSocialService,
    };
  }

  /* ------ Metodos para administrar las categorias y subcategorias ------ */

  getCatGramaticales(): FormArray {
    return this.diccionarioFormGroup.get("catGramaticales") as FormArray;
  }

  addCatGramatical() {
    const catGramaticales = this.getCatGramaticales();

    catGramaticales.push(
      this.formBuilder.group({
        nombre: this.formBuilder.control(""),
        abreviatura: this.formBuilder.control(""),
        descripcion: this.formBuilder.control(""),
        subGramaticales: this.formBuilder.array([]),
      })
    );
  }

  deleteCatGramatical(index: number) {
    const catGramaticales = this.getCatGramaticales();
    const catGramatical = catGramaticales.at(index) as FormGroup;

    if (this.getSubGramaticales(catGramatical).length === 0) {
      catGramaticales.removeAt(index);
    }
  }

  getSubGramaticales(catGramatical: FormGroup): FormArray {
    return catGramatical.get("subGramaticales") as FormArray;
  }

  addSubGramatical(catGramatical: FormGroup) {
    const subGramaticales = this.getSubGramaticales(catGramatical);

    subGramaticales.push(
      this.formBuilder.group({
        nombre: this.formBuilder.control(""),
        abreviatura: this.formBuilder.control(""),
        descripcion: this.formBuilder.control(""),
      })
    );
  }

  deleteSubGramatical(catGramatical: FormGroup, index: number) {
    const subGramaticales = this.getSubGramaticales(catGramatical);

    subGramaticales.removeAt(index);
  }

  /* ------ Metodos para administrar la informacion y marcacion ------ */

  getInformacionMarcacion(nombre): FormArray {
    return this.diccionarioFormGroup.get(nombre).get("lista") as FormArray;
  }

  addInformacionMarcacion(nombre) {
    const lista = this.getInformacionMarcacion(nombre);

    lista.push(
      this.formBuilder.group({
        nombre: this.formBuilder.control(""),
        descripcion: this.formBuilder.control(""),
      })
    );
  }

  deleteInformacionMarcacion(nombre, index) {
    const lista = this.getInformacionMarcacion(nombre);
    lista.removeAt(index);
  }

  /* ----- Metodos para guardar en la base de datos ----- */

  onSubmit() {
    const diccionario = this.diccionarioFormGroup.value
      .diccionario as Diccionario;

    // Primero agregamos el diccionario a la base de datos
    this.diccionarioService.crear(diccionario).subscribe((diccionarioNuevo) => {
      // Agregamos las categorias a la base de datos
      const catGramaticales = this.diccionarioFormGroup.value
        .catGramaticales as CatGramatical[];

      catGramaticales.forEach((catGramatical) => {
        this.catGramaticalService
          .crear(diccionarioNuevo.id, catGramatical)
          .subscribe((categoriaNueva) => {
            // Agregamos las subcategorias a la base de datos
            const subGramaticales = catGramatical.subGramaticales;

            subGramaticales.forEach((subGramatical) => {
              this.subGramaticalService
                .crear(categoriaNueva.id, subGramatical)
                .subscribe((subcategoriaNueva) => {
                  // No hacer nada
                });
            });
          });
      });

      // Agregamos las marcaciones e informacion utilizando sus servicios respectivos
      let listaInfMar;
      for (let nombreServicio in this.informacionMarcacion) {
        // tslint:disable-next-line: forin
        listaInfMar = this.diccionarioFormGroup.value[nombreServicio]["lista"];

        // tslint:disable-next-line: prefer-for-of
        for (let infMar of listaInfMar) {
          this.informacionMarcacion[nombreServicio]
            .crear(diccionarioNuevo.id, infMar)
            .subscribe();
        }
      }

      this.router.navigate(["inicio"]);
    });
  }
}
