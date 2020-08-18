import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SubGramatical } from "../models/sub-gramatical";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubGramaticalService {
  private subGramaticalUrl1: string;
  private subGramaticalUrl2: string;

  constructor(private http: HttpClient) {
    this.subGramaticalUrl1 = "http://localhost:8080/inlexpo/catGramatical/";
    this.subGramaticalUrl2 = "http://localhost:8080/inlexpo/subGramatical/";
  }

  public buscarPorCatGramatical(
    catGramaticalId: number
  ): Observable<SubGramatical[]> {
    return this.http.get<SubGramatical[]>(
      this.subGramaticalUrl1 + catGramaticalId + "/subGramatical"
    );
  }

  public crear(
    catGramaticalId: number,
    subGramatical: SubGramatical
  ): Observable<SubGramatical> {
    return this.http.post<SubGramatical>(
      this.subGramaticalUrl1 + catGramaticalId + "/subGramatical",
      subGramatical
    );
  }

  public actualizar(
    subGramaticalId: number,
    subGramatical: SubGramatical
  ): Observable<SubGramatical> {
    return this.http.put<SubGramatical>(
      this.subGramaticalUrl2 + subGramaticalId,
      subGramatical
    );
  }

  public eliminar(subGramaticalId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.subGramaticalUrl2 + subGramaticalId);
  }
}
