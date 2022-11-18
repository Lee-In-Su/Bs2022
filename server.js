//엄격한 코드 검사
'use strict';

/************* include library **************/
var express             = require('express');
var path                = require('path');
var server              = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',    // 호스트 주소
  user     : 'root',           // mysql user
  password : '1234',       // mysql password
  database : 'lws'         // mysql 데이터베이스
});
connection.connect();


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

    // http://localhost/study?id=1234&name=백석대&age=0

    let student = {
        id : 20163019,
        name : "이인수",
        age : 26
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

    // http://localhost/99dan?primary=2

    let gugudan = {
        primary : 7,
        primary2 : 8,
        length : 9
        
    }

    if(req.query.primary !== null && req.query.primary !== undefined){
        gugudan.primary = req.query.primary;
        gugudan.primary2 = parseInt(gugudan.primary) + 1;
        // gugudan.primary2 = gugudan.primary--;
    }
    res.render("99dan.html", gugudan);
});
    
//recieve
server.post('/recvData', (req, res, next) => {
    let sensorData = {
        s_idx : 0,
        sd_value : 0,
    }
    
    if(req.body.s_idx !== null && req.body.s_idx !== undefined){
        sensorData.s_idx = req.body.s_idx;
        sensorData.s_idx = parseInt(sensorData.s_idx);
    } 
    if(req.body.sd_value !== null && req.body.sd_value !== undefined){
        sensorData.sd_value = req.body.sd_value;   
        sensorData.sd_value = parseInt(sensorData.sd_value);   
    }

    var query_ = " insert into lws.sensor_data_tbl ";
    query_ += " (s_idx , sd_value , ins_date, upd_date) values";
    query_ += " (" + sensorData.s_idx + " , " + sensorData.sd_value + " , now(), now())";

    console.log(query_);

    connection.query(query_, function (error, results, fields) {
        if(error) throw error;
       console.log('The solution is: ', error);
       console.log('The solution is: ', results);
    });

    console.log(req.body.s_idx);
    console.log(req.body.sd_value);
    console.log('매 분마다 작업 실행');
    res.send("ACK ");
});

//Useradd
server.post('/userAdd', (req, res, next) => {
    let UseraddData = {
        u_id : 'lis',
        u_pass : '1234',
    }

    if(req.body.u_id !== null && req.body.u_id !== undefined){
        UseraddData.u_id = req.body.u_id;   
    }

    if(req.body.u_pass !== null && req.body.u_pass !== undefined){
        UseraddData.u_pass = req.body.u_pass;    
    }   

    var query_ = "insert into lws.user_tbl ";
    query_ += "(u_id, u_pass) values";
    query_ += " ('" + UseraddData.u_id + "' , '" + UseraddData.u_pass + "')";

    console.log(query_);

    connection.query(query_, function (error, results, fields) {

        console.log(error);

        if(error) {
        console.log('error');
        res.send("등록실패");
        //throw error;
        } 

        else{
        res.send("등록완료");
        }
        console.log('The solution is: ', results);
    });
});

//User
server.post('/User', (req, res, next) => {
    let userData = {
        u_id : 1,
    }

    if(req.body.u_id !== null && req.body.u_id !== undefined){
        userData.u_id = req.body.u_id;   
    }

    var query_ = "select u_idx ";
    query_ += "from lws.user_tbl ";
    query_ += "where u_id ='" + userData.u_id + "' ";

    console.log(query_);

    connection.query(query_, function (error, results, fields) {

        console.log(error);

        if(error) {
        console.log('error');
        res.send("등록실패");
        //throw error;
        } 

        else{
        res.send("등록완료");
        }
        console.log('The solution is: ', results);
    });
});


//getData
server.get('/getData', (req, res, next) => {
    let sensorData = {
        hum : 0,
        temp : 0,
        oxy : 0
    }
    sensorData.hum = Math.floor(Math.random() * 60);
    sensorData.temp = Math.floor(Math.random() * 100);
    sensorData.oxy = Math.floor(Math.random() * 50);

    res.send(sensorData);
});

//getData html
server.get("/view", (req, res, next) => {
    res.render("getData.html");
});
module.exports = server;
