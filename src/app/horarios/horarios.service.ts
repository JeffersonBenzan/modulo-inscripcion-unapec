import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { IHorario } from './horario';
@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private apiURL = this.baseUrl + 'api/horarios/';
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getHorarios(materiaId: string): Observable<IHorario[]> {
    return this.http.get<IHorario[]>(this.apiURL + materiaId);
  }

  setHorario(horario: IHorario): Observable<IHorario> {
    return this.http.post<IHorario>(this.apiURL, {"idHorario": horario.id});
  }

  deleteHorario(horarioId: string): Observable<IHorario> {
    return this.http.delete<IHorario>(this.apiURL + horarioId);
  }

  updateHorario(horario: IHorario): Observable<IHorario> {
    return this.http.put<IHorario>(this.apiURL + '/' + horario.id.toString(), horario);
  }
}
