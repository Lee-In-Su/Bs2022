//엄격한 코드 검사
'use strict';

/************* include library **************/
var express             = require('express');
var path                = require('path');
var server              = express();

/************* view engine setup **************/
server.set('views', path.join(__dirname, '/web'));

server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);


server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '/web')));


/************* Routing **************/

//intro
server.get('/', (req, res, next) => {
    res.render("index.html");
});

//Quary String에 대하여 알아보자
server.get('/study', (req, res, next) => {

    // http://localhost/study?id=1234&name=백석대

    let student = {
        id : 0,
        name : "손님",
        age : 0 + "세"
        
    }

    if(req.query.id !== null && req.query.id !== undefined){
        student.id = req.query.id;
    }
    if(req.query.name !== null && req.query.name !== undefined){
        student.name = req.query.name;
    }
    if(req.query.age !== null && req.query.age !== undefined){
        student.age = req.query.age;
    }
  
    console.log(student);
    res.render("iWillStudy.html", student);
});


//구구단 페이지
server.get('/99dan',  (req, res, next) => {

    // http://localhost/study?primary=8

    let gugudan = {
        primary : 2,
        primary2 : 3,
        length : 9
    }

    if(req.query.primary !== null && req.query.primary !== undefined){
        gugudan.primary = req.query.primary;
    }
    if(req.query.primary2 !== null && req.query.primary2 !== undefined){
        gugudan.primary2 = req.query.primary2;
    }

  
    res.render("99dan.html", gugudan);
});

//receive
server.post('/recvData', (req, res, next) => {
    let sensorData = {
        hum : 0,
        temp : 0,
        oxy : 0
    }
    if(req.body.hum !== null && req.body.hum !== undefined){
        sensorData.hum = req.body.hum;
        sensorData.hum = parseInt(sensorData.hum);
    }

    if(req.body.temp !== null && req.body.temp !== undefined){
        sensorData.temp = req.body.temp;
        sensorData.temp = parseInt(sensorData.temp);
    }

    if(req.body.oxy !== null && req.body.oxy !== undefined){
        sensorData.oxy = req.body.oxy;
        sensorData.oxy = parseInt(sensorData.oxy);
    }

    console.log(req.body.hum);
    console.log(req.body.temp);
    console.log(req.body.oxy);
    console.log('매 분 마다 작업 실행' + sensorData.hum + "|" + sensorData.temp + "|" + sensorData.oxy);
    res.send("ACK ");
})

//receive
server.get('/getData', (req, res, next) => {
    let sensorData = {
        hum : 0,  //습도
        temp : 0,  //온도
        oxy : 0 //산소농도
    }


    sensorData.hum = Math.floor(Math.random() * 60);
    sensorData.temp = Math.floor(Math.random() * 100);
    sensorData.oxy = Math.floor(Math.random() * 20);

    console.log(req.body.hum);
    console.log(req.body.temp);
    console.log(req.body.oxy);
    
    res.send(sensorData);
})

//getData.html
server.get('/view', (req, res, next) => {
    res.render("getData.html");
});
module.exports = server;
