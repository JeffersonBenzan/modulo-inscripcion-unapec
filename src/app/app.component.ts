import { Component, OnInit } from '@angular/core';
import { IHorario } from './horarios/horario';
import { IMateria } from './materias/materia';
import { HorariosService } from './horarios/horarios.service';
import { MateriasService } from './materias/materias.service';
import { MateriasComponent } from './materias/materias.component';
import { HorariosComponent } from './horarios/horarios.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'matriculacion';

  public materias: IMateria[];
  public horarios: IHorario[];
  public textoMateria: string;
  public cuatrimestres: IMateria[];
  public cuatrimestre1: IMateria[];
  public cuatrimestre2: IMateria[];
  public cuatrimestre3: IMateria[];
  public cuatrimestre4: IMateria[];
  public cuatrimestre5: IMateria[];
  public cuatrimestre6: IMateria[];
  public cuatrimestre7: IMateria[];
  public cuatrimestre8: IMateria[];
  public cuatrimestre9: IMateria[];
  public cuatrimestre10: IMateria[];
  public cuatrimestre11: IMateria[];
  public cuatrimestre12: IMateria[];


  constructor(private materiasService: MateriasService, private horariosService: HorariosService) { }
  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materiasService.getMaterias()
      .subscribe(materiasWS => {
        console.log(materiasWS)
        this.materias = materiasWS
      },
        error => console.error('Aqui hubo un error: ', error));
  }




  pedirHorario(materia) {
    this.horariosService.getHorarios(materia.id)
    .subscribe(horarioWS => {
      this.textoMateria = materia.descripcion;
      this.horarios = horarioWS
    },
      error => console.error('Aqui hubo un error: ', error));

  }

  mostrar(mate) {
    console.log(mate);
  }
  descripcionCuatrimestre(idCuatrimestre) {
    return 'CUATRIMESTRE ' + idCuatrimestre;
  }


}
