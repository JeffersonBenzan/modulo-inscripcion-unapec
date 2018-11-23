/* 
    =========================================
    | Creado por Esteban Rodríguez          |
    | Fecha de Creación 17 Octubre 2014     |
    | Fecha de Modificación 17 Octubre 2014 |
    =========================================    
*/

/*$(document).ready(function() {
//Funcionalidad de Efecto al posicionarse sobre algún menu
   
    $('.menuactivefunction').hover(function() {
        $(this).stop(true, true).switchClass('menuContent', 'menuContentBack', 200);
        $(this).find('.titMenu').stop(true, true).switchClass('lblMenuOptionIni', 'lblMenuOptionFin', 200);
        $(this).find('.dscMenu').stop(true, true).switchClass('lblMenuDscIni', 'lblMenuDscFin', 200);
        $(this).find('.lblMenu').stop(true, true).switchClass('lblIni', 'lblFin', 200);
    },
    //Funcionalidad de Efecto al quitar el mouse de algún menu
    function() {
        $(this).stop(true, true).switchClass('menuContentBack', 'menuContent', 200);
        $(this).find('.titMenu').stop(true, true).switchClass('lblMenuOptionFin', 'lblMenuOptionIni', 200);
        $(this).find('.dscMenu').stop(true, true).switchClass('lblMenuDscFin', 'lblMenuDscIni', 200);
        $(this).find('.lblMenu').stop(true, true).switchClass('lblFin', 'lblIni', 200);
    });
});*/


// Redirect de cada menú

function RutinaRedirecAdmisiones() {
    window.open('http://admisiones.unapec.edu.do/','_blank');
}

// Principal Estudiantes
function RutinaMuestraMenuMatricula() {
    $('#LSFOMasInfoMenu').load('PagesContents/BarraInfoMenuMatricula.aspx');
}

function RutinaMuestraMenuAcademico() {
    $('#LSFOMasInfoMenu').load('PagesContents/BarraInfoMenuAcademico.aspx');
}

function RutinaMuestraMenuGestiones() {
    $('#LSFOMasInfoMenu').load('PagesContents/BarraInfoMenuGestiones.aspx');
}

function RutinaMuestraMenuCajas() {
    $('#LSFOMasInfoMenu').load('PagesContents/BarraInfoMenuCajas.aspx');
}

function RutinaMuestraMenuClase() {
    $('#LSFOMasInfoMenu').load('PagesContents/BarraInfoMenuClase.aspx');
}

// Principal Profesores

function RutinaMuestraMenuHorarios() {
    window.open('horarios.aspx?m=mcla', '_parent');
}

function RutinaMuestraMenuFinanciero() {
    $('#LSFOMasInfoMenuProf').load('PagesContents/BarraInfoMenuFinancieroProf.aspx');
}

function RutinaMuestraMenuOtros() {
    window.open('Otros.aspx?m=mcla&amp', '_parent');
}


// -------------------------------------
// Inicio Redirec Menu Info de cada Menu
// -------------------------------------

function RutinaRedirecMatricula() {
    window.location.href = 'Matricula.aspx';
}

function RutinaRedirecResumenMatricula() {
    window.location.href = 'resumenmatricula.aspx?m=mmat';
}

function RutinaRedirecNotasPeriodo() {
    window.location.href = 'calificacionesperiodo.aspx?m=maca';
}

function RutinaRedirecNotasHistorico() {
    window.location.href = 'calificacioneshistorico.aspx?m=maca';
}

function RutinaRedirecCambioAsignatura() {
    window.location.href = 'CambioCurso.aspx?m=maca';
}

function RutinaRedirecRetiroAsignatura() {
    window.location.href = 'retirocurso.aspx?m=maca';
}

function RutinaRedirecGestiones() {
    window.location.href = 'gestiones.aspx?m=mges';
}

function RutinaRedirecSolicitudes() {
    window.location.href = 'solicitudes.aspx?m=mges';
}

function RutinaRedirecTutorias() { 
    window.location.href = 'ingresoTutorias.aspx?m=mges'; 
}

function RutinaRedirecBecasCuentasCorportativas(){
    window.location.href = 'becasCuentasCorporativas.aspx';
}

function RutinaRedirecDetallePagar() {
    window.location.href = 'Facturacion.aspx?m=mcaj';
}

function RutinaRedirectFinanciero() {
    window.location.href = 'contenedorFinanciero.aspx?m=mfin&Mostrar=F';
}

function RutinaRedirecHistoricoPagos() {
    window.location.href = 'contenedorHisPagos.aspx?m=mcaj';
}

