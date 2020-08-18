import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfOrtograficaService {
  private infOrtograficaUrl1: string;
  private infOrtograficaUrl2: string;

  constructor(private http: HttpClient) {
    this.infOrtograficaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.infOrtograficaUrl2 = "http://localhost:8080/inlexpo/infOrtografica/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.infOrtograficaUrl1 + diccionarioId + "/infOrtografica"
    );
  }

  public crear(
    diccionarioId: number,
    infOrtografica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.infOrtograficaUrl1 + diccionarioId + "/infOrtografica",
      infOrtografica
    );
  }

  public actualizar(
    infOrtograficaId: number,
    infOrtografica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.infOrtograficaUrl2 + infOrtograficaId,
      infOrtografica
    );
  }

  public eliminar(infOrtograficaId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.infOrtograficaUrl2 + infOrtograficaId
    );
  }
}
