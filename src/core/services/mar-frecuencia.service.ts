import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarFrecuenciaService {
  private marFrecuenciaUrl: string;

  constructor(private http: HttpClient) {
    this.marFrecuenciaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marFrecuenciaUrl + diccionarioId + "/marFrecuencia"
    );
  }

  public crear(
    diccionarioId: number,
    marFrecuencia: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marFrecuenciaUrl + diccionarioId + "/marFrecuencia",
      marFrecuencia
    );
  }
}
