  //**********************//
 //       UNAPEC         //
//**********************//

var timeout;

$(document).ready(function() {
    initScrollbar('N');
});

function initScrollbar(f) {
    if (f == 'N') {
        $('#scrolledGridOferta').perfectScrollbar({
            suppressScrollX: true,
            wheelSpeed: 20,
            wheelPropagation: true,
            minScrollbarLength: 20
        });

        $('#divOfertaAcademica').perfectScrollbar({
            suppressScrollX: true,
            wheelSpeed: 20,
            wheelPropagation: true,
            minScrollbarLength: 20
        }); 
    }
    else { 
        $('#scrolledGridOferta').perfectScrollbar('update');
        $('#divOfertaAcademica').perfectScrollbar('update');
    }       
}

// JScript File

/// Agrega la funcion inicializarEventos al form
addEvent(window,'load',inicializarEventos,false);

/// Para saber cual navegador usa el usuario
var navegador;
/// Se encarga de mandar y resivir la informacion al servidor
var conexion1;
/// Indica cual es el check que se presiono
var num;
/// Resive la respuesta cuando se matricula 
var mensajeMatricula;
/// Se encarga de mandar y resivir la informacion al servidor, para el resumen de matricula
var conexionConsulta;
/// Controla el tiempo del cambia color del resumen
var TiempoCambiarColor;
/// Indica cual curso se esta matriculando o eliminando
var CursoMatriculando;
/// Indica si se debe consultar la BD para el resumen
var BD = true;
//
var curActual;
var urlActual;

/// Crea el objeto que recibe el |
function crearXMLHttpRequest() 
{
    var _xmlHttp=null;
    try
    {
        /// Firefox, Opera 8.0+, Safari
        _xmlHttp=new XMLHttpRequest();
        navegador = "ff";
    }
    catch (e)
    {
        /// Internet Explorer
        try   
        {
            _xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
            navegador = "ie";
        }
        catch (e)
        {
            _xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
            navegador = "ie";
        }
  }
    return _xmlHttp;
}

/// Carga la informacion de los horarios disponibles para el curso
function procesarEventos()
{
    var _detalles = document.getElementById("divOfertaAcademica");
    if(conexion1.readyState == 4)
    {
        $('#ImgLoading').addClass('noDisplay');
        _detalles.innerHTML = conexion1.responseText;
    } 
    else 
    {
        $('#spLblMensajeAccion').html('Cargando');
        _detalles.innerHTML = "";
        $('#ImgLoading').removeClass('noDisplay');
    }

    $("#divOfertaAcademica").removeClass('ps-container');
    $('#divOfertaAcademica').perfectScrollbar('destroy');
    initScrollbar('N');
}

/// Resumen:
///     función para cargar la OA de cada curso
/// Parametros:
///     numero:Numero de check presionado
///     url:Direcion ala cual se llama para pedir la informacion

function cargarOfertaCurso(numero,url) {
    if(url=='')
    {
        return;
    }
        
    curActual = numero;
    urlActual = url;

    var objCheck = "";
    objCheck = document.getElementById("chk" + numero);
    //objCheck = document.all.item("chk" + numero);
	
    var dg = document.getElementById("TableOfertaMatricula")
    var div = document.getElementById("divOfertaAcademica");
    
    /// se crea una colección con las filas que contiene la tabla de Oferta Académica
    var rows = dg.getElementsByTagName("tr");
    /// se crea una clección con las columnas de la fila seleccionada
    var cells = rows["trOferta"+numero].getElementsByTagName("td");
    /// se busca el código del curso que se selecciono
    var codCurso = cells[0].getElementsByTagName("span");
   
    if(objCheck.checked == true)
    {
        conexion1=crearXMLHttpRequest();
        conexion1.onreadystatechange = procesarEventos;
        conexion1.open("GET", url, true);
        conexion1.send(null);
    
        for(i = 0; i < dg.rows.length - 1; i++)
        {
            if(i != numero)
            {
                var check = document.getElementById("chk" + i);
                if(check != undefined)
                {
                    check.checked = false;
                }  
            }
        }
        
        /// se asigna la información del código al span
        var cod = document.createTextNode( codCurso[0].firstChild.nodeValue);
        
        /// se asigna la información de la descripcion al span
        var desc = document.createTextNode( cells[1].firstChild.nodeValue);

        $("#infCursoOfertaSeleccion").html(cod.data + ' - ' + desc.data);
        $("#codigoCursoSeleccionOferta").val(cod.data);
        $("#descripcionCursoSeleccionOferta").val(desc.data);
    }
    else
    {
        $("#infCursoOfertaSeleccion").html('');
        $("#codigoCursoSeleccionOferta").val('');
        $("#descripcionCursoSeleccionOferta").val('');    
        div.innerHTML ="";
    }
}

/// Resumen:
/// permite cargar la oferta del curso seleccionado al cambiar de sucursal
function check(e,url)
{
    var dg = document.getElementById("TableOfertaMatricula");

    for(i = 0; i < dg.rows.length - 1; i++)
    {
        var check = document.getElementById("chk" + i);
            if(check != undefined)
            {
                if(i == e)
                {
                    check.checked = true;
                }
            }  
    }
    ///-- Se llama al xml que carga la oferta
    cargarOfertaCurso(e,url);    
}

/// Resumen:
/// deshabilita los controles a la hora de matricular
function Desactivar() 
{
    try
    {
        //var alertDiv = document.getElementById("scrolledGridOferta");
        //alertDiv.style.display = alertDiv.style.display == "block" ? "inline" : "block";
        //toggleDisabled(document.getElementById("scrolledGridOferta"));
        //toggleDisabled(document.getElementById("trCboCarrera"));
        //toggleDisabled(document.getElementById("trCboSede"));
        //toggleDisabled(document.getElementById("trDesconectar"));
        //toggleDisabled(document.getElementById("btnRegresar"));
        //var objeto = document.getElementById("imgResumen");
        //objeto.disabled = objeto.disabled ? false : true; 
    }
    catch(e)
    {
        alert("Función Desactivar. " + e.description);
    }
}

/// Resumen: Si el componente esta deshabilitado lo habilita
function toggleDisabled(el) 
{
    if(el != undefined)
    {
        try 
        {
            el.disabled = el.disabled ? false : true;
        }
        catch(E){}
        
        if (el.childNodes && el.childNodes.length > 0) {
            for (var x = 0; x < el.childNodes.length; x++) {
                toggleDisabled(el.childNodes[x]);
            }
        }
    }
}

