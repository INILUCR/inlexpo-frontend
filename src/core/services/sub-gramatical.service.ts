import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubGramatical } from '../models/sub-gramatical';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubGramaticalService {
  private subGramaticalUrl: string;

  constructor(private http: HttpClient) {
    this.subGramaticalUrl = 'http://localhost:8080/inlexpo/catGramatical/';
  }

  public buscarPorCatGramatical(catGramaticalId: number): Observable<SubGramatical[]> {
    return this.http.get<SubGramatical[]>(this.subGramaticalUrl + catGramaticalId + '/subGramatical');
  }

  public crear(catGramaticalId: number, subGramatical: SubGramatical): Observable<SubGramatical> {
    return this.http.post<SubGramatical>(this.subGramaticalUrl + catGramaticalId + '/subGramatical', subGramatical);
  }
}