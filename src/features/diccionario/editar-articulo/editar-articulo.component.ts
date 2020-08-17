import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs";
import { CatGramatical } from "src/core/models/cat-gramatical";
import { InformacionMarcacion } from "src/core/models/informacion-o-marcacion";
import { ActivatedRoute, Router } from "@angular/router";
import { AcepcionService } from "src/core/services/acepcion.service";
import { ArticuloService } from "src/core/services/articulo.service";
import { CatGramaticalService } from "src/core/services/cat-gramatical.service";
import { InfEtimologicaService } from "src/core/services/inf-etimologica.service";
import { SubGramaticalService } from "src/core/services/sub-gramatical.service";
import { InfFoneticaService } from "src/core/services/inf-fonetica.service";
import { InfMorfologicaService } from "src/core/services/inf-morfologica.service";
import { InfOrtograficaService } from "src/core/services/inf-ortografica.service";
import { MarDiacronicaService } from "src/core/services/mar-diacronica.service";
import { MarDiatecnicaService } from "src/core/services/mar-diatecnica.service";
import { MarDiatopicaService } from "src/core/services/mar-diatopica.service";
import { MarEstratificacionSocialService } from "src/core/services/mar-estratificacion-social.service";
import { MarFrecuenciaService } from "src/core/services/mar-frecuencia.service";
import { MarPragmaticaService } from "src/core/services/mar-pragmatica.service";
import { MarValoracionSocialService } from "src/core/services/mar-valoracion-social.service";
import { Articulo } from "src/core/models/articulo";
import { Acepcion } from "src/core/models/acepcion";
import { DatosAcepcion } from "src/core/models/datos-acepcion";

@Component({
  selector: "app-editar-articulo",
  templateUrl: "./editar-articulo.component.html",
  styleUrls: ["./editar-articulo.component.sass"],
})
export class EditarArticuloComponent implements OnInit {
  articuloFormGroup: FormGroup;

  acepcionesEliminadas = [];

  catGramaticales: Observable<CatGramatical[]>;
  listaDeListasDeSubGrm = [];

  listaDeSubGrmAMostrar = [];

  // Vaialbes creadas para simplificar el html
  informacionMarcacion;

  listaInformacionNombres = [
    ["etimológica", "infEtimologicaId"],
    ["fonética", "infFoneticaId"],
    ["morfológica", "infMorfologicaId"],
    ["ortográfica", "infOrtograficaId"],
  ];

  listaMarcacionNombres = [
    ["diacrónica", "marDiacronicaId"],
    ["diatécnica", "marDiatecnicaId"],
    ["diatópica", "marDiatopicaId"],
    [
      "sociolingüística de estratificación social",
      "marEstratificacionSocialId",
    ],
    ["frecuencia", "marFrecuenciaId"],
    ["pragmática", "marPragmaticaId"],
    ["sociolingüística de valoración social", "marValoracionSocialId"],
  ];

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
    const diccionarioId = this.route.snapshot.params.diccionarioId;
    const articuloId = this.route.snapshot.params.articuloId;

    this.articuloFormGroup = this.formBuilder.group({
      articulo: this.formBuilder.group({
        lema: this.formBuilder.control(""),
      }),

      acepciones: this.formBuilder.array([]),
    });

    // Primero pedimos los datos del articulo
    this.articuloService
      .buscarPorId(diccionarioId, articuloId)
      .subscribe((articulo) => {
        this.articuloFormGroup
          .get("articulo")
          .get("lema")
          .setValue(articulo.lema);

        this.acepcionService
          .buscarPorArticulo(articuloId)
          .subscribe((acepciones) => {
            acepciones.forEach((acepcion, index) => {
              this.addAcepcion(acepcion);
            });
          });
      });

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