/// Resumen:
///     Se encarga de matricular o eliminar cursos Normales
/// Parametros:
///     numero: Numero de check presionado
///     url:direccion a la que se manda a realizar la accion
///     listaespera:Indica si se acepta matricular con lista de espera
///     cupo: es el cupo del curso
//function Matricular(numero, pCodigoCurso, url, listaespera, cupo, pAplicaCredito, pURL_DT)
function Matricular(numero, pCodigoCurso, url, listaespera, cupo, pAplicaCredito, mensaje_confirma, valida_choque)
{  //cntvcv  

    if(url == '')
    {
        return;
    }
    
    CursoMatriculando = pCodigoCurso;
  
    var objCheck1 = "", proceder = "";
        
        /// Se captura el check que se ha activado
    objCheck1 = document.getElementById("chkO" + numero); 
        
    num = numero;
   
        /// variable que determina si se matricula o no
    proceder = "Si";

    if (mensaje_confirma != '' && objCheck1.checked == false)
    {
        var agree = confirm(mensaje_confirma);
        if (agree)
        {
            mensaje_confirma = "";
        }
        else
        {
            objCheck1.checked = true;
            return;
        }
    }
    
         /// se valida si hay cupo disponible en el curso deseado   
    if((objCheck1.checked == true) && (cupo <= 0) && (listaespera == "No"))
    {
            /// si no hay cupo y no hay lista de espera
        alert("No hay Cupo Disponible. \nCapacidad de Matrícula Completa para Aula!");
        objCheck1.checked = false;
        proceder = "No";
        estableceChecks();
    }
    else
    {
            /// si no hay cupo y hay lista de espera
        if ((objCheck1.checked == true) && (cupo <= 0) && (listaespera == "Si")) 
        {
    	    var agree = confirm("No hay Cupo Disponible, Desea Pasar a Lista de Espera?");
		    if (agree)
                proceder = "Si";
            else 
		    {
		        proceder = "No";
		        objCheck1.checked = false;
		        estableceChecks();
            }
        }
    }
    
        /// si se va a proceder a matricular
    if(proceder == "Si") 
    {
    /// para bloquear los controles
        Desactivar();   
           
        if( objCheck1.checked == true) 
        {
            // se valida si no se ha pasado el máximo de créditos permitidos
            if (ValidaCreditos(pAplicaCredito) == true) {
            
                /// se valida si hay choque de horarios
                if (ValidaChoque(num, valida_choque) == true)
                {
                    /// si se desea insertar
                    var resultados = document.getElementById("tableOferta");
                      for (i = 0; i < resultados.rows.length - 1; i++)
                        {
                            var check = document.getElementById("chkO" + i);
                            if(check != undefined)
                                check.disabled = true;
                        }
                    try
                    {
                        mensajeMatricula = "Matriculando";
                        url = url + "&accion=Inser_tar";
                        conexion1 = crearXMLHttpRequest();
                        conexion1.onreadystatechange = procesarMatricula;
                        conexion1.open("GET", url, true);
                        conexion1.send(null);
                    }
                    catch(e)
                    {
                        alert("Hay demasiados usuarios conectados, \nfavor intentar mas tarde.");
                        estableceChecks();
                    }                
                }
                else
                {
                    var resultados = document.getElementById("tableOferta");
                     for (i = 0; i < resultados.rows.length - 1; i++)
                    {
                        var check = document.getElementById("chkO" + i);
                         if(check != undefined)
                            check.disabled = false;
                    }
                    
                    var check = document.getElementById("chkO"+num);
                                       
                    if (check.checked == true)
                    {
                        check.checked = false;
                        for(i = 0; i < resultados.rows.length - 1; i++)
                        {
                            if(i != num)
                            {
                                var check = document.getElementById("chkO"+i);
                                if(check != undefined)
                                {
                                    check.disabled = false;
                                }
                            }
                        }                         
                         /// se activan los componentes
                         Desactivar();
                    }
                    estableceChecks();
                    return;
                }
            }
            else
            {
            var resultados = document.getElementById("tableOferta");
                 for (i = 0; i < resultados.rows.length - 1; i++)
                    {
                        var check = document.getElementById("chkO" + i);
                         if(check != undefined)
                            check.disabled = false;
                    }
                    
                    var check = document.getElementById("chkO"+num);
                        if (check.checked == true)
                        {
                            check.checked = false;
                            for(i = 0; i < resultados.rows.length - 1; i++)
                            {
                                if(i != num)
                                {
                                    var check = document.getElementById("chkO"+i);
                                    if(check != undefined)
                                    {
                                        check.disabled = false;
                                    }
                                }
                            }                             
                        }
                                
                /// se activan los componentes
                Desactivar();    
            }
        }
        else
        {
            /// si se desea eliminar
            var resultados = document.getElementById("tableOferta");

             for (i = 0; i < resultados.rows.length - 1; i++)
             {                
                    var check = document.getElementById("chkO" + i);
                    if(check != undefined)
                        check.disabled = true;
             }
         
            mensajeMatricula = "Eliminando";
            url = url + "&accion=Eliminar";
            conexion1 = crearXMLHttpRequest();
            conexion1.onreadystatechange = procesarMatricula;
            conexion1.open("GET", url, true);
            conexion1.send(null);    
        }
    }

    //$('#scrolledGridOferta').addClass('displayInherits');
        
}
///Resumen:
///     Elimina un curso cancelado y desaparece el check
function EliminaCancelado(numero, pCodigoCurso, url, mensaje_confirma)
{

    if(url == '')
    {
        return;
    }
   
    CursoMatriculando = pCodigoCurso;
  
    var objCheck1 = "", proceder = "";
        
        /// Se captura el check que se ha activado
    objCheck1 = document.getElementById("chkOD" + numero);

    if (mensaje_confirma != '')
    {
        var agree = confirm(mensaje_confirma);
        if (agree)
        {
            mensaje_confirma = "";
        }
        else
        {
            return;
        }
    }
    num = numero;
   
/// para bloquear los controles
    Desactivar();

        /// si se desea eliminar
    var resultados = document.getElementById("tableOferta");

     for (i = 0; i < resultados.rows.length - 1; i++)
     {
        
            var check = document.getElementById("chkO" + i);
            if(check != undefined)
                check.disabled = true;
     }
 
    mensajeMatricula = "Eliminando";
    url = url + "&accion=Eliminar";
    conexion1 = crearXMLHttpRequest();
    conexion1.onreadystatechange = procesarEliminaCancelada;
    conexion1.open("GET", url, true);
    conexion1.send(null);
}


/// Resumen:
///     Procede a esperar la respuesta del servidor para eliminar el curso
///     cancelado
function procesarEliminaCancelada()
{
    try
    {
        var resultados = document.getElementById("tableOferta");
 
        if(conexion1.readyState == 4)
        {
            if(conexion1.status == 200)
            {
                var tabla = document.getElementById("tableOferta");
                var xml = conexion1.responseXML;
                      
                var temp = conexion1.responseText;
                var x = temp.indexOf('<mensaje>');
                var y = temp.indexOf('</mensaje>');
                      
                var mensaje = temp.substring(x+9,y);
                
                switch(mensaje)
                {
                    case 'Asignatura Eliminada.':
                        ocultarToolTipMatriculando();
                        alert(mensaje);
                        
                        /// se oculta la imagen de que el curso esta matriculado
                        var imgCurso = document.getElementById("img"+CursoMatriculando);
                        imgCurso.className="imgOcultar";
                        
                         for (i = 0; i < resultados.rows.length - 1; i++)
                        {
                            var check = document.getElementById("chkO" + i);
                            if(check != undefined)
                                check.disabled = false;
                        }
                        
                        for(i = 0; i < tabla.rows.length - 1; i++)
                        {
                            var check = document.getElementById("chkO"+i);
                            if(check != undefined)
                            {
                                check.checked = false;
                                check.disabled = false;
                            }
                        }

                        /// se activan los componentes
                        Desactivar();
                  
                        /// Se elimina el curso del resumen
                        EliminarRegistro(CursoMatriculando);                        
                        var ele = document.getElementById("chkOD"+num);
                        var vec=document.getElementById('sel'+num);
                        var Espacio = document.createTextNode("-");
                        
                        ele.parentNode.removeChild(ele);                        
                        vec.appendChild(Espacio);

                        estableceChecks();

                    break
                           
                    default:
                        ocultarToolTipMatriculando();
                        alert(mensaje);
                     
                         for (i = 0; i < resultados.rows.length - 1; i++)
                        {
                            var check = document.getElementById("chkO" + i);
                             if(check != undefined)
                                check.disabled = false;
                        }
                        
                        var check = document.getElementById("chkO"+num);
                            if (check.checked == true)
                            {
                                check.checked = false;
                                for(i = 0; i < tabla.rows.length - 1; i++)
                                {
                                    if(i != num)
                                    {
                                        var check = document.getElementById("chkO"+i);
                                        if(check != undefined)
                                        {
                                            check.disabled = false;
                                        }
                                    }
                                }
                                 Desactivar();
                               
                            }
                                    
                            if (check.checked == false)
                            {
                                check.checked = true;
                                for (i = 0;  i < tabla.rows.length - 1; i++)
                                {
                                    if(i != num)
                                    {
                                        var check = document.getElementById("chkO" + i);
                                        if(check != undefined)
                                        {
                                            check.disabled = true;
                                        }
                                    }
                                } 
                                /// Se activan los componentes
                                
                                 Desactivar();
                                
                            }
                           
                    break
                }
            }
            else
            {
                alert("Servidor ocupado.\n Intente de nuevo.");
                estableceChecks();
            }
        } 
        else 
        {
            mostrarToolTipMatriculando();

        }
    }
    catch(e)
    {
        alert(e.description);
        
    }  
}

