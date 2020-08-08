import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Articulo } from "../models/articulo";
import { DatosAcepcion } from "../models/datos-acepcion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BusquedaAvanzadaService {
  private busquedaUrl = "http://localhost:8080/inlexpo/diccionario/";

  constructor(private http: HttpClient) {}

  public busquedaAvanzada(
    diccionarioId: number,
    datosAcepcion: DatosAcepcion
  ): Observable<Articulo[]> {
    return this.http.post<Articulo[]>(
      this.busquedaUrl + diccionarioId + "/busquedaAvanzada",
      datosAcepcion
    );
  }
}
