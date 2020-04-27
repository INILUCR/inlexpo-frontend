import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatGrmDiccionario } from '../models/cat-grm-diccionario';
import {Diccionario} from '../models/diccionario';

@Injectable({
  providedIn: 'root'
})
export class CatGrmDiccionarioService {
  private catGrmDiccionariolUrl: string;

  constructor(private http: HttpClient) {
    this.catGrmDiccionariolUrl = 'http://localhost:8080/inlexpo/diccionario/catGramatical';
  }

  public crear(categoriasAsociadas: CatGrmDiccionario[]): Observable<CatGrmDiccionario[]> {
    return this.http.post<CatGrmDiccionario[]>(this.catGrmDiccionariolUrl + '/varias', categoriasAsociadas);
  }
}
