import { Component, OnInit } from "@angular/core";
import { Diccionario } from "src/core/models/diccionario";
import { Articulo } from "src/core/models/articulo";
import { Acepcion } from "src/core/models/acepcion";
import { ActivatedRoute, Router } from "@angular/router";
import { AcepcionService } from "src/core/services/acepcion.service";
import { ArticuloService } from "src/core/services/articulo.service";
import { DiccionarioService } from "src/core/services/diccionario.service";
import { DiccionarioAPdfService } from "src/core/services/diccionario-a-pdf.service";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CatGramaticalService } from "src/core/services/cat-gramatical.service";
import { CatGramatical } from "src/core/models/cat-gramatical";
import { DatosAcepcion } from "src/core/models/datos-acepcion";
import { BusquedaAvanzadaService } from "src/core/services/busqueda-avanzada.service";

@Component({
  selector: "app-ver-articulos",
  templateUrl: "./ver-articulos.component.html",
  styleUrls: ["./ver-articulos.component.sass"],
})
export class VerArticulosComponent implements OnInit {
  diccionario: Observable<Diccionario>;
  articulos: Observable<Articulo[]>;
  acepciones: Acepcion[];

  // Guarda el articulo cuyas definiciones se estan mostrando
  articulo: Articulo;

  // Variables para filtrar por union o interseccion
  inicioYO = "y";
  contieneYO = "y";
  terminaYO = "y";

  buscadorArticuloFormGroup: FormGroup;

  // Filtros para la busqueda avanzada
  catGramaticales: Observable<CatGramatical[]>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private acepcionService: AcepcionService,
    private articuloService: ArticuloService,
    private catGramaticalService: CatGramaticalService,
    private diccionarioService: DiccionarioService,
    private diccionarioPdf: DiccionarioAPdfService,
    private busquedaAvanzadaService: BusquedaAvanzadaService,
    private router: Router
  ) {}

  ngOnInit() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;

    // Pedimos el diccionario
    this.diccionario = this.diccionarioService.buscarPorId(diccionarioId);

    // Pedimos los articulos
    this.articulos = this.articuloService.buscarPorDiccionario(diccionarioId);

    // Creamo el form para realizar busquedas avanzadas
    this.buscadorArticuloFormGroup = this.formBuilder.group({
      catGramaticalId: this.formBuilder.control(-1),
    });

    // Solicitamos los valores que apreceran en los filtros de busqueda avanzada
    this.catGramaticales = this.catGramaticalService.buscarPorDiccionario(
      diccionarioId
    );
  }

  displayAcepciones(articulo: Articulo) {
    this.articulo = articulo;
    this.acepcionService
      .buscarPorArticulo(this.articulo.id)
      .subscribe((acepciones) => {
        this.acepciones = acepciones;
      });
  }

  goToCreateArticulo() {
    this.router.navigate(["agregar-articulo"], { relativeTo: this.route });
  }

  goToModifyArticulo() {
    this.router.navigate(["modificar-articulo/" + this.articulo.id]);
  }

  exportarDiccionario() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;

    this.diccionarioPdf.crearPdf(diccionarioId, {});
  }

  onSubmit() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;
    const filtroAcepciones = this.buscadorArticuloFormGroup
      .value as DatosAcepcion;

    this.articulos = this.busquedaAvanzadaService.busquedaAvanzada(
      diccionarioId,
      filtroAcepciones
    );
  }

  removerFiltro() {
    // Devolvemos los articulos a su estilo de busqueda original
    const diccionarioId = this.route.snapshot.params.diccionarioId;
    this.articulos = this.articuloService.buscarPorDiccionario(diccionarioId);
  }
}
