import { IMateria } from './materias/materia';

export interface ICuatrimestre {
    id: number,
    materias: IMateria[],
}
