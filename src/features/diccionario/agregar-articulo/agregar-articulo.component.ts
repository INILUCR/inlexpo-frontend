import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AcepcionService } from "src/core/services/acepcion.service";
import { ArticuloService } from "src/core/services/articulo.service";
import { Articulo } from "src/core/models/articulo";
import { CatGramaticalService } from "src/core/services/cat-gramatical.service";
import { CatGramatical } from "src/core/models/cat-gramatical";
import { DatosAcepcion } from "src/core/models/datos-acepcion";
import { SubGramatical } from "src/core/models/sub-gramatical";
import { SubGramaticalService } from "src/core/services/sub-gramatical.service";
import { Observable } from "rxjs";
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
  selector: "app-agregar-articulo",
  templateUrl: "./agregar-articulo.component.html",
  styleUrls: ["./agregar-articulo.component.sass"],
})
export class AgregarArticuloComponent implements OnInit {
  articuloFormGroup: FormGroup;

  catGramaticales: Observable<CatGramatical[]>;
  listaDeListasDeSubGrm = [];

  listaDeSubGrmAMostrar: number[];

  infEtimologicas: Observable<InformacionMarcacion[]>;
  infFoneticas: Observable<InformacionMarcacion[]>;
  infMorfologicas: Observable<InformacionMarcacion[]>;
  infOrtograficas: Observable<InformacionMarcacion[]>;

  marDiacronicas: Observable<InformacionMarcacion[]>;
  marDiatecnicas: Observable<InformacionMarcacion[]>;
  marDiatopicas: Observable<InformacionMarcacion[]>;
  marEstratificacionSociales: Observable<InformacionMarcacion[]>;
  marFrecuencias: Observable<InformacionMarcacion[]>;
  marPragmaticas: Observable<InformacionMarcacion[]>;
  marValoracionSociales: Observable<InformacionMarcacion[]>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private acepcionService: AcepcionService,
    private articuloService: ArticuloService,
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
    this.listaDeSubGrmAMostrar = [];

    // Creamos un form group que consta de dos cosas
    // 1. El articulo
    // 2. Sus acepciones y las categorias y subcategorias a las que estas estan asociadas
    this.articuloFormGroup = this.formBuilder.group({
      articulo: this.formBuilder.group({
        lema: this.formBuilder.control(""),
      }),

      acepciones: this.formBuilder.array([]),
    });

    const diccionarioId = this.route.snapshot.params.diccionarioId;

    // Pedimos las categorias y subcategorias asociadas al diccionario
    this.catGramaticales = this.catGramaticalService.buscarPorDiccionario(
      diccionarioId
    );

    this.catGramaticales.subscribe((catGramaticales) => {
      for (let i = 0; i < catGramaticales.length; ++i) {
        this.subGramaticalService
          .buscarPorCatGramatical(catGramaticales[i].id)
          .subscribe((subGramaticales) => {
            this.listaDeListasDeSubGrm[i] = subGramaticales;
          });
      }
    });

    // Pedimos la informacion asociadas al diccionario
    this.infEtimologicas = this.infEtimologicaService.buscarPorDiccionario(
      diccionarioId
    );

    this.infFoneticas = this.infFoneticaService.buscarPorDiccionario(
      diccionarioId
    );

    this.infMorfologicas = this.infMorfologicaService.buscarPorDiccionario(
      diccionarioId
    );

    this.infOrtograficas = this.infOrtograficaService.buscarPorDiccionario(
      diccionarioId
    );

    // Pedimos las marcaciones asociadas al diccionario
    this.marDiacronicas = this.marDiacronicaService.buscarPorDiccionario(
      diccionarioId
    );

    this.marDiatecnicas = this.marDiatecnicaService.buscarPorDiccionario(
      diccionarioId
    );

    this.marDiatopicas = this.marDiatopicaService.buscarPorDiccionario(
      diccionarioId
    );

    this.marEstratificacionSociales = this.marEstratificacionSocialService.buscarPorDiccionario(
      diccionarioId
    );

    this.marFrecuencias = this.marFrecuenciaService.buscarPorDiccionario(
      diccionarioId
    );

    this.marPragmaticas = this.marPragmaticaService.buscarPorDiccionario(
      diccionarioId
    );

    this.marValoracionSociales = this.marValoracionSocialService.buscarPorDiccionario(
      diccionarioId
    );
  }

  /* ------ Metodos para administrar las acepciones ------ */

  getAcepciones(): FormArray {
    return this.articuloFormGroup.get("acepciones") as FormArray;
  }

  addAcepcion() {
    const acepciones = this.getAcepciones();

    acepciones.push(
      this.formBuilder.group({
        definicion: this.formBuilder.control(""),
        prioridad: this.formBuilder.control(""),
        catGramaticalId: this.formBuilder.control(-1),
        subGramaticalId: this.formBuilder.control(-1),
        infEtimologicaId: this.formBuilder.control(-1),
        infFoneticaId: this.formBuilder.control(-1),
        infMorfologicaId: this.formBuilder.control(-1),
        infOrtograficaId: this.formBuilder.control(-1),
        marDiacronicaId: this.formBuilder.control(-1),
        marDiatecnicaId: this.formBuilder.control(-1),
        marDiatopicaId: this.formBuilder.control(-1),
        marEstratificacionSocialId: this.formBuilder.control(-1),
        marFrecuenciaId: this.formBuilder.control(-1),
        marPragmaticaId: this.formBuilder.control(-1),
        marValoracionSocialId: this.formBuilder.control(-1),
      })
    );
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
    this.articuloService
      .crear(diccionarioId, articulo)
      .subscribe((articuloNuevo) => {
        // Agregamos las acepciones a la base
        const acepciones = this.articuloFormGroup.value
          .acepciones as DatosAcepcion[];

        console.log(acepciones);

        acepciones.forEach((acepcion) => {
          this.acepcionService
            .crear(articuloNuevo.id, acepcion)
            .subscribe((acepcionNueva) => {
              // No hace nada
            });
        });
      });

    this.router.navigate(["diccionario/" + diccionarioId]);
  }

  actualizarListDeSubGrmAMostrar(index: number, event: Event) {
    const listaAMostrar = event.target["selectedIndex"] - 1;
    this.listaDeSubGrmAMostrar[index] = listaAMostrar;
  }
}
