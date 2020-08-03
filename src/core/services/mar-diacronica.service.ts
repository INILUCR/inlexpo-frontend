import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarDiacronicaService {
  private marDiacronicaUrl: string;

  constructor(private http: HttpClient) {
    this.marDiacronicaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marDiacronicaUrl + diccionarioId + "/marDiacronica"
    );
  }

  public crear(
    diccionarioId: number,
    marDiacronica: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marDiacronicaUrl + diccionarioId + "/marDiacronica",
      marDiacronica
    );
  }
}
