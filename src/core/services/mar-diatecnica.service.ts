import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarDiatecnicaService {
  private marDiatecnicaUrl: string;

  constructor(private http: HttpClient) {
    this.marDiatecnicaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marDiatecnicaUrl + diccionarioId + "/marDiatecnica"
    );
  }

  public crear(
    diccionarioId: number,
    marDiatecnica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marDiatecnicaUrl + diccionarioId + "/marDiatecnica",
      marDiatecnica
    );
  }
}
