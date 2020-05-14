import { Component, OnInit } from '@angular/core';
import { Diccionario } from '../../../core/models/diccionario';
import { DiccionarioService } from '../../../core/services/diccionario.service';
import { CatGrmDiccionario } from '../../../core/models/cat-grm-diccionario';
import { SubGrmDiccionario } from '../../../core/models/sub-grm-diccionario';
import { ComunicadorParaCategoriasAsociadasService } from '../../../core/services/comunicador-para-categorias-asociadas.service';
import { ComunicadorParaDiccionarioCreadoService } from '../../../core/services/comunicador-para-diccionario-creado.service';
import { Router } from '@angular/router';
import { CatGrmDiccionarioService } from '../../../core/services/cat-grm-diccionario.service';
import { SubGrmDiccionarioService } from '../../../core/services/sub-grm-diccionario.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-agregar-diccionario',
  templateUrl: './agregar-diccionario.component.html',
  styleUrls: ['./agregar-diccionario.component.sass']
})
export class AgregarDiccionarioComponent implements OnInit {

  nuevoDiccionario: Diccionario;
  categoriasAsociadas: CatGrmDiccionario[];
  subcategoriasAsociadas: SubGrmDiccionario[];

  cdcServiceSubscription: Subscription;
  ccaServiceSubscription: Subscription;

  constructor(private diccionarioService: DiccionarioService,
              private cdcService: ComunicadorParaDiccionarioCreadoService,
              private ccaService: ComunicadorParaCategoriasAsociadasService,
              private catGrmDicService: CatGrmDiccionarioService,
              private subGrmDicService: SubGrmDiccionarioService,
              private router: Router) {
    this.cdcServiceSubscription = cdcService.changeEmitted$.subscribe(nuevoDiccionario => {
      this.onDiccionarioCreado(nuevoDiccionario);
    });


    this.ccaServiceSubscription = ccaService.changeEmitted$.subscribe(catSubAsociadas => {
      this.onCatSubAsociadas(catSubAsociadas);
      this.unsubscribe();
    });
  }

  ngOnInit() {
  }

  onDiccionarioCreado(nuevoDiccionario: Diccionario) {
    this.nuevoDiccionario = nuevoDiccionario;
  }

  onCatSubAsociadas(catSubAsociadas: any[]) {
    this.diccionarioService.crear(this.nuevoDiccionario).subscribe(nuevoDiccionario => {
      this.nuevoDiccionario = nuevoDiccionario;

      this.categoriasAsociadas = catSubAsociadas[0];
      for (var categoriaAsociada of this.categoriasAsociadas) {
        categoriaAsociada.diccionarioId = this.nuevoDiccionario.id;
      }

      this.catGrmDicService.crear(this.categoriasAsociadas).subscribe( categoriasAsociadas => {
        this.subcategoriasAsociadas = catSubAsociadas[1];
        for (var subcategoriaAsociada of this.subcategoriasAsociadas) {
          subcategoriaAsociada.diccionarioId = this.nuevoDiccionario.id;
        }

        this.subGrmDicService.crear(this.subcategoriasAsociadas).subscribe(subcategoriasAsociadas => {
          this.router.navigate(['pagina-principal']);
        });
      });
    });
  }

  unsubscribe() {
    this.cdcServiceSubscription.unsubscribe();
    this.ccaServiceSubscription.unsubscribe();
  }
}