/// Resumen:
///     Prosesa los datos recibidos por el servidor a la hora de matricular
function procesarMatricula()
{
        try
                {
     var resultados = document.getElementById("tableOferta");
 
        if(conexion1.readyState == 4)
        {
            if(conexion1.status == 200)
            {
                var tabla = document.getElementById("tableOferta");
                var xml = conexion1.responseXML;
                      
                var temp = conexion1.responseText;
                var x = temp.indexOf('<mensaje>');
                var y = temp.indexOf('</mensaje>');
                
                var mensaje = temp.substring(x + 9, y);

                var cadena = mensaje.split("¤");
                mensaje = cadena[0];
                var URL = cadena[1];
                var CRE = cadena[2]; 
                switch(mensaje)
                {
                    case 'Asignatura Inscrita satisfactoriamente.':
                        ocultarToolTipMatriculando();
                        alert(mensaje);
                                                
                        ///para mostrar el check de que el curso esta matriculado
                        var imgCurso = document.getElementById("img"+CursoMatriculando);
                        imgCurso.className="imgMostrar";
                        
                        for (i = 0; i < resultados.rows.length - 1; i++)
                        {
                            var check = document.getElementById("chkO" + i);
                            if(check != undefined)
                                check.disabled = false;
                        }
                        
                        for (i = 0; i < tabla.rows.length - 1; i++)
                        {
                            if(i != num)
                            {
                                var check = document.getElementById("chkO" + i);
                                if(check != undefined)
                                    check.disabled = true;
                            }
                        }
                          var scrolledGridOferta = document.getElementById("scrolledGridOferta");
                          
                          /// se activan los controles
                          Desactivar();
                          
                          /// se agrega el curso al resumen de la matricula
                          agregarRegistroNormal(CursoMatriculando);
                          if (URL != undefined)
                          {
                              window.location = URL
                          }
                    break
                           
                    case 'Asignatura Inscrita en lista de espera.':
                        ocultarToolTipMatriculando();
                        alert(mensaje);
                        
                        ///para mostrar el check de que el curso esta matriculado
                        var imgCurso = document.getElementById("img"+CursoMatriculando);
                        imgCurso.className="imgMostrar";
                                 
                        for (i = 0; i < resultados.rows.length - 1; i++)
                        {
                            var check = document.getElementById("chkO" + i);
                            if(check != undefined)
                                check.disabled = false;
                        }
                        
                        for (i = 0; i < tabla.rows.length - 1; i++)
                        {
                            if(i != num)
                            {
                                var check = document.getElementById("chkO" + i);
                                if(check != undefined)                        
                                    check.disabled = true;
                            }
                        }
                        
                        /// Se activan los componentes
                        Desactivar();

                        /// Se agrega el curso al resumen
                        agregarRegistroListaEspera(CursoMatriculando);
                        if (URL != undefined)
                        {
                            window.location = URL
                        }                         
                    break

                case 'Asignatura Eliminada.':
                    ocultarToolTipMatriculando();
                    alert(mensaje);

                    /// se oculta la imagen de que el curso esta matriculado
                    var imgCurso = document.getElementById("img" + CursoMatriculando);
                    imgCurso.className = "imgOcultar";

                    for (i = 0; i < resultados.rows.length - 1; i++) {
                        var check = document.getElementById("chkO" + i);
                        if (check != undefined)
                            check.disabled = false;
                    }

                    for (i = 0; i < tabla.rows.length - 1; i++) {
                        var check = document.getElementById("chkO" + i);
                        if (check != undefined) {
                            check.checked = false;
                            check.disabled = false;
                        }
                    }

                    /// se activan los componentes
                    Desactivar();

                    /// Se elimina el curso del resumen
                    EliminarRegistro(CursoMatriculando);
                    if (URL != undefined && CRE != undefined) {
                        EliminarRegistroDT(URL, CRE);
                    }

                    estableceChecks();

                    break
                           
                    default:
                        ocultarToolTipMatriculando();
                        alert(mensaje);
                     
                        try{
                            for (i = 0; i < resultados.rows.length - 1; i++)
                            {
                                var check = document.getElementById("chkO" + i);
                                if(check != undefined)
                                    check.disabled = false;
                            }
                        
                            var check = document.getElementById("chkO"+num);
                            if (check.checked == true)
                            {
                                check.checked = false;
                                for(i = 0; i < tabla.rows.length - 1; i++)
                                {
                                    if(i != num)
                                    {
                                        var check = document.getElementById("chkO"+i);
                                        if(check != undefined)
                                        {
                                            check.disabled = false;
                                        }
                                    }
                                }
                                Desactivar();
                                break
                            }
                                    
                            if (check.checked == false)
                            {
                                check.checked = true;
                                for (i = 0;  i < tabla.rows.length - 1; i++)
                                {
                                    if(i != num)
                                    {
                                        var check = document.getElementById("chkO" + i);
                                        if(check != undefined)
                                        {
                                            check.disabled = true;
                                        }
                                    }
                                } 
                                /// Se activan los componentes
                                estableceChecks();
                                
                                break
                            }
                        }catch(err){}
                    break
                }
            }
            else
            {
                alert("Servidor ocupado.\n Intente de nuevo.");
                estableceChecks();
            }
        } 
        else 
        {
            mostrarToolTipMatriculando(); 
        }
    }
    catch(e)
    {
        alert(e.description);
        //alert("Hay demasiados usuarios conectados, \nfavor intentar mas tarde..");
    } 
}


  //**********************************************//
 //      Para manipular Optativas                //
//**********************************************//

