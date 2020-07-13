import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Articulo } from '../models/articulo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private articuloUrl = 'http://localhost:8080/inlexpo/diccionario/';

  constructor(private http: HttpClient) { }

  public buscarPorDiccionario(diccionarioId: number): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.articuloUrl + diccionarioId + '/articulo');
  }
}
