import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Acepcion } from '../models/acepcion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcepcionService {
  private acepcionUrl = 'http://localhost:8080/inlexpo/articulo/';

  constructor(private http: HttpClient) { }

  public buscarPorArticulo(articuloId: number): Observable<Acepcion[]> {
    return this.http.get<Acepcion[]>(this.acepcionUrl + articuloId + '/acepcion');
  }
}