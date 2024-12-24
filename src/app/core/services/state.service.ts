
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Estado } from '../enum/state.enum';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private estadoSubject = new BehaviorSubject<Estado>(Estado.ORIGINAL);

  getEstado$(): Observable<Estado> {
    return this.estadoSubject.asObservable();
  }

  setEstado(novoEstado: Estado): void {
    this.estadoSubject.next(novoEstado);
  }
}
