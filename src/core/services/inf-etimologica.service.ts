import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfEtimologicaService {
  private infEtimologicaUrl: string;

  constructor(private http: HttpClient) {
    this.infEtimologicaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.infEtimologicaUrl + diccionarioId + "/infEtimologica"
    );
  }

  public crear(
    diccionarioId: number,
    infEtimologica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.infEtimologicaUrl + diccionarioId + "/infEtimologica",
      infEtimologica
    );
  }
}
