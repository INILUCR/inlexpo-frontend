import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarDiatopicaService {
  private marDiatopicaUrl1: string;
  private marDiatopicaUrl2: string;

  constructor(private http: HttpClient) {
    this.marDiatopicaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.marDiatopicaUrl2 = "http://localhost:8080/inlexpo/marDiatopica/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marDiatopicaUrl1 + diccionarioId + "/marDiatopica"
    );
  }

  public crear(
    diccionarioId: number,
    marDiatopica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marDiatopicaUrl1 + diccionarioId + "/marDiatopica",
      marDiatopica
    );
  }

  public actualizar(
    marDiatopicaId: number,
    marDiatopica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.marDiatopicaUrl2 + marDiatopicaId,
      marDiatopica
    );
  }

  public eliminar(marDiatopicaId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.marDiatopicaUrl2 + marDiatopicaId);
  }
}
