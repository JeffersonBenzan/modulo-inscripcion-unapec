// Cargar modulos y crear nueva aplicacion
var express = require("express"); 
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados
 
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var materias = [
  {
    id: 1,
    idCuatrimestre: 4,
    estado: true,
    codigo: 'ISO-456',
    descripcion: 'PROGRAMACION WEB',
    creditos: 4,
  },
  {
    id: 2,
    idCuatrimestre: 3,
    estado: true,
    codigo: 'MAT-200',
    descripcion: 'CALCULO 1',
    creditos: 4,
  },  {
    id: 3,
    idCuatrimestre: 5,
    estado: true,
    codigo: 'Lit',
    descripcion: 'Literatura',
    creditos: 4,
  },  {
    id: 4,
    idCuatrimestre: 2,
    estado: false,
    codigo: 'MAT-234',
    descripcion: 'Matematica su',
    creditos: 4,
  }
]


var horarios = [
  {
    id: 3,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "",
    mier: "08:00:01/ 11:00:00",
    jue: "",
    vie: "",
    sab: "",
    dom: "",
    modulo: 0,
  },{
    id: 4,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33133,
    lun: "",
    mar: "08:00:01/ 11:00:00",
    mier: "",
    jue: "08:00:01/ 11:00:00",
    vie: "",
    sab: "",
    dom: "",
    modulo: 0,
  },{
    id: 5,
    idMateria: 3,
    estado: false,
    aula: "LAB-G",
    grupo: 33233,
    lun: "",
    mar: "08:00:01/ 11:00:00",
    mier: "",
    jue: "08:00:01/ 11:00:00",
    vie: "",
    sab: "",
    dom: "",
    modulo: 0,
  },{
    id: 6,
    idMateria: 3,
    estado: false,
    aula: "LAB-F",
    grupo: 9233,
    lun: "",
    mar: "08:00:01/ 13:00:00",
    mier: "",
    jue: "",
    vie: "",
    sab: "",
    dom: "",
    modulo: 0,
  },{
    id: 3,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  },{
    id: 3,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  },{
    id: 3,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  },{
    id: 3,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  },{
    id: 3,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  },{
    id: 3,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  },{
    id: 3,
    idMateria: 3,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  },{
    id: 3,
    idMateria: 2,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  },{
    id: 1,
    idMateria: 4,
    estado: false,
    aula: "LAB-H",
    grupo: 33233,
    lun: "08:00:01/ 11:00:00",
    mar: "08:00:01/ 11:00:00",
    mier: "08:00:01/ 11:00:00",
    jue: "08:00:01/ 11:00:00",
    vie: "08:00:01/ 11:00:00",
    sab: "08:00:01/ 11:00:00",
    dom: "08:00:01/ 11:00:00",
    modulo: 0,
  }
]






//Ejemplo: GET http://localhost:8080/items
// app.get('/api/horarios', function(req, res, next) {
 
//   console.log(req.params)
//   res.send('Get all');

// });
 
//Ejemplo: GET http://localhost:8080/items?filter=ABC
app.get('/api/materias', function(req, res) {
  console.log(req.params);
  res.send(materias);
});
 
//Ejemplo: GET http://localhost:8080/items/10
app.get('/api/horarios/:id', function(req, res, next) {
  var itemId = req.params.id;
  console.log(req.params)
  console.log('Get ' + req.params.id)
  res.send(horarios);
});

app.get('/items/:id', function(req, res, next) {
    var itemId = req.params.id;
    res.send('Get ' + req.params.id);
  });
 
//Ejemplo: POST http://localhost:8080/items
app.post('/items', function(req, res) {
   var data = req.body.data;
   res.send('Add ' + data);
});
 
//Ejemplo: PUT http://localhost:8080/items
app.put('/items', function(req, res) {
   var itemId = req.body.id;
   var data = req.body.data;
   res.send('Update ' + itemId + ' with ' + data);
});
 
//Ejemplo: DELETE http://localhost:8080/items
app.delete('/items/:id', function(req, res) {
   var itemId = req.params.id;
   res.send('Delete ' + itemId);
});
  
var server = app.listen(8080, function () {
    console.log('Server is running..'); 
}) 