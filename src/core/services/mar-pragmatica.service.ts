import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarPragmaticaService {
  private marPragmaticaUrl1: string;
  private marPragmaticaUrl2: string;

  constructor(private http: HttpClient) {
    this.marPragmaticaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.marPragmaticaUrl2 = "http://localhost:8080/inlexpo/marPragmatica/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marPragmaticaUrl1 + diccionarioId + "/marPragmatica"
    );
  }

  public crear(
    diccionarioId: number,
    marPragmatica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marPragmaticaUrl1 + diccionarioId + "/marPragmatica",
      marPragmatica
    );
  }

  public actualizar(
    marPragmaticaId: number,
    marPragmatica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.marPragmaticaUrl2 + marPragmaticaId,
      marPragmatica
    );
  }

  public eliminar(marPragmaticaId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.marPragmaticaUrl2 + marPragmaticaId);
  }
}
