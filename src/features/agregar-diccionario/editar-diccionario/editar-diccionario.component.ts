import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { DiccionarioService } from "src/core/services/diccionario.service";
import { CatGramaticalService } from "src/core/services/cat-gramatical.service";
import { SubGramaticalService } from "src/core/services/sub-gramatical.service";
import { InfEtimologicaService } from "src/core/services/inf-etimologica.service";
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
import { Router, ActivatedRoute } from "@angular/router";
import { Diccionario } from "src/core/models/diccionario";
import { CatGramatical } from "src/core/models/cat-gramatical";
import { SubGramatical } from "src/core/models/sub-gramatical";
import { InformacionMarcacion } from "src/core/models/informacion-o-marcacion";

@Component({
  selector: "app-editar-diccionario",
  templateUrl: "./editar-diccionario.component.html",
  styleUrls: ["./editar-diccionario.component.sass"],
})
export class EditarDiccionarioComponent implements OnInit {
  diccionarioFormGroup: FormGroup;

  catGramaticalesEliminadas = [];
  subGramaticalesEliminadas = [];
  informacionMarcacionEliminadas = {};

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
    private route: ActivatedRoute,
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

    // Agregamos los datos al form
    const diccionarioId = this.route.snapshot.params.diccionarioId;

    this.diccionarioService
      .buscarPorId(diccionarioId)
      .subscribe((diccionario) => {
        this.diccionarioFormGroup
          .get("diccionario")
          .get("nombre")
          .setValue(diccionario.nombre);
        this.diccionarioFormGroup
          .get("diccionario")
          .get("tipo")
          .setValue(diccionario.tipo);
        this.diccionarioFormGroup
          .get("diccionario")
          .get("descripcion")
          .setValue(diccionario.descripcion);
      });

    this.catGramaticalService
      .buscarPorDiccionario(diccionarioId)
      .subscribe((catGramaticales) => {
        catGramaticales.forEach((catGramatical, index) => {
          this.addCatGramatical(catGramatical);

          // Tambien agregmos las subcategorias asociadas si las hay
          this.subGramaticalService
            .buscarPorCatGramatical(catGramatical.id)
            .subscribe((subGramaticales) => {
              subGramaticales.forEach((subGramatical) => {
                const catGramaticalFormGroup = this.getCatGramaticales().at(
                  index
                ) as FormGroup;
                this.addSubGramatical(catGramaticalFormGroup, subGramatical);
              });
            });
        });
      });

