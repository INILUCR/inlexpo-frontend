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

  constructor(
    private route: ActivatedRoute,
    private acepcionService: AcepcionService,
    private articuloService: ArticuloService,
    private diccionarioService: DiccionarioService,
    private diccionarioPdf: DiccionarioAPdfService,
    private router: Router
  ) {}

  ngOnInit() {
    const diccionarioId = this.route.snapshot.params.diccionarioId;

    // Pedimos el diccionario
    this.diccionario = this.diccionarioService.buscarPorId(diccionarioId);

    // Pedimos los articulos
    this.articulos = this.articuloService.buscarPorDiccionario(diccionarioId);
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
}
