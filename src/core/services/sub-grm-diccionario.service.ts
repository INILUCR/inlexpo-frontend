import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubGrmDiccionario } from '../models/sub-grm-diccionario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubGrmDiccionarioService {
  private subGrmDiccionariolUrl: string;

  constructor(private http: HttpClient) {
    this.subGrmDiccionariolUrl = 'http://localhost:8080/inlexpo/diccionario/subGramatical';
  }

  public crear(subcategoriasAsociadas: SubGrmDiccionario[]): Observable<SubGrmDiccionario[]> {
    return this.http.post<SubGrmDiccionario[]>(this.subGrmDiccionariolUrl + '/varias', subcategoriasAsociadas);
  }
}