/// Resumen:
///     Matricula los cursos optativos
/// Parametros:
///     numero: numero de check seleccionado
///     url:Direccion que se encarga de matricular
///     listaespera:Indica si se permite matricular en lista de espera
///     Cupo: es el cupo del curso
function MatricularOptativas(numero, pCodigoCurso, url, listaespera, cupo, pAplicaCredito, mensaje_confirma, valida_choque)
{
    
    if(url == '')
    {
        return;
    }
    
    CursoMatriculando = pCodigoCurso;
       
    /// se captura el check que se ha activado
    var objCheck1 = "", proceder = "";
    objCheck1 = document.getElementById("chkO" + numero);
        
    num = numero;

    proceder = "Si"; //variable que determina si se matricula o no

    if (mensaje_confirma != '' && objCheck1.checked == false) {
        var agree = confirm(mensaje_confirma);
        if (agree) {
            mensaje_confirma = "";
        }
        else {
            objCheck1.checked = true;
            return;
        }
    }    
    
     /// se valida si hay cupo disponible en el curso deseado
    if((objCheck1.checked == true) && (cupo <= 0) && (listaespera == "No"))
    {
        /// si no hay cupo y no hay lista de espera
        alert("No hay Cupo Disponible.\nCapacidad de Matrícula Completa para Aula!");
        objCheck1.checked = false;
        estableceChecks();
		proceder = "No";
    }
    else
    {
        /// si no hay cupo y hay lista de espera
        if ((objCheck1.checked == true) && (cupo <= 0) && (listaespera == "Si")) 
        {
		    var agree = confirm("No hay Cupo Disponible, Desea Pasar a Lista de Espera?");
		    if (agree)
			    proceder = "Si";
		    else 
		    {
		        proceder = "No";
		        estableceChecks();
			    objCheck1.checked = false;
			}
		}
    }
    
    if(proceder == "Si") /// si se va a proceder a matricular
    {
        /// Se desactivan los componentes
        Desactivar();
        var objeto = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");
        objeto.disabled = true;                
        //objeto = document.getElementById("btnRegresar");
        objeto = document.getElementById("ctl00_contenedorPrincipal_btnRegresar");
        objeto.disabled = true;
  
        if( objCheck1.checked == true) 
        {
            // se valida si no se ha pasado el máximo de créditos permitidos
            if (ValidaCreditos(pAplicaCredito) == true)
            {
                /// verifica si hay choques de horario
                if (ValidaChoque(num, valida_choque) == true)
                {
                
                    var resultados = document.getElementById("tableOferta");
                    for (i = 0; i < resultados.rows.length - 1; i++)
                        {
                            var check = document.getElementById("chkO" + i);
                            if(check != undefined)
                                check.disabled = true;
                        }
                    //si se desea insertar
                    mensajeMatricula = "Matriculando";
                    url = url + "&accion=Inser_tar";
                    conexion1 = crearXMLHttpRequest();
                    conexion1.onreadystatechange = procesarMatriculaOptativas;
                    
                    conexion1.open("GET", url, true);
                    conexion1.send(null);
                    
                }
                else
                {
                    var resultados = document.getElementById("tableOferta");
                     for (i = 0; i < resultados.rows.length - 1; i++)
                    {
                        var check = document.getElementById("chkO" + i);
                         if(check != undefined)
                            check.disabled = false;
                    }
                    
                    var check = document.getElementById("chkO"+num);
                    if (check.checked == true)
                    {
                        check.checked = false;
                        for(i = 0; i < resultados.rows.length - 1; i++)
                        {
                            if(i != num)
                            {
                                var check = document.getElementById("chkO"+i);
                                if(check != undefined)
                                {
                                    check.disabled = false;
                                }
                            }
                        }
                        /// se activan los componetes
                         Desactivar();
                         var objeto = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");
                        objeto.disabled = true;                
                        //objeto = document.getElementById("btnRegresar");
                        objeto = document.getElementById("ctl00_contenedorPrincipal_btnRegresar");
                        objeto.disabled = false;

                    }
                    estableceChecks();
                    return;
                }
            }
            else
            {
                var resultados = document.getElementById("tableOferta");
                 for (i = 0; i < resultados.rows.length - 1; i++)
                    {
                        var check = document.getElementById("chkO" + i);
                         if(check != undefined)
                            check.disabled = false;
                    }
                    
                    var check = document.getElementById("chkO"+num);
                        if (check.checked == true)
                        {
                            check.checked = false;
                            for(i = 0; i < resultados.rows.length - 1; i++)
                            {
                                if(i != num)
                                {
                                    var check = document.getElementById("chkO"+i);
                                    if(check != undefined)
                                    {
                                        check.disabled = false;
                                    }
                                }
                            }
                             
                        }
                              
                /// se activan los componentes
                Desactivar();    
            
            }
            
        }
        else
        {
            var resultados = document.getElementById("tableOferta");
            for (i = 0; i < resultados.rows.length - 1; i++)
                {
                    var check = document.getElementById("chkO" + i);
                    if(check != undefined)
                        check.disabled = true;
                }
            //si se desea eliminar
            mensajeMatricula = "Eliminando";
            url = url + "&accion=Eliminar";
            conexion1 = crearXMLHttpRequest();
            conexion1.onreadystatechange = procesarMatriculaOptativas;
            conexion1.open("GET", url, true);
            conexion1.send(null);    
        }
    }    
}

/// Resumen:
///     Procesa los datos recibidos del servidor
function procesarMatriculaOptativas() {

    var resultados = document.getElementById("tableOferta");
    if (conexion1.readyState == 4) {
        if (conexion1.status == 200) {

            var tabla = document.getElementById("tableOferta");
            var xml = conexion1.responseXML;

            var temp = conexion1.responseText;
            var x = temp.indexOf('<mensaje>');
            var y = temp.indexOf('</mensaje>');

            var mensaje = temp.substring(x + 9, y);

            var cadena = mensaje.split("¤");
            mensaje = cadena[0];
            var URL = cadena[1];
            var CRE = cadena[2];
            switch (mensaje) {
                case 'Asignatura Inscrita satisfactoriamente.':

                    ocultarToolTipMatriculando();
                    alert(mensaje);

                    /// paramostrar la imagen de que se matriculo el curso
                    var imgCurso = document.getElementById("img" + CursoMatriculando);
                    imgCurso.className = "imgMostrar";

                    for (i = 0; i < resultados.rows.length - 1; i++) {
                        var check = document.getElementById("chkO" + i);
                        if (check != undefined)
                            check.disabled = true;
                    }
                    for (i = 0; i < resultados.rows.length - 1; i++) {
                        var check = document.getElementById("chkO" + i);
                        if (check != undefined)
                            check.disabled = false;
                    }

                    for (i = 0; i < tabla.rows.length - 1; i++) {
                        if (i != num) {
                            var check = document.getElementById("chkO" + i);
                            if (check != undefined)
                                check.disabled = true;
                        }
                    }

                    /// Se activan los componentes
                    Desactivar();
                    var objeto = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");
                    objeto.disabled = true;
                    //objeto = document.getElementById("btnRegresar");
                    objeto = document.getElementById("ctl00_contenedorPrincipal_btnRegresar");
                    objeto.disabled = false;

                    /// agrega el curso al resumen
                    agregarRegistroNormal(CursoMatriculando);
                    if (URL != undefined) {
                        window.location = URL
                    }

                    break

                case 'Asignatura Inscrita en lista de espera.':
                    ocultarToolTipMatriculando();
                    alert(mensaje);

                    /// para mostrar la imagen de que se matriculo el curso
                    var imgCurso = document.getElementById("img" + CursoMatriculando);
                    imgCurso.className = "imgMostrar";

                    for (i = 0; i < resultados.rows.length - 1; i++) {
                        var check = document.getElementById("chkO" + i);
                        if (check != undefined)
                            check.disabled = false;
                    }

                    for (i = 0; i < tabla.rows.length - 1; i++) {
                        if (i != num) {
                            var check = document.getElementById("chkO" + i);
                            if (check != undefined)
                                check.disabled = true;
                        }
                    }

                    /// para activar los componentes
                    Desactivar();
                    var objeto = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");
                    objeto.disabled = true;
                    //objeto = document.getElementById("btnRegresar");
                    objeto = document.getElementById("ctl00_contenedorPrincipal_btnRegresar");
                    objeto.disabled = false;

                    /// agrega el curso al resumen de matricula
                    agregarRegistroListaEspera(CursoMatriculando);
                    if (URL != undefined) {
                        window.location = URL
                    }

                    break

                case 'Asignatura Eliminada.':
                    ocultarToolTipMatriculando();
                    alert(mensaje);

                    /// elimina el curso del resumen
                    var imgCurso = document.getElementById("img" + CursoMatriculando);
                    imgCurso.className = "imgOcultar";


                    for (i = 0; i < resultados.rows.length - 1; i++) {
                        var check = document.getElementById("chkO" + i);
                        if (check != undefined)
                            check.disabled = false;
                    }

                    for (i = 0; i < tabla.rows.length - 1; i++) {
                        var check = document.getElementById("chkO" + i);
                        if (check != undefined) {
                            check.checked = false;
                            check.disabled = false;
                        }
                    }

                    /// Activa los componentes
                    Desactivar();
                    var objeto = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");
                    objeto.disabled = true;
                    //objeto = document.getElementById("btnRegresar");
                    objeto = document.getElementById("ctl00_contenedorPrincipal_btnRegresar");
                    objeto.disabled = false;

                    /// elimina el curso del resumen
                    EliminarRegistro(CursoMatriculando);
                    if (URL != undefined && CRE != undefined)
                    {
                        EliminarRegistroDT(URL, CRE);
                    }

                    estableceChecks();

                    break

                default:
                    ocultarToolTipMatriculando();
                    alert(mensaje);

                    for (i = 0; i < resultados.rows.length - 1; i++) {
                        var check = document.getElementById("chkO" + i);
                        if (check != undefined)
                            check.disabled = false;
                    }

                    var check = document.getElementById("chkO" + num);
                    if (check.checked == true) {
                        check.checked = false;
                        for (i = 0; i < tabla.rows.length - 1; i++) {
                            if (i != num) {
                                var check = document.getElementById("chkO" + i);
                                if (check != undefined)
                                    check.disabled = false;
                            }
                        }
                        /// activa los componentes
                        Desactivar();
                        var objeto = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");
                        objeto.disabled = true;
                        //objeto = document.getElementById("btnRegresar");
                        objeto = document.getElementById("ctl00_contenedorPrincipal_btnRegresar");
                        objeto.disabled = false;
                        break
                    }

                    if (check.checked == false) {
                        check.checked = true;
                        for (i = 0; tabla.rows.length - 1; i++) {
                            if (i != num) {
                                var check = document.getElementById("chkO" + i);
                                if (check != undefined)
                                    check.disabled = true;
                            }

                            /// activa los componentes
                            Desactivar();
                            var objeto = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");
                            objeto.disabled = true;
                            //objeto = document.getElementById("btnRegresar");
                            objeto = document.getElementById("ctl00_contenedorPrincipal_btnRegresar");
                            objeto.disabled = false;
                            break
                        }
                    }

                    break
            }
        }
        else {
            alert("Servidor ocupado.\n Intente de nuevo.");
        }
    }
    else {
        mostrarToolTipMatriculando();
    }
}

  /***********************************************/
 /*PARA EL MANEJO DE LAS CONSULTAS DE MATRÍCULA */
