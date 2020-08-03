import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarPragmaticaService {
  private marPragmaticaUrl: string;

  constructor(private http: HttpClient) {
    this.marPragmaticaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marPragmaticaUrl + diccionarioId + "/marPragmatica"
    );
  }

  public crear(
    diccionarioId: number,
    marPragmatica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marPragmaticaUrl + diccionarioId + "/marPragmatica",
      marPragmatica
    );
  }
}
