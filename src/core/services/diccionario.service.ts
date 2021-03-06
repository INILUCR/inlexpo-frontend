import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Diccionario } from "../models/diccionario";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DiccionarioService {
  private diccionarioUrl = "http://localhost:8080/inlexpo/diccionario/";

  constructor(private http: HttpClient) {}

  public buscarPorId(diccionarioId: number): Observable<Diccionario> {
    return this.http.get<Diccionario>(this.diccionarioUrl + diccionarioId);
  }

  public buscarTodos(): Observable<Diccionario[]> {
    return this.http.get<Diccionario[]>(this.diccionarioUrl);
  }

  public crear(diccionario: Diccionario): Observable<Diccionario> {
    return this.http.post<Diccionario>(this.diccionarioUrl, diccionario);
  }

  public actualizar(
    diccionarioId: number,
    diccionario: Diccionario
  ): Observable<Diccionario> {
    return this.http.put<Diccionario>(
      this.diccionarioUrl + diccionarioId,
      diccionario
    );
  }
}
