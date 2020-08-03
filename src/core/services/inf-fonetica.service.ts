import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfFoneticaService {
  private infFoneticaUrl: string;

  constructor(private http: HttpClient) {
    this.infFoneticaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.infFoneticaUrl + diccionarioId + "/infFonetica"
    );
  }

  public crear(
    diccionarioId: number,
    infFonetica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.infFoneticaUrl + diccionarioId + "/infFonetica",
      infFonetica
    );
  }
}
