import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarValoracionSocialService {
  private marValoracionSocialUrl: string;

  constructor(private http: HttpClient) {
    this.marValoracionSocialUrl = "http://localhost:8080/inlexpo/diccionario/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marValoracionSocialUrl + diccionarioId + "/marValoracionSocial"
    );
  }

  public crear(
    diccionarioId: number,
    marValoracionSocial: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marValoracionSocialUrl + diccionarioId + "/marValoracionSocial",
      marValoracionSocial
    );
  }
}
