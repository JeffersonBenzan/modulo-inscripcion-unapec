var modalRegistro = function () {
    $('#gmm')
      .modal('show')
    ;
}
 
var addTodoItem = function () {
 
    var id = $('#id').val();
    var Todoitem = $('#todoitem').val();
    var created = $('#created').val();
 
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.innerText = id;
 
    tr.appendChild(td);
 
    td = document.createElement('td');
    td.innerText = Todoitem;
 
    tr.appendChild(td);
 
    td = document.createElement('td');
    td.innerText = created;
 
    tr.appendChild(td);
 
    td = document.createElement('td');
    input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('class', 'ui checked checkbox');
    input.setAttribute('onclick', 'callDone(this)');
    td.appendChild(input);
    tr.appendChild(td);

    td = document.createElement('td');
    label = document.createElement('label');
    label.setAttribute('class','ui orange label');
    label.innerHTML = "pending...";
    td.appendChild(label);
    tr.appendChild(td);
 
    tabla = document.getElementById('tabla');
    tabla.appendChild(tr);
 
    td = document.createElement('td');
    btn = document.createElement('button');
    btn.setAttribute('onclick', 'modalDelete()');
    btn.setAttribute('class', 'ui red button');
    btn.innerHTML = 'Delete';
    td.appendChild(btn);
    tr.appendChild(td);
 
    tabla.appendChild(tr);
    limpiar();
}
 
function modalDelete() {
    $('#mmt').modal('show');
}

function borrarFila() {
    fila = btn.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
}

function callDone(input)
{
   if(input.checked)
   {
    label.setAttribute('class','ui green label');
    label.innerHTML = "Done";
   }
   else
   {
    label.setAttribute('class','ui orange label');
    label.innerHTML = "pending...";
   }
}
 
function limpiar() {
    $('#id').val("");
    $('#todoitem').val("");
    $('#created').val("");
}

