import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Acepcion } from "../models/acepcion";
import { Observable } from "rxjs";
import { DatosAcepcion } from "../models/datos-acepcion";

@Injectable({
  providedIn: "root",
})
export class AcepcionService {
  private acepcionUrl = "http://localhost:8080/inlexpo/articulo/";

  constructor(private http: HttpClient) {}

  public buscarPorArticulo(articuloId: number): Observable<Acepcion[]> {
    return this.http.get<Acepcion[]>(
      this.acepcionUrl + articuloId + "/acepcion"
    );
  }

  public crear(
    articuloId: number,
    datosAcepcion: DatosAcepcion
  ): Observable<Acepcion> {
    return this.http.post<Acepcion>(
      this.acepcionUrl + articuloId + "/acepcion",
      datosAcepcion
    );
  }

  public actualizar(
    articuloId: number,
    acepcionId: number,
    datosAcepcion: DatosAcepcion
  ): Observable<Acepcion> {
    return this.http.put<Acepcion>(
      this.acepcionUrl + articuloId + "/acepcion/" + acepcionId,
      datosAcepcion
    );
  }

  public eliminar(articuloId: number, acepcionId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.acepcionUrl + articuloId + "/acepcion/" + acepcionId
    );
  }
}
