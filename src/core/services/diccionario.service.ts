import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Diccionario } from '../models/diccionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiccionarioService {
  private diccionarioUrl = 'http://localhost:8080/inlexpo/diccionarios';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Diccionario[]> {
    return this.http.get<Diccionario[]>(this.diccionarioUrl);
  }
}
