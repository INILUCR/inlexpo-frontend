import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MarDiatopica } from "../models/mar-diatopica";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarDiatopicaService {
  private marDiatopicaUrl: string;

  constructor(private http: HttpClient) {
    this.marDiatopicaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<MarDiatopica[]> {
    return this.http.get<MarDiatopica[]>(
      this.marDiatopicaUrl + diccionarioId + "/marDiatopica"
    );
  }

  public crear(
    diccionarioId: number,
    marDiatopica: MarDiatopica
  ): Observable<MarDiatopica> {
    return this.http.post<MarDiatopica>(
      this.marDiatopicaUrl + diccionarioId + "/marDiatopica",
      marDiatopica
    );
  }
}