/***********************************************/

/// Resumen:
///     Agrega las funcione necesarias para mostrar
///     el resumen de la matricula
function inicializarEventos() 
{
   var vec = document.getElementById("imgResumen"); 
   
   var ele = document.createElement('div');
      
   var _vec1 = document.getElementById("tableMatricula");
   _vec1 = document.getElementsByTagName('body');

   var cod = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");

   if (cod != null) {
       cod = cod.value;
       recuperarServidorTooltip(cod);
   }
   else {
       cod = '';
   }
}

/// Resumen:
///     Para mostrar el resumen de la matricula    
function mostrarToolTip(e) 
{
    var dt = document.getElementById("tbResumen");
     if(dt != undefined)
     {
        BD = false;   
     }
     else
     {
        BD = true;
     }
         
    var d = document.getElementById("divmensaje");
    d.style.visibility = "visible";
       
    if (window.event)
    {
        d.style.left = (screen.width / 2) - 300 + document.body.scrollLeft;
        if(document.body.scrollTop == 0)
            d.style.top = (screen.height/2)- 180;
        else
            d.style.top = (screen.height/2)- 250 + document.body.scrollTop;            
    }
    else
    {
    
        d.style.left = (screen.width / 2)- 300 +  document.body.scrollLeft;
        if(document.body.scrollTop == 0)
            d.style.top = (screen.height/2) - 180;
        else
            d.style.top = (screen.height/2)- 200 + document.body.scrollTop;
    }

    var cod = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");

    if (cod != null) {
        cod = cod.value;
    }
    else {
        cod = "";
    }
    
    if(BD == true)
    {
       recuperarServidorTooltip(cod);
    }
    
    actualizarToolTip(e);
    $('#divResumenMatricula').hide();
    $('#contentTwoColumn').fadeOut();
    $('.form').fadeOut();
    $('#divResumenMatricula').fadeIn();
}


/// Resumen:
///     Para mostrar el resumen de la matricula   
function actualizarToolTip(e) 
{
    if (window.event) 
        e=window.event;
    var d = document.getElementById("divResumenMatricula");
  
    if (window.event)
    {
        d.style.left = (screen.width / 2) - 300 + document.body.scrollLeft;
        if(document.body.scrollTop == 0)
            d.style.top = (screen.height/2)- 180;
        else
            d.style.top = (screen.height/2)- 250 + document.body.scrollTop;            
    }
    else
    {
        d.style.left = (screen.width / 2)- 300 +  document.body.scrollLeft;
        if(document.body.scrollTop == 0)
            d.style.top = (screen.height/2) - 180 ;
        else
            d.style.top = (screen.height/2)- 200 + document.body.scrollTop;
    }
}

/// Resumen:
///     Para ocultar el resumen de la matricula
function ocultarToolTip(e) 
{
    $('#contentTwoColumn').fadeIn();
    $('.form').fadeIn();
    $("#divResumenMatricula").fadeOut();
}


/// Resumen:
///     envia la peticion del resumen de matricula
function recuperarServidorTooltip(cod) {
    if (cod != '') {
        conexionConsulta = crearXMLHttpRequest();
        conexionConsulta.onreadystatechange = procesarConsulta;
        conexionConsulta.open('GET', 'XMLConsultaMatricula.aspx?car=' + cod, true);
        conexionConsulta.send(null);        
    }
}

/// Resumen:
///     Procesa los datos emitidos por el servidor, con respecto al resumen de matricula    
function procesarConsulta()
{
    var d = document.getElementById("divmensaje");
    if(conexionConsulta.readyState == 4)
    {   // aqui es donde muestra el resumen de matricula a dar en el boton
        d.innerHTML = conexionConsulta.responseText;
    } 
    else 
    {
        d.innerHTML = '<img src="res/img/loader.gif">';
    }
}

 /***************************************/
/*        Mensaje Matriculando         */
/**************************************/

function mostrarToolTipMatriculando(e) 
{
    procesarMensajeMatricula();   
}

function procesarMensajeMatricula()
{
    $('#divOfertaAcademica').addClass('noDisplay');
    $('#spLblMensajeAccion').html(mensajeMatricula);
    $('#ImgLoading').removeClass('noDisplay');
}

function ocultarToolTipMatriculando(e) 
{
    $('#spLblMensajeAccion').html('');
    $('#ImgLoading').addClass('noDisplay');
    $('#divOfertaAcademica').removeClass('noDisplay');
    estableceChecks();
}

