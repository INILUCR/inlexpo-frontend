import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfOrtograficaService {
  private infOrtograficaUrl: string;

  constructor(private http: HttpClient) {
    this.infOrtograficaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.infOrtograficaUrl + diccionarioId + "/infOrtografica"
    );
  }

  public crear(
    diccionarioId: number,
    infOrtografica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.infOrtograficaUrl + diccionarioId + "/infOrtografica",
      infOrtografica
    );
  }
}