    // tslint:disable-next-line: forin
    for (let informacionMarcacionKey in this.informacionMarcacion) {
      this.informacionMarcacion[informacionMarcacionKey]
        .buscarPorDiccionario(diccionarioId)
        .subscribe((lista) => {
          lista.forEach((elemento) => {
            this.addInformacionMarcacion(informacionMarcacionKey, elemento);
          });
        });
    }
  }

  /* ------ Metodos para administrar las categorias y subcategorias ------ */

  getCatGramaticales(): FormArray {
    return this.diccionarioFormGroup.get("catGramaticales") as FormArray;
  }

  addCatGramatical(catGramatical: CatGramatical) {
    const catGramaticales = this.getCatGramaticales();

    if (catGramatical !== undefined) {
      catGramaticales.push(
        this.formBuilder.group({
          id: this.formBuilder.control(catGramatical.id),
          nombre: this.formBuilder.control(catGramatical.nombre),
          abreviatura: this.formBuilder.control(catGramatical.abreviatura),
          descripcion: this.formBuilder.control(catGramatical.descripcion),
          subGramaticales: this.formBuilder.array([]),
        })
      );
    } else {
      catGramaticales.push(
        this.formBuilder.group({
          nombre: this.formBuilder.control(""),
          abreviatura: this.formBuilder.control(""),
          descripcion: this.formBuilder.control(""),
          subGramaticales: this.formBuilder.array([]),
        })
      );
    }
  }

  deleteCatGramatical(index: number) {
    const catGramaticales = this.getCatGramaticales();
    const catGramatical = catGramaticales.at(index) as FormGroup;

    if (this.getSubGramaticales(catGramatical).length === 0) {
      const id = catGramaticales.at(index).value.id;
      if (id) {
        this.catGramaticalesEliminadas.push(id);
      }

      catGramaticales.removeAt(index);
    }
  }

  getSubGramaticales(catGramatical: FormGroup): FormArray {
    return catGramatical.get("subGramaticales") as FormArray;
  }

  addSubGramatical(catGramatical: FormGroup, subGramatical: SubGramatical) {
    const subGramaticales = this.getSubGramaticales(catGramatical);

    if (subGramatical !== undefined) {
      subGramaticales.push(
        this.formBuilder.group({
          id: this.formBuilder.control(subGramatical.id),
          nombre: this.formBuilder.control(subGramatical.nombre),
          abreviatura: this.formBuilder.control(subGramatical.abreviatura),
          descripcion: this.formBuilder.control(subGramatical.descripcion),
        })
      );
    } else {
      subGramaticales.push(
        this.formBuilder.group({
          nombre: this.formBuilder.control(""),
          abreviatura: this.formBuilder.control(""),
          descripcion: this.formBuilder.control(""),
        })
      );
    }
  }

  deleteSubGramatical(catGramatical: FormGroup, index: number) {
    const subGramaticales = this.getSubGramaticales(catGramatical);

    const id = subGramaticales.at(index).value.id;
    if (id) {
      this.subGramaticalesEliminadas.push(id);
    }

    subGramaticales.removeAt(index);
  }

  /* ------ Metodos para administrar la informacion y marcacion ------ */

  getInformacionMarcacion(nombre): FormArray {
    return this.diccionarioFormGroup.get(nombre).get("lista") as FormArray;
  }

  addInformacionMarcacion(nombre, elemento: InformacionMarcacion) {
    const lista = this.getInformacionMarcacion(nombre);

    if (elemento !== undefined) {
      lista.push(
        this.formBuilder.group({
          id: this.formBuilder.control(elemento.id),
          nombre: this.formBuilder.control(elemento.nombre),
          descripcion: this.formBuilder.control(elemento.descripcion),
        })
      );
    } else {
      lista.push(
        this.formBuilder.group({
          nombre: this.formBuilder.control(""),
          descripcion: this.formBuilder.control(""),
        })
      );
    }
  }

  deleteInformacionMarcacion(nombre, index) {
    const lista = this.getInformacionMarcacion(nombre);

    const id = lista.at(index).value.id;
    if (id) {
      if (this.informacionMarcacionEliminadas[nombre] === undefined) {
        this.informacionMarcacionEliminadas[nombre] = [];
      }

      this.informacionMarcacionEliminadas[nombre].push(id);
    }

    lista.removeAt(index);
  }

  /* ----- Metodos para guardar en la base de datos ----- */

  onSubmit() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;

    const diccionario = this.diccionarioFormGroup.value
      .diccionario as Diccionario;

    // Primero modificamos el diccionario
    this.diccionarioService
      .actualizar(diccionarioId, diccionario)
      .subscribe((diccionarioActualizado) => {
        // Agregamos las categorias a la base de datos
        const catGramaticales = this.diccionarioFormGroup.value
          .catGramaticales as CatGramatical[];

        catGramaticales.forEach((catGramatical) => {
          // Caso para actualizar
          if (catGramatical.id !== undefined) {
            this.catGramaticalService
              .actualizar(catGramatical.id, catGramatical)
              .subscribe((categoriaActualizada) => {
                // Agregamos las subcategorias a la base de datos
                const subGramaticales = catGramatical.subGramaticales;

                subGramaticales.forEach((subGramatical) => {
                  // Caso donde se actualiza
                  if (subGramatical.id !== undefined) {
                    this.subGramaticalService
                      .actualizar(subGramatical.id, subGramatical)
                      .subscribe();
                  } else {
                    this.subGramaticalService
                      .crear(categoriaActualizada.id, subGramatical)
                      .subscribe();
                  }
                });
              });
          } else {
            this.catGramaticalService
              .crear(diccionarioActualizado.id, catGramatical)
              .subscribe((categoriaNueva) => {
                // Agregamos las subcategorias a la base de datos
                const subGramaticales = catGramatical.subGramaticales;

                subGramaticales.forEach((subGramatical) => {
                  this.subGramaticalService
                    .crear(categoriaNueva.id, subGramatical)
                    .subscribe();
                });
              });
          }
        });

        // Agregamos las marcaciones e informacion utilizando sus servicios respectivos
        let listaInfMar;
        for (let nombreServicio in this.informacionMarcacion) {
          // tslint:disable-next-line: forin
          listaInfMar = this.diccionarioFormGroup.value[nombreServicio][
            "lista"
          ];

          for (let infMar of listaInfMar) {
            if (infMar.id !== undefined) {
              this.informacionMarcacion[nombreServicio]
                .actualizar(infMar.id, infMar)
                .subscribe();
            } else {
              this.informacionMarcacion[nombreServicio]
                .crear(diccionarioActualizado.id, infMar)
                .subscribe();
            }
          }
        }

        // Realizamos las eliminaciones

        this.catGramaticalesEliminadas.forEach((catGramaticalId) => {
          this.catGramaticalService.eliminar(catGramaticalId).subscribe();
        });

        this.subGramaticalesEliminadas.forEach((subGramaticalId) => {
          this.subGramaticalService.eliminar(subGramaticalId).subscribe();
        });

        // tslint:disable-next-line: forin
        for (let key in this.informacionMarcacionEliminadas) {
          this.informacionMarcacionEliminadas[key].forEach((infMarId) => {
            this.informacionMarcacion[key].eliminar(infMarId).subscribe();
          });
        }

        this.router.navigate(["inicio"]);
      });
  }

  cancelar() {
    this.router.navigate(["inicio"]);
  }
}
