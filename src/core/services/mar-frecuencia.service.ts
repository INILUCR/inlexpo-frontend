import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarFrecuenciaService {
  private marFrecuenciaUrl1: string;
  private marFrecuenciaUrl2: string;

  constructor(private http: HttpClient) {
    this.marFrecuenciaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.marFrecuenciaUrl2 = "http://localhost:8080/inlexpo/marFrecuencia/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marFrecuenciaUrl1 + diccionarioId + "/marFrecuencia"
    );
  }

  public crear(
    diccionarioId: number,
    marFrecuencia: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marFrecuenciaUrl1 + diccionarioId + "/marFrecuencia",
      marFrecuencia
    );
  }

  public actualizar(
    marFrecuenciaId: number,
    marFrecuencia: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.marFrecuenciaUrl2 + marFrecuenciaId,
      marFrecuencia
    );
  }

  public eliminar(marFrecuenciaId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.marFrecuenciaUrl2 + marFrecuenciaId);
  }
}