    // Creamos un objeto que guarda los servicios para guardar informacion y marcacion
    this.informacionMarcacion = {
      infEtimologicaId: this.infEtimologicaService.buscarPorDiccionario(
        diccionarioId
      ),
      infFoneticaId: this.infFoneticaService.buscarPorDiccionario(
        diccionarioId
      ),
      infMorfologicaId: this.infMorfologicaService.buscarPorDiccionario(
        diccionarioId
      ),
      infOrtograficaId: this.infOrtograficaService.buscarPorDiccionario(
        diccionarioId
      ),
      marDiacronicaId: this.marDiacronicaService.buscarPorDiccionario(
        diccionarioId
      ),
      marDiatecnicaId: this.marDiatecnicaService.buscarPorDiccionario(
        diccionarioId
      ),
      marDiatopicaId: this.marDiatopicaService.buscarPorDiccionario(
        diccionarioId
      ),
      marEstratificacionSocialId: this.marEstratificacionSocialService.buscarPorDiccionario(
        diccionarioId
      ),
      marFrecuenciaId: this.marFrecuenciaService.buscarPorDiccionario(
        diccionarioId
      ),
      marPragmaticaId: this.marPragmaticaService.buscarPorDiccionario(
        diccionarioId
      ),
      marValoracionSocialId: this.marValoracionSocialService.buscarPorDiccionario(
        diccionarioId
      ),
    };
  }

  /* ------ Metodos para administrar las acepciones ------ */

  getAcepciones(): FormArray {
    return this.articuloFormGroup.get("acepciones") as FormArray;
  }

  addAcepcion(acepcion: Acepcion) {
    const acepciones = this.getAcepciones();

    if (acepcion !== undefined) {
      acepciones.push(
        this.formBuilder.group({
          id: this.formBuilder.control(acepcion.id),
          definicion: this.formBuilder.control(acepcion.definicion),
          prioridad: this.formBuilder.control(acepcion.prioridad),
          catGramaticalId: this.formBuilder.control(
            acepcion.catGramatical ? acepcion.catGramatical.id : -1
          ),
          subGramaticalId: this.formBuilder.control(
            acepcion.subGramatical ? acepcion.subGramatical.id : -1
          ),
          infEtimologicaId: this.formBuilder.control(
            acepcion.infEtimologica ? acepcion.infEtimologica.id : -1
          ),
          infFoneticaId: this.formBuilder.control(
            acepcion.infFonetica ? acepcion.infFonetica.id : -1
          ),
          infMorfologicaId: this.formBuilder.control(
            acepcion.infMorfologica ? acepcion.infMorfologica.id : -1
          ),
          infOrtograficaId: this.formBuilder.control(
            acepcion.infOrtografica ? acepcion.infOrtografica.id : -1
          ),
          marDiacronicaId: this.formBuilder.control(
            acepcion.marDiacronica ? acepcion.marDiacronica.id : -1
          ),
          marDiatecnicaId: this.formBuilder.control(
            acepcion.marDiatecnica ? acepcion.marDiatecnica.id : -1
          ),
          marDiatopicaId: this.formBuilder.control(
            acepcion.marDiatopica ? acepcion.marDiatopica.id : -1
          ),
          marEstratificacionSocialId: this.formBuilder.control(
            acepcion.marEstratificacionSocial
              ? acepcion.marEstratificacionSocial.id
              : -1
          ),
          marFrecuenciaId: this.formBuilder.control(
            acepcion.marFrecuencia ? acepcion.marFrecuencia.id : -1
          ),
          marPragmaticaId: this.formBuilder.control(
            acepcion.marPragmatica ? acepcion.marPragmatica.id : -1
          ),
          marValoracionSocialId: this.formBuilder.control(
            acepcion.marValoracionSocial ? acepcion.marValoracionSocial.id : -1
          ),
        })
      );
    } else {
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
  }

  deleteAcepcion(index: number) {
    const acepciones = this.getAcepciones();

    const id = acepciones.at(index).value.id;
    if (id) {
      this.acepcionesEliminadas.push(id);
      console.log(this.acepcionesEliminadas);
    }

    acepciones.removeAt(index);
  }

  /* ----- Metodos para guardar en la base de datos ----- */

  onSubmit() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;
    const articuloId = this.route.snapshot.params.articuloId;

    const articulo = this.articuloFormGroup.value.articulo as Articulo;

    // Primero guardamos el articulo
    this.articuloService
      .actualizar(diccionarioId, articuloId, articulo)
      .subscribe((articuloActualizado) => {
        // Agregamos las acepciones a la base
        const acepciones = this.articuloFormGroup.value
          .acepciones as DatosAcepcion[];

        acepciones.forEach((acepcion) => {
          // Quiere decir que es una acepcion que ya existia
          if (acepcion.id !== undefined) {
            this.acepcionService
              .actualizar(articuloActualizado.id, acepcion.id, acepcion)
              .subscribe((acepcionActualizada) => {
                // No hace nada
              });
          } else {
            this.acepcionService
              .crear(articuloActualizado.id, acepcion)
              .subscribe((acepcionActualizada) => {
                // No hace nada
              });
          }
        });

        this.acepcionesEliminadas.forEach((acepcionId) => {
          this.acepcionService
            .eliminar(articuloActualizado.id, acepcionId)
            .subscribe();
        });

        this.router.navigate(["diccionario/" + diccionarioId]);
      });
  }

  actualizarListaDeSubGrmAMostrar(index: number, event: Event) {
    const listaAMostrar = event.target["selectedIndex"] - 2;
    this.listaDeSubGrmAMostrar[index] = listaAMostrar;
  }
}
