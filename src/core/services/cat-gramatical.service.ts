import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CatGramatical } from "../models/cat-gramatical";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CatGramaticalService {
  private catGramaticalUrl1: string;
  private catGramaticalUrl2: string;

  constructor(private http: HttpClient) {
    this.catGramaticalUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.catGramaticalUrl2 = "http://localhost:8080/inlexpo/catGramatical/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<CatGramatical[]> {
    return this.http.get<CatGramatical[]>(
      this.catGramaticalUrl1 + diccionarioId + "/catGramatical"
    );
  }

  public crear(
    diccionarioId: number,
    catGramatical: CatGramatical
  ): Observable<CatGramatical> {
    return this.http.post<CatGramatical>(
      this.catGramaticalUrl1 + diccionarioId + "/catGramatical",
      catGramatical
    );
  }

  public actualizar(
    catGramaticalId: number,
    catGramatical: CatGramatical
  ): Observable<CatGramatical> {
    return this.http.put<CatGramatical>(
      this.catGramaticalUrl2 + catGramaticalId,
      catGramatical
    );
  }

  public eliminar(catGramaticalId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.catGramaticalUrl2 + catGramaticalId);
  }
}