/// Función utilizada para verificar si a la hora de cambiar de sede se encuentra algún curso checkeado
    function VerificaTable()
    {
  /// para bloquear los controles
        Desactivar();
        var resultados = document.getElementById("tableOferta");
        
        if( resultados != undefined)
        for (i = 0; i < resultados.rows.length - 1; i++)
        {
            var check = document.getElementById("chkO" + i);
            if(check != undefined)
                check.disabled = true;
        }             
                
       var num;
       
       var dg = document.getElementById("TableOfertaMatricula");
        for(i = 0; i < dg.rows.length - 1; i++)
        {
        
            var check = document.getElementById("chk" + i);
                if(check != undefined)
                {
                    if(check.checked == true)
                    {
                        num = i;
                    }
                    check.checked = false;
                }  
        }

        var cbo = document.getElementById("ctl00_contenedorPrincipal_cboSede");
        var bnk = document.getElementById("ctl00_contenedorPrincipal_hidValBNK");
        var cif = document.getElementById("ctl00_contenedorPrincipal_hidValCIF");
        
        
        location.href = "Matricula.aspx?num=" + num + "&sed=" + cbo.value + "&bnk=" + bnk.value + "&cif=" + cif.value;
    }
    
/// Función utilizada para verificar si a la hora de cambiar de sede se encuentra algún curso checkeado 
/// para optativas    
     function VerificaTableOpt()
    {
 /// para bloquear los controles
        Desactivar();  
        var resultados = document.getElementById("tableOferta");
        if( resultados != undefined)
        for (i = 0; i < resultados.rows.length - 1; i++)
        {
            var check = document.getElementById("chkO" + i);
            if(check != undefined)
                check.disabled = true;
        }

        var objeto = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");
        objeto.disabled = true;                
        //objeto = document.getElementById("btnRegresar");
        objeto = document.getElementById("ctl00_contenedorPrincipal_btnRegresar");
        objeto.disabled = true;
                     
       var num;
       var dg = document.getElementById("TableOfertaMatricula");
        for(i = 0; i < dg.rows.length - 1; i++)
        {
        
            var check = document.getElementById("chk" + i);
                if(check != undefined)
                {
                    if(check.checked == true)
                    {
                        num = i;
                    }
                    check.checked = false;
                }  
        }

        var cbo = document.getElementById("ctl00_contenedorPrincipal_cboSede");
        
        var str = document.URL;
        
        var url = str.indexOf("&num");
        
        if(url != -1)
        {
            var URL = str.substring(0,url);
        }
        else
        {
            var URL = document.URL;
        }
        
        location.href = URL + "&num=" + num + "&sed=" + cbo.value + "";
    }
    
//***************************************
//Funciones para manipular la tabla 
//resumen en tiempo de ejecución
//***************************************
function agregarRegistroNormal(Curso)
{
    var tb = document.getElementById('tbResumen'); // se verifica si la tabla del resumen ya fue creada
      if(tb != undefined)
      {
        var spanDescripcion = document.getElementById('descripcionCursoSeleccionOferta');
        var creditos = document.getElementById('CR' + Curso);
        var grupo = document.getElementById('GRUPO' + num);
        var suc = document.getElementById('ctl00_contenedorPrincipal_cboSede');
        var HL = document.getElementById('LUNES' + num);
        var HK = document.getElementById('MARTES' + num);               // se obtienen los 
        var HM = document.getElementById('MIERCOLES' + num);            // necesarios para 
        var HJ = document.getElementById('JUEVES' + num);               // agregar el registro 
        var HV = document.getElementById('VIERNES' + num);              // del curso matriculado a
        var HS = document.getElementById('SABADO' + num);               // la tabla resumen
        var HD = document.getElementById('DOMINGO' + num);
        
        var tbody = document.getElementById('tbResumen').getElementsByTagName("TBODY")[0];
        var newRow = document.createElement('tr');
        var newCol = document.createElement('td');
        var newCol2 = document.createElement('td');
        var newCol3 = document.createElement('td');     // se crean los elementos necesarios
        var newCol4 = document.createElement('td');     // para formar la fila que se 
        var newCol5 = document.createElement('td');     // insertara en la tabla
        var newCol6 = document.createElement('td');
        var newCol7 = document.createElement('td');
        var newCol8 = document.createElement('td');
        var newCol9 = document.createElement('td');
        var newCol10 = document.createElement('td');
        var newCol11 = document.createElement('td');
        var newCol12 = document.createElement('td');
        var newColEstado = document.createElement('td');
        
        newRow.setAttribute('id','RS' + Curso);
        newCol.className = "ColResumen";
        newCol2.className = "ColResumen";
        newCol3.className = "ColResumen";
        newCol4.className = "ColResumen";            // se le asigna el estilo
        newCol5.className = "ColResumen";            // a cada una de las columnas 
        newCol6.className = "ColResumen";            // que se agregaran a la tabla
        newCol7.className = "ColResumen";
        newCol8.className = "ColResumen";
        newCol9.className = "ColResumen";
        newCol10.className = "ColResumen";
        newCol11.className = "ColResumen";
        newCol12.className = "ColResumen";
        newColEstado.className = "ColResumen";

        var TD1 = document.createTextNode(Curso);
        var TD2 = document.createTextNode(spanDescripcion.value);
        var TD3 = document.createTextNode(creditos.lastChild.nodeValue);            // se definen
        var TD4 = document.createTextNode(grupo.lastChild.nodeValue);               // los datos que          
         
        if(suc.options[suc.selectedIndex].text != "TODAS")
        { 
            var TD5 = document.createTextNode(suc.options[suc.selectedIndex].text);     // corresponden a cada columna
        }
        else
        {
            suc = document.getElementById('Sed' + num);
            var TD5 = document.createTextNode(suc.lastChild.nodeValue);     
        }

        if(HL.lastChild.nodeValue == "-")
        {
            var TD6 = document.createTextNode("-");
            newCol6.className = "ColResumenVacio";
        }
        else
        {
            var TD6 = document.createTextNode(HL.lastChild.nodeValue);
        }
        
        if(HK.lastChild.nodeValue == "-")
        {
            var TD7 = document.createTextNode("-");
            newCol7.className = "ColResumenVacio";
        }
        else
        {
            var TD7 = document.createTextNode(HK.lastChild.nodeValue);
        }        

        if(HM.lastChild.nodeValue == "-")
        {
            var TD8 = document.createTextNode("-");
            newCol8.className = "ColResumenVacio";
        }
        else
        {
            var TD8 = document.createTextNode(HM.lastChild.nodeValue);
        }            
     
        if(HJ.lastChild.nodeValue == "-")
        {
            var TD9 = document.createTextNode("-");
            newCol9.className = "ColResumenVacio";
        }
        else
        {
            var TD9 = document.createTextNode(HJ.lastChild.nodeValue);
        }         

        if(HV.lastChild.nodeValue == "-")
        {
            var TD10 = document.createTextNode("-");
            newCol10.className = "ColResumenVacio";
        }
        else
        {
            var TD10 = document.createTextNode(HV.lastChild.nodeValue);
        }         

        if(HS.lastChild.nodeValue == "-")
        {
            var TD11 = document.createTextNode("-");
            newCol11.className = "ColResumenVacio";
        }
        else
        {
            var TD11 = document.createTextNode(HS.lastChild.nodeValue);
        }         

        if(HD.lastChild.nodeValue == "-")
        {
            var TD12 = document.createTextNode("-");
            newCol12.className = "ColResumenVacio";
        }
        else
        {
            var TD12 = document.createTextNode(HD.lastChild.nodeValue);
        }  

        var TDEstado = document.createTextNode("Pendiente de pago");

        newCol.appendChild(TD1);
        newCol2.appendChild(TD2);
        newCol3.appendChild(TD3);
        newCol4.appendChild(TD4);       // se insertan los datos
        newCol5.appendChild(TD5);       // que corresponden a 
        newCol6.appendChild(TD6);       // cada columna
        newCol7.appendChild(TD7);
        newCol8.appendChild(TD8);
        newCol9.appendChild(TD9);
        newCol10.appendChild(TD10);
        newCol11.appendChild(TD11);
        newCol12.appendChild(TD12);
        newColEstado.appendChild(TDEstado);

        newRow.appendChild(newCol);
        newRow.appendChild(newCol2);
        newRow.appendChild(newCol3);
        newRow.appendChild(newColEstado);        
        newRow.appendChild(newCol4);
        newRow.appendChild(newCol5);    // se agregan las columnas a la fila
        newRow.appendChild(newCol6);
        newRow.appendChild(newCol7);
        newRow.appendChild(newCol8);
        newRow.appendChild(newCol9);
        newRow.appendChild(newCol10);
        newRow.appendChild(newCol11);
        newRow.appendChild(newCol12);

        if(SubPeriodo != 0 )
        {
            var HSubPer = document.getElementById('SubPer' + num);
            var newColSubPer = document.createElement('td');
            newColSubPer.className = "ColResumen";
            var TDSubPer = document.createTextNode(HSubPer.lastChild.nodeValue);     
            newColSubPer.appendChild(TDSubPer);
            newRow.appendChild(newColSubPer);
        }
        
        tbody.appendChild(newRow);      // se agrega la fila a la tabla

        var total = $('#credMatriculados').html();// document.getElementById("RSTotalCreditos");
        $('#credMatriculados').html(sumar(total, creditos.lastChild.nodeValue));
      } 
}


