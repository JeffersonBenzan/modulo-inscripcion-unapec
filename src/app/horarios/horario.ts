export interface IHorario {
    id: number,
    idMateria: number,
    estado: boolean,
    aula: string,
    grupo: string,
    lun: string,
    mar: string,
    mier: string,
    jue: string,
    vie: string,
    sab: string,
    dom: string,
    modulo: number,
    seleccionado: boolean
}
