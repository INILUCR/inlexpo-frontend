import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatGramatical } from '../models/cat-gramatical';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatGramaticalService {
  private catGramaticalUrl: string;

  constructor(private http: HttpClient) {
    this.catGramaticalUrl = 'http://localhost:8080/inlexpo/diccionario/';
  }

  public crear(diccionarioId: number, catGramatical: CatGramatical): Observable<CatGramatical> {
    return this.http.post<CatGramatical>(this.catGramaticalUrl + diccionarioId + '/catGramatical', catGramatical);
  }
}
