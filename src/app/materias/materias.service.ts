
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { IMateria } from './materia';
@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private apiURL = this.baseUrl + 'api/materias';
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getMaterias(): Observable<IMateria[]> {
    return this.http.get<IMateria[]>(this.apiURL);
  }

  setMateria(materia: IMateria): Observable<IMateria> {
    return this.http.post<IMateria>(this.apiURL, materia);
  }

  deleteMateria(materiaId: string): Observable<IMateria> {
    return this.http.delete<IMateria>(this.apiURL + '/' + materiaId);
  }


}
