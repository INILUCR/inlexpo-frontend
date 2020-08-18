import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfMorfologicaService {
  private infMorfologicaUrl1: string;
  private infMorfologicaUrl2: string;

  constructor(private http: HttpClient) {
    this.infMorfologicaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.infMorfologicaUrl2 = "http://localhost:8080/inlexpo/infMorfologica/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.infMorfologicaUrl1 + diccionarioId + "/infMorfologica"
    );
  }

  public crear(
    diccionarioId: number,
    infMorfologica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.infMorfologicaUrl1 + diccionarioId + "/infMorfologica",
      infMorfologica
    );
  }

  public actualizar(
    infMorfologicaId: number,
    infMorfologica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.infMorfologicaUrl2 + infMorfologicaId,
      infMorfologica
    );
  }

  public eliminar(infMorfologicaId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.infMorfologicaUrl2 + infMorfologicaId
    );
  }
}
