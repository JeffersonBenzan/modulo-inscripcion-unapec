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

  public horariosSeleccionado: any[] = [];



  constructor(private materiasService: MateriasService, private horariosService: HorariosService) { }
  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materiasService.getMaterias()
      .subscribe(materiasWS => {
        console.log(materiasWS)
        this.materias = materiasWS


        this.materias.forEach(element => {
          element.estado = false;

        });
      },
        error => console.error('Aqui hubo un error: ', error));
  }

  pedirHorario(materia) {


    materia.seleccionado = true;
    this.materias.filter(x => x.id !== materia.id).forEach(element => {
      element.seleccionado = false;
    });

    this.horariosService.getHorarios(materia.id)
    .subscribe(horarioWS => {
      this.textoMateria = materia.codigo + ' - ' + materia.descripcion;
      this.horarios = horarioWS
      console.log('Me llegaron estos horarios: ')
      console.log(this.horarios)

      this.horarios.forEach(element => {
        element.seleccionado = true;
      });
    },
      error => console.error('Aqui hubo un error: ', error));

  }

  inscribir(horario) {

    horario.estado = !horario.estado;
    this.horarios.filter(x => x.id !== horario.id).forEach(element => {
      element.seleccionado = !element.seleccionado;
    });

    this.materias.filter(x => x.id === horario.idMateria).forEach(element => {
      element.estado = horario.estado;
    });


    this.horariosService.setHorario(horario)
    .subscribe(res => {
      console.log('Respuesta: ', res)
      const mensaje = horario.estado ? ' inscrita ' : ' eliminada ';
      // alert('Materia' + mensaje + 'satisfactoriamente')

      if(horario.estado){
        this.horariosSeleccionado.push(horario);
      }

      console.log("Horario seleccionado: ", this.horariosSeleccionado)
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
