import { Component, OnInit, Input } from '@angular/core';
import { IMateria } from './materia';
import { MateriasService } from './materias.service';
import { HorariosService } from '../horarios/horarios.service';
import { IHorario } from '../horarios/horario';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  @Input() materia: IMateria;

  horarios: IHorario[]

  constructor(private materiasService: MateriasService, private horariosService: HorariosService) { }

  ngOnInit() {
  }

  descripcionCuatrimestre(idCuatrimestre) {
    return 'CUATRIMESTRE ' + idCuatrimestre;
  }

  pedirHorario(idMateria) {
    this.horariosService.getHorarios(idMateria)
    .subscribe(horarioWS => this.horarios = horarioWS,
      error => console.error('Aqui hubo un error: ', error));
  }

}
