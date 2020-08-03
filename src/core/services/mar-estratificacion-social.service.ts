import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarEstratificacionSocialService {
  private marEstratificacionSocialUrl: string;

  constructor(private http: HttpClient) {
    this.marEstratificacionSocialUrl =
      "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marEstratificacionSocialUrl +
        diccionarioId +
        "/marEstratificacionSocial"
    );
  }

  public crear(
    diccionarioId: number,
    marEstratificacionSocial: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marEstratificacionSocialUrl +
        diccionarioId +
        "/marEstratificacionSocial",
      marEstratificacionSocial
    );
  }
}
