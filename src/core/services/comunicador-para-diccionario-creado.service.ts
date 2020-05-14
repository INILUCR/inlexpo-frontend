import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Diccionario } from '../models/diccionario';

@Injectable({
  providedIn: 'root'
})
export class ComunicadorParaDiccionarioCreadoService {
  // Observable string sources
  private emitChangeSource = new BehaviorSubject<Diccionario>(null);
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: Diccionario) {
    this.emitChangeSource.next(change);
  }
}
