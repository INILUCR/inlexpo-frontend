import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfMorfologicaService {
  private infMorfologicaUrl: string;

  constructor(private http: HttpClient) {
    this.infMorfologicaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.infMorfologicaUrl + diccionarioId + "/infMorfologica"
    );
  }

  public crear(
    diccionarioId: number,
    infMorfologica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.infMorfologicaUrl + diccionarioId + "/infMorfologica",
      infMorfologica
    );
  }
}
