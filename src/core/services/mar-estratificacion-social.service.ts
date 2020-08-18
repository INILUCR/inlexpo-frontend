import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarEstratificacionSocialService {
  private marEstratificacionSocialUrl1: string;
  private marEstratificacionSocialUrl2: string;

  constructor(private http: HttpClient) {
    this.marEstratificacionSocialUrl1 =
      "http://localhost:8080/inlexpo/diccionario/";
    this.marEstratificacionSocialUrl2 =
      "http://localhost:8080/inlexpo/marEstratificacionSocial/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marEstratificacionSocialUrl1 +
        diccionarioId +
        "/marEstratificacionSocial"
    );
  }

  public crear(
    diccionarioId: number,
    marEstratificacionSocial: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marEstratificacionSocialUrl1 +
        diccionarioId +
        "/marEstratificacionSocial",
      marEstratificacionSocial
    );
  }

  public actualizar(
    marEstratificacionSocialId: number,
    marEstratificacionSocial: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.marEstratificacionSocialUrl2 + marEstratificacionSocialId,
      marEstratificacionSocial
    );
  }

  public eliminar(marEstratificacionSocialId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.marEstratificacionSocialUrl2 + marEstratificacionSocialId
    );
  }
}