function agregarRegistroListaEspera(Curso)
{

    var tb = document.getElementById('tbResumen'); // se verifica si la tabla del resumen ya fue creada
      if(tb != undefined)
      {
        var spanDescripcion = document.getElementById('descripcionCursoSeleccionOferta');
        var creditos = document.getElementById('CR' + Curso);
        var grupo = document.getElementById('GRUPO' + num);
        var suc = document.getElementById('ctl00_contenedorPrincipal_cboSede');
        var HL = document.getElementById('LUNES' + num);
        var HK = document.getElementById('MARTES' + num);               // se obtienen los 
        var HM = document.getElementById('MIERCOLES' + num);            // necesarios para 
        var HJ = document.getElementById('JUEVES' + num);               // agregar el registro 
        var HV = document.getElementById('VIERNES' + num);              // del curso matriculado a
        var HS = document.getElementById('SABADO' + num);               // la tabla resumen
        var HD = document.getElementById('DOMINGO' + num);
        
        var tbody = document.getElementById('tbResumen').getElementsByTagName("TBODY")[0];
        var newRow = document.createElement('tr');
        var newCol = document.createElement('td');
        var newCol2 = document.createElement('td');
        var newCol3 = document.createElement('td');     // se crean los elementos necesarios
        var newCol4 = document.createElement('td');     // para formar la fila que se 
        var newCol5 = document.createElement('td');     // insertara en la tabla
        var newCol6 = document.createElement('td');
        var newCol7 = document.createElement('td');
        var newCol8 = document.createElement('td');
        var newCol9 = document.createElement('td');
        var newCol10 = document.createElement('td');
        var newCol11 = document.createElement('td');
        var newCol12 = document.createElement('td');
        var newColEstado = document.createElement('td');
        
        
        newRow.setAttribute('id','RS' + Curso);
        newCol.className = "ColResumenEsp";
        newCol2.className = "ColResumenEsp";
        newCol3.className = "ColResumenEsp";
        newCol4.className = "ColResumenEsp";            // se le asigna el estilo
        newCol5.className = "ColResumenEsp";            // a cada una de las columnas 
        newCol6.className = "ColResumenEsp";            // que se agregaran a la tabla
        newCol7.className = "ColResumenEsp";
        newCol8.className = "ColResumenEsp";
        newCol9.className = "ColResumenEsp";
        newCol10.className = "ColResumenEsp";
        newCol11.className = "ColResumenEsp";
        newCol12.className = "ColResumenEsp";
        newColEstado.className = "ColResumenEsp";
        
        var TD1 = document.createTextNode(Curso);
        var TD2 = document.createTextNode(spanDescripcion.value);
        var TD3 = document.createTextNode(creditos.lastChild.nodeValue);            // se definen
        var TD4 = document.createTextNode(grupo.lastChild.nodeValue);               // los datos que
       
        var TD5 = document.createTextNode(suc.options[suc.selectedIndex].text);     // corresponden a cada columna
                if(HL.lastChild.nodeValue == "-")
        {
            var TD6 = document.createTextNode("-");
            newCol6.className = "ColResumenVacio";
        }
        else
        {
            var TD6 = document.createTextNode(HL.lastChild.nodeValue);
        }
        
        if(HK.lastChild.nodeValue == "-")
        {
            var TD7 = document.createTextNode("-");
            newCol7.className = "ColResumenVacio";
        }
        else
        {
            var TD7 = document.createTextNode(HK.lastChild.nodeValue);
        }        
        
        if(HM.lastChild.nodeValue == "-")
        {
            var TD8 = document.createTextNode("-");
            newCol8.className = "ColResumenVacio";
        }
        else
        {
            var TD8 = document.createTextNode(HM.lastChild.nodeValue);
        }            
     
        if(HJ.lastChild.nodeValue == "-")
        {
            var TD9 = document.createTextNode("-");
            newCol9.className = "ColResumenVacio";
        }
        else
        {
            var TD9 = document.createTextNode(HJ.lastChild.nodeValue);
        }         

        if(HV.lastChild.nodeValue == "-")
        {
            var TD10 = document.createTextNode("-");
            newCol10.className = "ColResumenVacio";
        }
        else
        {
            var TD10 = document.createTextNode(HV.lastChild.nodeValue);
        }         

        if(HS.lastChild.nodeValue == "-")
        {
            var TD11 = document.createTextNode("-");
            newCol11.className = "ColResumenVacio";
        }
        else
        {
            var TD11 = document.createTextNode(HS.lastChild.nodeValue);
        }         

        if(HD.lastChild.nodeValue == "-")
        {
            var TD12 = document.createTextNode("-");
            newCol12.className = "ColResumenVacio";
        }
        else
        {
            var TD12 = document.createTextNode(HD.lastChild.nodeValue);
        }      
        
        var TDEstado = document.createTextNode("Lista de Espera");
                
        newCol.appendChild(TD1);
        newCol2.appendChild(TD2);
        newCol3.appendChild(TD3);
        newCol4.appendChild(TD4);       // se insertan los datos
        newCol5.appendChild(TD5);       // que corresponden a 
        newCol6.appendChild(TD6);       // cada columna
        newCol7.appendChild(TD7);
        newCol8.appendChild(TD8);
        newCol9.appendChild(TD9);
        newCol10.appendChild(TD10);
        newCol11.appendChild(TD11);
        newCol12.appendChild(TD12);
        newColEstado.appendChild(TDEstado);
        
        newRow.appendChild(newCol);
        newRow.appendChild(newCol2);
        newRow.appendChild(newCol3);
        newRow.appendChild(newColEstado);
        newRow.appendChild(newCol4);
        newRow.appendChild(newCol5);    // se agregan las columnas a la fila
        newRow.appendChild(newCol6);
        newRow.appendChild(newCol7);
        newRow.appendChild(newCol8);
        newRow.appendChild(newCol9);
        newRow.appendChild(newCol10);
        newRow.appendChild(newCol11);
        newRow.appendChild(newCol12);
        
        if(SubPeriodo != 0 )
        {
            var HSubPer = document.getElementById('SubPer' + num);
            var newColSubPer = document.createElement('td');
            newColSubPer.className = "ColResumenEsp";
            var TDSubPer = document.createTextNode(HSubPer.lastChild.nodeValue);     
            newColSubPer.appendChild(TDSubPer);
            newRow.appendChild(newColSubPer);
        }
        
        tbody.appendChild(newRow);      // se agrega la fila a la tabla

        var total = $('#credMatriculados').html();// document.getElementById("RSTotalCreditos");
        $('#credMatriculados').html(sumar(total, creditos.lastChild.nodeValue));
      }
}

