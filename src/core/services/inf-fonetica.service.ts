import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfFoneticaService {
  private infFoneticaUrl1: string;
  private infFoneticaUrl2: string;

  constructor(private http: HttpClient) {
    this.infFoneticaUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.infFoneticaUrl2 = "http://localhost:8080/inlexpo/infFonetica/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.infFoneticaUrl1 + diccionarioId + "/infFonetica"
    );
  }

  public crear(
    diccionarioId: number,
    infFonetica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.infFoneticaUrl1 + diccionarioId + "/infFonetica",
      infFonetica
    );
  }

  public actualizar(
    infFoneticaId: number,
    infFonetica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.infFoneticaUrl2 + infFoneticaId,
      infFonetica
    );
  }

  public eliminar(infFoneticaId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.infFoneticaUrl2 + infFoneticaId);
  }
}
