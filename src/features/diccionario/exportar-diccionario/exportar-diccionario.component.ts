import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DiccionarioAPdfService } from "src/core/services/diccionario-a-pdf.service";

@Component({
  selector: "app-exportar-diccionario",
  templateUrl: "./exportar-diccionario.component.html",
  styleUrls: ["./exportar-diccionario.component.sass"],
})
export class ExportarDiccionarioComponent implements OnInit {
  exportarFormGroup: FormGroup;

  elementosAcepcion = [
    "definicion",
    "catGramatical",
    "subGramatical",
    "infEtimologica",
    "infFonetica",
    "infMorfologica",
    "infOrtografica",
    "marDiacronica",
    "marDiatecnica",
    "marDiatopica",
    "marEstratificacionSocial",
    "marFrecuencia",
    "marPragmatica",
    "marValoracionSocial",
  ];
  nombreElementosAcepcion = [
    "Definición",
    "Categoría Gramatical",
    "Subcatgoría Gramatical",
    "Información Etimológica",
    "Información Fonética",
    "Información Morfológica",
    "Información Ortográfica",
    "Marcación Diacrónica",
    "Marcación Diatécnica",
    "Marcación Diatópica",
    "Marcación de Estratificación Social",
    "Marcación Frecuencia",
    "Marcación Pragmática",
    "Marcación de Valoración Social",
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private diccionarioPdf: DiccionarioAPdfService,
    private router: Router
  ) {}

  ngOnInit() {
    this.exportarFormGroup = this.formBuilder.group({
      orden: this.formBuilder.group({
        definicion: this.formBuilder.control(0),
        catGramatical: this.formBuilder.control(0),
        subGramatical: this.formBuilder.control(0),
        infEtimologica: this.formBuilder.control(0),
        infFonetica: this.formBuilder.control(0),
        infMorfologica: this.formBuilder.control(0),
        infOrtografica: this.formBuilder.control(0),
        marDiacronica: this.formBuilder.control(0),
        marDiatecnica: this.formBuilder.control(0),
        marDiatopica: this.formBuilder.control(0),
        marEstratificacionSocial: this.formBuilder.control(0),
        marFrecuencia: this.formBuilder.control(0),
        marPragmatica: this.formBuilder.control(0),
        marValoracionSocial: this.formBuilder.control(0),
      }),
      lema: this.crearFormGroupStilos(),
      definicion: this.crearFormGroupStilos(),
      catGramatical: this.crearFormGroupStilos(),
      subGramatical: this.crearFormGroupStilos(),
      infEtimologica: this.crearFormGroupStilos(),
      infFonetica: this.crearFormGroupStilos(),
      infMorfologica: this.crearFormGroupStilos(),
      infOrtografica: this.crearFormGroupStilos(),
      marDiacronica: this.crearFormGroupStilos(),
      marDiatecnica: this.crearFormGroupStilos(),
      marDiatopica: this.crearFormGroupStilos(),
      marEstratificacionSocial: this.crearFormGroupStilos(),
      marFrecuencia: this.crearFormGroupStilos(),
      marPragmatica: this.crearFormGroupStilos(),
      marValoracionSocial: this.crearFormGroupStilos(),
    });
  }

  crearFormGroupStilos(): FormGroup {
    return this.formBuilder.group({
      font: this.formBuilder.control("Roboto"),
      fontSize: this.formBuilder.control(12),
      bold: this.formBuilder.control(false),
      italics: this.formBuilder.control(false),
      decoration: this.formBuilder.control(false),
      decorationStyle: this.formBuilder.control(false),
    });
  }

  onSubmit() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;

    // Creamo una copia de los valores para no alterar el form group
    const estilos = Object.assign({}, this.exportarFormGroup.value);
    const orden = Object.assign({}, estilos.orden);
    delete estilos.orden;

    const ordenPorNombre = [];

    for (let nombre in orden) {
      if (orden[nombre] > 0) {
        ordenPorNombre[orden[nombre] - 1] = nombre;
      }
    }

    this.diccionarioPdf.crearPdf(diccionarioId, estilos, ordenPorNombre);
  }

  regresarAVistaArticulos() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;
    this.router.navigate(["diccionario/" + diccionarioId]);
  }
}