function EliminarRegistroDT(Curso,Credito)
{
    try{
        //var tb = document.getElementById('tbResumen'); // se verifica si la tabla del resumen ya fue creada
        //if(tb != undefined)
        //{
     
        /// se busca la línea de la tabla que se desea eliminar
        var borra = document.getElementById('RS' + Curso);
        if (borra.hasChildNodes())
        {/// se elimina la fila deseada
     
            borra.parentNode.removeChild(borra);
        }
        else
            alert("no borra");
        //}
    }catch(err){}
}

function EliminarRegistro(Curso) {
    try {
    //var tb = document.getElementById('tbResumen'); // se verifica si la tabla del resumen ya fue creada
    //if (tb != undefined) {

        /// se busca la línea de la tabla que se desea eliminar
        var borra = document.getElementById('RS' + Curso);
        if (borra.hasChildNodes()) {/// se elimina la fila deseada

            borra.parentNode.removeChild(borra);

            var creditos = document.getElementById('CR' + Curso);
            var total = $('#credMatriculados').html();// document.getElementById("RSTotalCreditos");

            $('#credMatriculados').html(restar(total, creditos.lastChild.nodeValue));

        }
        else
            alert("no borra");
    //}
    }catch(err){}
}

 function sumar(sum1, sum2)
{
    var resultado;
    resultado = Number(sum1) + Number(sum2);
    return resultado;
}

 function restar(sum1, sum2)
{
    var resultado;
    resultado = Number(sum1) - Number(sum2);
    return resultado;
}

/// Resumen:
///     Valida si la cantidad máxima de créditos permitidos
function ValidaCreditos(pCredito)
{
    var total = $('#credMatriculados').html(); //document.getElementById("RSTotalCreditos").lastChild.nodeValue;
    var lblmax = document.getElementById("ctl00_contenedorPrincipal_LblMaximoCreditos");
    
    var ind = lblmax.lastChild.nodeValue.indexOf(":");
    var max = lblmax.lastChild.nodeValue.substring(ind + 1, lblmax.lastChild.nodeValue.length);

    total = total - pCredito;
    
    if(Number(total) >= Number(max))
    {
        alert("Estudiante Sobrepasa Crédito Límite de Matrícula, \nel Total de Materias Matrículadas sobrepasan Parámetro Permitido");
        estableceChecks();
        return false
    }
    
    return true
}

function ValidaChoque(num, choque) {
    if (choque == "N")
    {
        return true
    }

    var dtResumen = document.getElementById("tbResumen");
    
     if(dtResumen != undefined)
     {
        BD = false;   
     }
     else
     {
        BD = true;
     }
     
     if(BD == true)
     {
         var cod = document.getElementById("ctl00_contenedorPrincipal_cboCarrera");      
        cod = cod.value;
        recuperarServidorTooltip(cod);
     }
    
    if(dtResumen != undefined)
    {
        var arr = Array();
        arr[0] = document.getElementById('LUNES' + num).lastChild.nodeValue;
        arr[1] = document.getElementById('MARTES' + num).lastChild.nodeValue; 
        arr[2] = document.getElementById('MIERCOLES' + num).lastChild.nodeValue;
        arr[3] = document.getElementById('JUEVES' + num).lastChild.nodeValue;
        arr[4] = document.getElementById('VIERNES' + num).lastChild.nodeValue;
        arr[5] = document.getElementById('SABADO' + num).lastChild.nodeValue;
        arr[6] = document.getElementById('DOMINGO' + num).lastChild.nodeValue;
        var subPerMatriculando = -1;
        
        if(document.getElementById('SubPer' + num) == undefined)
            subPerMatriculando =  0;
        else
            subPerMatriculando =  document.getElementById('SubPer' + num).lastChild.nodeValue;
        
        var x = 6;
       
        for(u = 0; u <= arr.length; u++)
        {
            x = 6 + u;
            
            if(arr[u] != undefined)
            {
            
                if(arr[u].toString() != "-")
                {
                    var d = arr[u].toString().indexOf("/");  
                    var hi = arr[u].toString().substring(0,d-1);
                    var hf = arr[u].toString().substring(d+2,arr[u].toString().length);

                    var hhi = hi.replace(/:/g,"");
                    var hhf = hf.replace(/:/g,"");
                    
                        for(i=0; i< dtResumen.rows.length; i++)
                        {
                            if(dtResumen.rows[i].cells[x] != undefined)
                            {
                                
                                var subPerMatriculado = 0;
                                
                                if(dtResumen.rows[i].cells[13] != undefined)
                                    subPerMatriculado = dtResumen.rows[i].cells[13].lastChild.nodeValue;
                                
                                var diaResumen = dtResumen.rows[i].cells[x].lastChild.nodeValue;
                                var p = diaResumen.indexOf("/");
                                var hidr = diaResumen.substring(0,p);
                                var hfdr = diaResumen.substring(p+2,diaResumen.length);

                                var hhidr = hidr.replace(/:/g,"");
                                var hhfdr = hfdr.replace(/:/g,"");
                                
                                if(hhi != "" && hhf != "" && hhidr != "" && hhfdr != "" )
                                {
                                    if(Number(hhf) >= Number(hhidr) && Number(hhf) <= Number(hhfdr) && subPerMatriculado == subPerMatriculando)
                                    {
                                        alert('Estudiante con horario ocupado por el Curso: ' + dtResumen.rows[i].cells[1].lastChild.nodeValue + ' Grupo: ' + dtResumen.rows[i].cells[4].lastChild.nodeValue);
                                        estableceChecks();
                                        return false
                                    }
                                   
                                    if(Number(hhidr) >= Number(hhi) && Number(hhfdr) <= Number(hhf) && subPerMatriculado == subPerMatriculando)
                                    {
                                        alert('Estudiante con horario ocupado por el Curso: ' + dtResumen.rows[i].cells[1].lastChild.nodeValue + ' Grupo: ' + dtResumen.rows[i].cells[4].lastChild.nodeValue);                                       
                                        estableceChecks();
                                        return false
                                    }
                                    
                                    if(Number(hhi) >= Number(hhidr) && Number(hhi) <= Number(hhfdr) && subPerMatriculado == subPerMatriculando)
                                    {
                                        alert('Estudiante con horario ocupado por el Curso: ' + dtResumen.rows[i].cells[1].lastChild.nodeValue + ' Grupo: ' + dtResumen.rows[i].cells[4].lastChild.nodeValue);                                        
                                        estableceChecks();
                                        return false
                                    }
                                    
                                }
                            }
                           
                        }
                }
               
            }//--
        }
    }
    return true
}


//Establece check oferta predeterminados
function estableceChecks() {
    cargarOfertaCurso(curActual, urlActual);
}


//***************************************
//Funciones comunes a todos los problemas
//***************************************
function addEvent(elemento,nomevento,funcion,captura)
{
  if (elemento.attachEvent)
  {
    elemento.attachEvent('on'+nomevento,funcion);
    return true;
  }
  else  
    if (elemento.addEventListener)
    {
      elemento.addEventListener(nomevento,funcion,captura);
      return true;
    }
    else
      return false;
}
