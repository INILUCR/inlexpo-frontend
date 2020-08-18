import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarDiatecnicaService {
  private marDiatecnicaUrl1: string;
  private marDiatecnicaUrl2: string;

  constructor(private http: HttpClient) {
    this.marDiatecnicaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.marDiatecnicaUrl2 = "http://localhost:8080/inlexpo/marDiatecnica/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marDiatecnicaUrl1 + diccionarioId + "/marDiatecnica"
    );
  }

  public crear(
    diccionarioId: number,
    marDiatecnica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marDiatecnicaUrl1 + diccionarioId + "/marDiatecnica",
      marDiatecnica
    );
  }

  public actualizar(
    marDiatecnicaId: number,
    marDiatecnica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.marDiatecnicaUrl2 + marDiatecnicaId,
      marDiatecnica
    );
  }

  public eliminar(marDiatecnicaId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.marDiatecnicaUrl2 + marDiatecnicaId);
  }
}
