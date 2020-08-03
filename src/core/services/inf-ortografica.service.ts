import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InfOrtografica } from "../models/inf-ortografica";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InfOrtograficaService {
  private infOrtograficaUrl: string;

  constructor(private http: HttpClient) {
    this.infOrtograficaUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InfOrtografica[]> {
    return this.http.get<InfOrtografica[]>(
      this.infOrtograficaUrl + diccionarioId + "/infOrtografica"
    );
  }

  public crear(
    diccionarioId: number,
    infOrtografica: InfOrtografica
  ): Observable<InfOrtografica> {
    return this.http.post<InfOrtografica>(
      this.infOrtograficaUrl + diccionarioId + "/infOrtografica",
      infOrtografica
    );
  }
}