function RutinaRedirecHorarios() {
    window.location.href = 'Horarios.aspx?opc=horarios&m=mcla';
}

function RutinaRedirecOtros() {
    window.location.href = 'Otros.aspx?m=mcla&amp';
}

function RutinaRedirecSaldoFavor() {
    window.location.href = 'contenedorFinanciero.aspx?m=mfin&Mostrar=F';
}

function RutinaRedirecSaldoPagar() {
    window.location.href = 'contenedorFinanciero.aspx?m=mfin&Mostrar=P'; 
}

// ----------------------------------
// Fin Redirec Menu Info de cada Menu
// ----------------------------------

function RutinaRedirecCarrerasMVI() { window.open('carreras.aspx?m=minf', '_parent'); }

function RutinaRedirecHorariosPeriodoMVI() { window.open('horariosPeriodo.aspx?m=minf', '_parent'); }

function RutinaRedirecPrimerIngresoMVI() { window.open('informacionCif.aspx?m=minf', '_parent'); }

//---------------
function RutinaRedirecResumenMatriculaMVI() { window.open('resumenmatricula.aspx?m=mmat', '_parent'); }

function RutinaRedirecInscripcionAsignaturaMVI() { window.open('Matricula.aspx', '_parent'); }
//--------------

function RutinaRedirecNotasPeriodoMVI() { window.open('calificacionesperiodo.aspx?m=maca', '_parent'); }

function RutinaRedirecNotasHistoricoMVI() { window.open('calificacioneshistorico.aspx?m=maca', '_parent'); }

function RutinaRedirecCambioAsignaturaMVI() { window.open('CambioCurso.aspx?m=maca', '_parent'); }

function RutinaRedirecRetiroAsignaturaMVI() { window.open('retirocurso.aspx?m=maca', '_parent'); }


/*Diseño viejo*/
function RutinaRedirecNotasPeriodoMVIDV() { window.open('../calificacionesperiodo.aspx?m=maca', '_parent'); }

function RutinaRedirecNotasHistoricoMVIDV() { window.open('../calificacioneshistorico.aspx?m=maca', '_parent'); }

function RutinaRedirecCambioAsignaturaMVIDV() { window.open('../CambioCurso.aspx?m=maca', '_parent'); }

function RutinaRedirecRetiroAsignaturaMVIDV() { window.open('../retirocurso.aspx?m=maca', '_parent'); }
/**/

//--------------

function RutinaRedirecHorariosMVI() { window.open('horarios.aspx?m=mcla', '_parent'); }

function RutinaRedirecOtrosMVI() { window.open('otros.aspx?m=mcla', '_parent'); }

function RutinaRedirecDatosPersonalesMVI() { window.open('InformacionCifGeneral.aspx?m=mcla&opc=&Cif=', '_parent'); }
//--------------

function RutinaRedirecTramitesMVI() { window.open('gestiones.aspx?m=mges', '_parent'); }

function RutinaRedirecSolicitudesMVI() { window.open('solicitudes.aspx?m=mges', '_parent'); }

function RutinaRedirecTutoriasMVI() { window.open('ingresoTutorias.aspx?m=mges', '_parent'); }
//--------------

function RutinaRedirecDetallePagarMVI() { window.open('Facturacion.aspx?m=mcaj', '_parent'); }

function RutinaRedirecHistoricoPagosMVI() { window.open('contenedorHisPagos.aspx?m=mcaj', '_parent'); }

function RutinaRedirecSaldoFavorMVI() { window.open('contenedorFinanciero.aspx?m=mfin&Mostrar=F', '_parent'); }

function RutinaRedirecSaldoPagarMVI() { window.open('contenedorFinanciero.aspx?m=mfin&Mostrar=P', '_parent'); }
//--------------


function RutinaRedirecSubTopInicio() { window.open('principalEstudiantes.aspx', '_parent'); }

function RutinaRedirecSubTopMatricula() { window.open('Matricula.aspx', '_parent'); }

function RutinaRedirecSubTopAcademico() { window.open('calificacionesperiodo.aspx?m=maca', '_parent'); }

function RutinaRedirecSubTopGestiones() { window.open('gestiones.aspx?m=mges', '_parent'); }

function RutinaRedirecSubTopCajas() { window.open('Facturacion.aspx?m=mcaj', '_parent'); }

function RutinaRedirecSubTopClase() { window.open('horarios.aspx?m=mcla', '_parent'); }

function RutinaRedirecSubTopInformacion() { window.open('carreras.aspx?m=minf', '_parent'); }

