import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarDiacronicaService {
  private marDiacronicaUrl1: string;
  private marDiacronicaUrl2: string;

  constructor(private http: HttpClient) {
    this.marDiacronicaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.marDiacronicaUrl2 = "http://localhost:8080/inlexpo/marDiacronica/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marDiacronicaUrl1 + diccionarioId + "/marDiacronica"
    );
  }

  public crear(
    diccionarioId: number,
    marDiacronica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marDiacronicaUrl1 + diccionarioId + "/marDiacronica",
      marDiacronica
    );
  }

  public actualizar(
    marDiacronicaId: number,
    marDiacronica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.marDiacronicaUrl2 + marDiacronicaId,
      marDiacronica
    );
  }

  public eliminar(marDiacronicaId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.marDiacronicaUrl2 + marDiacronicaId);
  }
}
