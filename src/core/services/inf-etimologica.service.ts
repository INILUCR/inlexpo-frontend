import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfEtimologicaService {
  private infEtimologicaUrl1: string;
  private infEtimologicaUrl2: string;

  constructor(private http: HttpClient) {
    this.infEtimologicaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.infEtimologicaUrl2 = "http://localhost:8080/inlexpo/infEtimologica/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.infEtimologicaUrl1 + diccionarioId + "/infEtimologica"
    );
  }

  public crear(
    diccionarioId: number,
    infEtimologica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.infEtimologicaUrl1 + diccionarioId + "/infEtimologica",
      infEtimologica
    );
  }

  public actualizar(
    infEtimologicaId: number,
    infEtimologica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.infEtimologicaUrl2 + infEtimologicaId,
      infEtimologica
    );
  }

  public eliminar(infEtimologicaId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.infEtimologicaUrl2 + infEtimologicaId
    );
  }
}