function RutinaRedirecSubTopHorariosProf() { window.open('horarios.aspx?m=mcla', '_parent'); }

function RutinaRedirecSubTopFinancieroProf() { window.open('contenedorFinanciero.aspx?m=mfin&Mostrar=P', '_parent'); }

function RutinaRedirecSubTopOtrosProf() { window.open('Otros.aspx?m=mcla&amp', '_parent'); }

function RutinaRedirecSubTopInformacionProf() { window.open('carreras.aspx?m=minf', '_parent'); }


/*DISEÑO VIEJO*/
function RutinaRedirecSubTopInicioDV() { window.open('../principalEstSkinFormalOscuro.aspx', '_parent'); }

function RutinaRedirecSubTopMatriculaDV() { window.open('../Matricula.aspx', '_parent'); }

function RutinaRedirecSubTopAcademicoDV() { window.open('../calificacionesperiodo.aspx?m=maca', '_parent'); }

function RutinaRedirecSubTopGestionesDV() { window.open('../gestiones.aspx?m=mges', '_parent'); }

function RutinaRedirecSubTopCajasDV() { window.open('../Facturacion.aspx?m=mcaj', '_parent'); }

function RutinaRedirecSubTopClaseDV() { window.open('../horarios.aspx?m=mcla', '_parent'); }

function RutinaRedirecSubTopInformacionDV() { window.open('../carreras.aspx?m=minf', '_parent'); }

function RutinaRedirecSubTopHorariosProfDV() { window.open('../horarios.aspx?m=mcla', '_parent'); }

function RutinaRedirecSubTopFinancieroProfDV() { window.open('../contenedorFinanciero.aspx?m=mfin&Mostrar=P', '_parent'); }

function RutinaRedirecSubTopOtrosProfDV() { window.open('../Otros.aspx?m=mcla&amp', '_parent'); }

function RutinaRedirecSubTopInformacionProfDV() { window.open('../carreras.aspx?m=minf', '_parent'); }
/**/

//---------------


function RutinaRedirecHorariosMVIP() { window.open('horarios.aspx?m=mcla', '_parent'); }

function RutinaRedirecFinancieroMVIP() {window.open('contenedorFinanciero.aspx?m=mfin&Mostrar=P', '_parent'); }

function RutinaRedirecOtrosMVIP() { window.open('Otros.aspx?m=mcla&amp', '_parent'); }


function RutinaRedirecAlumnosProf() { window.open('contenedorPaginaAlumnos.aspx?m=mhor&opc=&amp=', '_parent'); }

function RutinaRedirecCalificadorProf() { window.open('Calificador.aspx?opc=&m=calif', '_parent'); }

function RutinaRedirecVirtualProf() { alert('Opción deshabilitada!!! No es posible tener acceso!!!'); }

function RutinaRedirecTemarioProf() { alert('Opción deshabilitada!!! No es posible tener acceso!!!'); }

function RutinaRedirecGeneralProf() { window.open('princip3al.aspx', '_parent'); }

function RutinaRedirecGeneral() {
    //window.open('../principal.aspx?m=mhor&opc=&suc=' + locationVars('suc') + '&cur=' + locationVars('cur') + '&key=' + locationVars('key') + '&hniv=' + locationVars('hniv') + '&gniv=' + locationVars('gniv') + '&res=' + locationVars('res') + '&dia=' + locationVars('dia') + '&ini=' + locationVars('ini') + '&fin=' + locationVars('fin') + '&aul=' + locationVars('aul') + '&rel=' + locationVars('rel') + '', '_parent');
    window.open('principal.aspx', '_parent');
}

function RutinaRedirecProfesor() { window.open('profesor.aspx?m=mhor&opc=&amp=', '_parent'); }

function RutinaRedirecAlumnos() { window.open('alumnos.aspx?m=mhor', '_parent'); }

function RutinaRedirecNotas() { window.open('academico.aspx?m=mhor&opc=&amp=', '_parent'); }

function RutinaRedirecTemario() { alert('Opción deshabilitada!!! No es posible tener acceso!!!'); }

function RutinaRedirecAsistencia() { window.open('asistencia.aspx?m=mhor&opc=&amp=', '_parent'); }

function RutinaRedirecVirtual() { alert('Opción deshabilitada!!! No es posible tener acceso!!!'); }


function locationVars(vr) {
    var src = String(window.location.href).split('?')[1];
    var vrs = src.split('&');

    for (var x = 0, c = vrs.length; x < c; x++) {
        if (vrs[x].indexOf(vr) != -1) {
            return decodeURI(vrs[x].split('=')[1]);
            break;
        };
    };
}