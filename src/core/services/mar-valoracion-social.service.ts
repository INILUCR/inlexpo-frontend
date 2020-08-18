import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InformacionMarcacion } from "../models/informacion-o-marcacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarValoracionSocialService {
  private marValoracionSocialUrl1: string;
  private marValoracionSocialUrl2: string;

  constructor(private http: HttpClient) {
    this.marValoracionSocialUrl1 = "http://localhost:8080/inlexpo/diccionario/";
    this.marValoracionSocialUrl2 =
      "http://localhost:8080/inlexpo/marValoracionSocial/";
  }

  public buscarPorDiccionario(
    diccionarioId: number
  ): Observable<InformacionMarcacion[]> {
    return this.http.get<InformacionMarcacion[]>(
      this.marValoracionSocialUrl1 + diccionarioId + "/marValoracionSocial"
    );
  }

  public crear(
    diccionarioId: number,
    marValoracionSocial: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.post<InformacionMarcacion>(
      this.marValoracionSocialUrl1 + diccionarioId + "/marValoracionSocial",
      marValoracionSocial
    );
  }

  public actualizar(
    marValoracionSocialId: number,
    marValoracionSocial: InformacionMarcacion
  ): Observable<InformacionMarcacion> {
    return this.http.put<InformacionMarcacion>(
      this.marValoracionSocialUrl2 + marValoracionSocialId,
      marValoracionSocial
    );
  }

  public eliminar(marValoracionSocialId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.marValoracionSocialUrl2 + marValoracionSocialId
    );
  }
}
