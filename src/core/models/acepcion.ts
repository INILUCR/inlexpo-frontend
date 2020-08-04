import { CatGramatical } from "./cat-gramatical";
import { SubGramatical } from "./sub-gramatical";
import { InformacionMarcacion } from "./informacion-o-marcacion";

export class Acepcion {
  id: number;
  definicion: string;
  prioridad: number;
  catGramatical: CatGramatical;
  subGramatical: SubGramatical;
  infEtimologica: InformacionMarcacion;
  infFonetica: InformacionMarcacion;
  infMorfologica: InformacionMarcacion;
  infOrtografica: InformacionMarcacion;
  marDiacronica: InformacionMarcacion;
  marDiatecnica: InformacionMarcacion;
  marDiatopica: InformacionMarcacion;
  marEstratificacionSocial: InformacionMarcacion;
  marFrecuencia: InformacionMarcacion;
  marPragmatica: InformacionMarcacion;
  marValoracionSocial: InformacionMarcacion;
}
